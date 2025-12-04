"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useStore } from '@/lib/store';
import * as THREE from 'three';

interface PosterProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    index: number;
    color?: string;
}

export default function Poster({ position, rotation = [0, 0, 0], index, color = '#ff69b4' }: PosterProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const openModal = useStore((state) => state.openModal);

    useCursor(hovered);

    // Subtle glow pulse on hover
    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            if (hovered) {
                material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
            } else {
                material.emissiveIntensity = 0;
            }
        }
    });

    return (
        <group position={position} rotation={new THREE.Euler(...rotation)}>
            {/* Poster frame */}
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[1.4, 1.9]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Poster content */}
            <mesh
                ref={meshRef}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    openModal('video', index);
                }}
            >
                <planeGeometry args={[1.2, 1.7]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Star decorations */}
            <mesh position={[0.4, 0.6, 0.01]}>
                <circleGeometry args={[0.1, 5]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-0.3, -0.5, 0.01]}>
                <circleGeometry args={[0.08, 5]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}
