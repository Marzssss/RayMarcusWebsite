"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useStore } from '@/lib/store';
import * as THREE from 'three';

interface CDAlbumProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    index: number;
}

const cdColors = ['#ff69b4', '#9370db', '#00ced1']; // Pink, Purple, Teal - 2000s colors

export default function CDAlbum({ position, rotation = [0, 0, 0], index }: CDAlbumProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const openModal = useStore((state) => state.openModal);

    useCursor(hovered);

    useFrame((state) => {
        if (meshRef.current) {
            // Floating + spin on hover
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.03;
            if (hovered) {
                meshRef.current.rotation.y += 0.05;
            }
        }
    });

    return (
        <group position={position}>
            {/* CD Case */}
            <mesh
                ref={meshRef}
                rotation={new THREE.Euler(...rotation)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    openModal('album', index);
                }}
            >
                <boxGeometry args={[0.7, 0.08, 0.7]} />
                <meshStandardMaterial
                    color={hovered ? '#fff' : cdColors[index % cdColors.length]}
                    metalness={0.3}
                    roughness={0.4}
                />
            </mesh>
            {/* CD Disc on top */}
            <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.08, 0.28, 16]} />
                <meshStandardMaterial
                    color="#c0c0c0"
                    metalness={0.9}
                    roughness={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}
