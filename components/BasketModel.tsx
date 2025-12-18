import React, { useEffect, useRef, useState, Component, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { BasketModelProps } from '../types';

// We now use absolute paths that point to the 'public' folder
const MODEL_PATH = '/basketball.glb';

class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) {
    console.warn("Failed to load 3D model, switching to fallback.", error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const FallbackBall: React.FC = () => (
  <mesh castShadow receiveShadow>
    <sphereGeometry args={[1, 64, 64]} />
    <meshStandardMaterial color="#e65100" roughness={0.4} metalness={0.1} />
    <group>
       <mesh><torusGeometry args={[1.005, 0.02, 64, 200]} /><meshBasicMaterial color="#1a1a1a" /></mesh>
       <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.005, 0.02, 64, 200]} /><meshBasicMaterial color="#1a1a1a" /></mesh>
    </group>
  </mesh>
);

const LoadedModel: React.FC = () => {
  const gltf = useGLTF(MODEL_PATH);
  
  // Load textures directly from the public/textures folder
  const textures = useTexture({
    map: '/textures/ball_ball_BaseColor.png',
    normalMap: '/textures/ball_ball_Normal.png',
    metalnessMap: '/textures/ball_ball_Metallic.png',
    roughnessMap: '/textures/ball_ball_Roughness.png',
  });

  useEffect(() => {
    // 1. Correct Texture Settings for PBR
    // Only the color map should be sRGB
    textures.map.colorSpace = THREE.SRGBColorSpace;
    
    // Data maps (Normal, Metal, Rough) must be Linear (NoColorSpace)
    textures.normalMap.colorSpace = THREE.NoColorSpace;
    textures.metalnessMap.colorSpace = THREE.NoColorSpace;
    textures.roughnessMap.colorSpace = THREE.NoColorSpace;

    // GLTF standard requires flipY = false
    Object.values(textures).forEach((t) => {
      t.flipY = false;
      t.needsUpdate = true;
    });

    // 2. Fixed base scale (no normalization to avoid pivot drift)
    gltf.scene.scale.setScalar(1);

    // 3. Apply Textures to Mesh
    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false; // Prevent culling when scroll moves the model quickly

        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.map = textures.map;
          mesh.material.normalMap = textures.normalMap;
          mesh.material.metalnessMap = textures.metalnessMap;
          mesh.material.roughnessMap = textures.roughnessMap;
          
          // Align tint with brand orange
          mesh.material.color = new THREE.Color('#c4b8b8');
          // Force material to use the full range of the maps
          mesh.material.metalness = 1;
          mesh.material.roughness = 1;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [gltf.scene, textures]);

  return <primitive object={gltf.scene} />;
};

const KEYFRAMES = [
  { pos: new THREE.Vector3(2, 0, 0), rot: new THREE.Vector3(0, 0, 0) }, 
  { pos: new THREE.Vector3(-2.5, -1, 1), rot: new THREE.Vector3(0, -Math.PI, -0.2) },
  { pos: new THREE.Vector3(2.5, 0.5, 0), rot: new THREE.Vector3(0.5, -Math.PI * 0.5, 0) },
  { pos: new THREE.Vector3(2.2, -1.5, 0.5), rot: new THREE.Vector3(-0.5, 0, 0) },
  { pos: new THREE.Vector3(-2.5, 0, 1), rot: new THREE.Vector3(0, Math.PI * 0.5, 0) },
  { pos: new THREE.Vector3(0, -0.5, 3.5), rot: new THREE.Vector3(0, -Math.PI * 3.5, 0) },
];

export const ScrollableBasketModel: React.FC<BasketModelProps> = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const tl = scroll.offset;
    const totalSegments = KEYFRAMES.length - 1;
    const segmentDuration = 1 / totalSegments;
    const currentSegment = Math.min(Math.floor(tl / segmentDuration), totalSegments - 1);
    let segmentProgress = Math.max(0, Math.min(1, (tl - (currentSegment * segmentDuration)) / segmentDuration));

    const startKF = KEYFRAMES[currentSegment];
    const endKF = KEYFRAMES[currentSegment + 1];

    groupRef.current.position.lerpVectors(startKF.pos, endKF.pos, segmentProgress);
    groupRef.current.rotation.set(
      THREE.MathUtils.lerp(startKF.rot.x, endKF.rot.x, segmentProgress),
      THREE.MathUtils.lerp(startKF.rot.y, endKF.rot.y, segmentProgress),
      THREE.MathUtils.lerp(startKF.rot.z, endKF.rot.z, segmentProgress)
    );

    // Subtle float (stronger when idle)
    const floatStrength = hovered ? 0.02 : 0.06;
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * floatStrength;
    const targetScale = hovered ? 7.2 : 7;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      frustumCulled={false}
    >
      <ModelErrorBoundary fallback={<FallbackBall />}>
        <LoadedModel />
      </ModelErrorBoundary>
    </group>
  );
};

export const StaticBasketModel: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    useFrame((state, delta) => {
      if (!groupRef.current) return;
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      const targetScale = hovered ? 7.2 : 7.1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });
    return (
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        frustumCulled={false}
      >
        <ModelErrorBoundary fallback={<FallbackBall />}>
          <LoadedModel />
        </ModelErrorBoundary>
      </group>
    );
};

// Preload using the string paths
useGLTF.preload(MODEL_PATH);
useTexture.preload('/textures/ball_ball_BaseColor.png');
useTexture.preload('/textures/ball_ball_Normal.png');
useTexture.preload('/textures/ball_ball_Metallic.png');
useTexture.preload('/textures/ball_ball_Roughness.png');
