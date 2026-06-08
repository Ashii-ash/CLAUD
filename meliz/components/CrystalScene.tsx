"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function CrystalMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.15;
  });

  // Elongated octahedron — crystal shard shape
  const geo = new THREE.OctahedronGeometry(1, 0);
  // Scale Y up to make it a crystal spire
  geo.applyMatrix4(new THREE.Matrix4().makeScale(0.7, 1.6, 0.7));

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} geometry={geo} castShadow>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          roughness={0.02}
          transmission={0.97}
          ior={1.72}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.12}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#e8d8b8"
          attenuationColor="#C6A36A"
          attenuationDistance={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function CrystalScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#C6A36A" />
          <spotLight position={[0, 8, 2]} intensity={2} color="#fff8e8" penumbra={1} />
          <CrystalMesh />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
