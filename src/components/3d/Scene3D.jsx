import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars } from '@react-three/drei';

function FloatingShape({ position, color, speed, rotationSpeed, geometry: Geometry }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * rotationSpeed;
        meshRef.current.rotation.y = time * rotationSpeed * 0.5;
        meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <Geometry args={[1, 0]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
    );
}

function SceneContent() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Icosahedron - Abstract representation of knowledge */}
                <FloatingShape
                    position={[-3, 2, 0]}
                    color="#16a34a" // Primary Green
                    speed={1}
                    rotationSpeed={0.2}
                    geometry={(props) => <icosahedronGeometry {...props} args={[1.2, 0]} />}
                />

                {/* Torus - Continuity/Cycle of learning */}
                <FloatingShape
                    position={[3, -1, -2]}
                    color="#d97706" // Secondary Amber
                    speed={1.5}
                    rotationSpeed={0.3}
                    geometry={(props) => <torusGeometry {...props} args={[0.8, 0.3, 16, 100]} />}
                />

                {/* Octahedron - Structure/Discipline */}
                <FloatingShape
                    position={[0, 3, -4]}
                    color="#0284c7" // Accent Blue
                    speed={0.8}
                    rotationSpeed={0.1}
                    geometry={(props) => <octahedronGeometry {...props} args={[1, 0]} />}
                />
            </Float>

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
        </>
    );
}

export default function Scene3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40">
            <Canvas dpr={[1, 2]}>
                <SceneContent />
            </Canvas>
        </div>
    );
}
