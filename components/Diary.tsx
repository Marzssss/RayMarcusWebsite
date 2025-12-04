"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useStore } from '@/lib/store';
import * as THREE from 'three';

interface DiaryProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

export default function Diary({ position, rotation = [0, 0, 0] }: DiaryProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    const openModal = useStore((state) => state.openModal);

    useCursor(hovered);

    // Gentle floating
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
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
                openModal('bio');
            }}
        >
            {/* Diary cover */}
            <mesh>
                <boxGeometry args={[0.5, 0.08, 0.7]} />
                <meshStandardMaterial
                    color={hovered ? '#ff69b4' : '#ff1493'}
                />
            </mesh>

            {/* Pages inside */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.45, 0.06, 0.65]} />
                <meshStandardMaterial color="#fffaf0" />
            </mesh>

            {/* Heart decoration on cover */}
            <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.12, 16]} />
                <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.3} />
            </mesh>

            {/* Lock/clasp */}
            <mesh position={[0.26, 0.02, 0]}>
                <boxGeometry args={[0.04, 0.06, 0.15]} />
                <meshStandardMaterial color="#ffd700" metalness={0.8} />
            </mesh>

            {/* Ribbon bookmark */}
            <mesh position={[-0.15, 0.05, -0.35]}>
                <boxGeometry args={[0.03, 0.01, 0.2]} />
                <meshStandardMaterial color="#ff69b4" />
            </mesh>
        </group>
    );
}
