"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FairyLights() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate light positions along the ceiling edges
    const lights = useMemo(() => {
        const positions: [number, number, number][] = [];

        // Back wall edge
        for (let x = -5; x <= 5; x += 1.5) {
            positions.push([x, 5.5, -5]);
        }

        // Left wall edge
        for (let z = -5; z <= 5; z += 1.5) {
            positions.push([-5.5, 5.5, z]);
        }

        // Right wall edge  
        for (let z = -5; z <= 5; z += 1.5) {
            positions.push([5.5, 5.5, z]);
        }

        return positions;
    }, []);

    // Twinkle animation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const mesh = child as THREE.Mesh;
                const material = mesh.material as THREE.MeshStandardMaterial;
                const twinkle = Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.5 + 0.5;
                material.emissiveIntensity = 0.5 + twinkle * 0.5;
            });
        }
    });

    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#ffe4b5', '#dda0dd'];

    return (
        <group ref={groupRef}>
            {lights.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.08, 6, 6]} />
                    <meshStandardMaterial
                        color={colors[i % colors.length]}
                        emissive={colors[i % colors.length]}
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}
