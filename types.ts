import React from 'react';

export interface BasketModelProps {
  position?: [number, number, number];
  scale?: number;
}

export interface SectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  align?: 'left' | 'right' | 'center';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      sphereGeometry: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      primitive: any;
      [elemName: string]: any;
    }
  }
}
