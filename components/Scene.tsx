import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera, ScrollControls, Scroll } from '@react-three/drei';
import { ScrollableBasketModel, StaticBasketModel } from './BasketModel';
import { ForegroundOverlay, BackgroundOverlay } from './Overlay';

interface SceneProps {
  view: 'home' | 'about';
}

const Scene: React.FC<SceneProps> = ({ view }) => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ powerPreference: "high-performance", antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#ffffff"
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight 
          position={[-5, 5, -5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={5} 
          color="#FF3D00"
        />
         <spotLight 
          position={[-10, 0, 10]} 
          angle={0.5} 
          penumbra={1} 
          intensity={0.5} 
          color="#404040"
        />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <ScrollControls pages={view === 'home' ? 6 : 1} damping={0.15} enabled={view === 'home'}>
            {view === 'home' && (
              <>
                <Scroll html style={{ width: '100%', height: '100%' }}>
                  <BackgroundOverlay />
                </Scroll>

                <ScrollableBasketModel />

                <Scroll html style={{ width: '100%', height: '100%' }}>
                  <ForegroundOverlay />
                </Scroll>
              </>
            )}
          </ScrollControls>

          {/* About Page static model stays mounted to avoid remount flicker */}
          {view === 'about' && (
            <>
              <group position={[2, 0, 0]}>
                <StaticBasketModel />
              </group>
              <ContactShadows 
                position={[2, -2, 0]} 
                opacity={0.5} 
                scale={20} 
                blur={2.5} 
                far={5} 
                resolution={512}
                color="#000000"
              />
            </>
          )}

        </Suspense>

        {view === 'home' && (
           <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.5} 
            scale={30} 
            blur={2.5} 
            far={5} 
            resolution={512}
            color="#000000"
          />
        )}
        
      </Canvas>
    </div>
  );
};

export default Scene;
