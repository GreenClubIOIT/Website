'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

function EarthContent() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load textures from Three.js GitHub repository
  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = time * 0.1;
    if (cloudsRef.current) cloudsRef.current.rotation.y = time * 0.14; 
  });

  return (
    <>
      {/* Earth Sphere */}
      <mesh ref={earthRef} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Cloud Sphere */}
      <mesh ref={cloudsRef} scale={2.02}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent={true} 
          opacity={0.8} 
          depthWrite={false} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

// Loading Fallback
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#1C3D2E" wireframe />
    </mesh>
  );
}

export default function RotatingEarth() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} /> 
        <directionalLight position={[5, 3, 5]} intensity={2.5} /> 
        <pointLight position={[-5, -2, -5]} intensity={0.5} color="#DDF5C8" /> 

        <Suspense fallback={<Loader />}>
          <EarthContent />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}