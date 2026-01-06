import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';

function FloatingParticle({ position, color }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time + position[0]) * 0.002;
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
}

function AuthSceneContent() {
    // Generate random particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 5
        ],
        color: Math.random() > 0.5 ? '#16a34a' : '#d97706' // Green or Amber
    }));

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />

            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                {particles.map((p, i) => (
                    <FloatingParticle key={i} {...p} />
                ))}
            </Float>

            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
        </>
    );
}

export default function AuthScene3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas dpr={[1, 2]}>
                <AuthSceneContent />
            </Canvas>
        </div>
    );
}
