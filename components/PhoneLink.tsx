"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { instagram } from '@/lib/data';
import * as THREE from 'three';

interface PhoneLinkProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

export default function PhoneLink({ position, rotation = [0, 0, 0] }: PhoneLinkProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);

    useCursor(hovered);

    // Phone bounce animation on hover
    useFrame((state) => {
        if (groupRef.current && hovered) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 8) * 0.02;
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={new THREE.Euler(...rotation)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                window.open(instagram, '_blank');
            }}
        >
            {/* T-Mobile Sidekick style phone body */}
            <mesh>
                <boxGeometry args={[0.4, 0.08, 0.6]} />
                <meshStandardMaterial color={hovered ? "#ff69b4" : "#1a1a2e"} />
            </mesh>

            {/* Screen part (flip up style) */}
            <mesh position={[0, 0.05, -0.15]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[0.38, 0.06, 0.35]} />
                <meshStandardMaterial color="#1a1a2e" />
            </mesh>

            {/* Screen display */}
            <mesh position={[0, 0.09, -0.15]} rotation={[-0.2, 0, 0]}>
                <planeGeometry args={[0.32, 0.28]} />
                <meshStandardMaterial
                    color="#00ff88"
                    emissive="#00ff88"
                    emissiveIntensity={hovered ? 0.8 : 0.4}
                />
            </mesh>

            {/* Keyboard buttons */}
            {[...Array(12)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        -0.12 + (i % 4) * 0.08,
                        0.045,
                        0.05 + Math.floor(i / 4) * 0.1
                    ]}
                >
                    <boxGeometry args={[0.06, 0.02, 0.08]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            ))}
        </group>
    );
}
