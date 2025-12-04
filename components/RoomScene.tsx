"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CDAlbum from './CDAlbum';
import Poster from './Poster';
import PhoneLink from './PhoneLink';
import Diary from './Diary';
import FairyLights from './FairyLights';
import { albums } from '@/lib/data';

export default function RoomScene() {
    const pointLightRef = useRef<THREE.PointLight>(null);

    // Animate the pink light for a cozy vibe
    useFrame((state) => {
        if (pointLightRef.current) {
            pointLightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <>
            {/* Warm ambient lighting */}
            <ambientLight intensity={0.4} color="#ffd4e5" />

            {/* Main warm light */}
            <pointLight position={[0, 4, 0]} intensity={1} color="#fff5eb" />

            {/* Pink accent light - animated */}
            <pointLight
                ref={pointLightRef}
                position={[-4, 3, -3]}
                intensity={1.5}
                color="#ff69b4"
                distance={12}
            />

            {/* Purple accent light */}
            <pointLight position={[4, 2, 3]} intensity={1.2} color="#9370db" distance={10} />

            {/* Warm side light */}
            <pointLight position={[5, 0, -2]} intensity={0.8} color="#ffa07a" distance={8} />

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={5}
                maxDistance={15}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                rotateSpeed={0.5}
                touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            />

            {/* Floor */}
            <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 12]} />
                <meshStandardMaterial color="#e8d4c4" />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 1, -5.5]}>
                <planeGeometry args={[12, 10]} />
                <meshStandardMaterial color="#ffb6c1" /> {/* Light pink */}
            </mesh>

            {/* Left Wall */}
            <mesh position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[12, 10]} />
                <meshStandardMaterial color="#dda0dd" /> {/* Plum */}
            </mesh>

            {/* Right Wall */}
            <mesh position={[6, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[12, 10]} />
                <meshStandardMaterial color="#ffb6c1" />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 12]} />
                <meshStandardMaterial color="#fff0f5" />
            </mesh>

            {/* Fairy Lights along ceiling edge */}
            <FairyLights />

            {/* ===== FURNITURE ===== */}

            {/* Dresser / Vanity */}
            <group position={[-4, -2.5, -4]}>
                {/* Main body */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3, 3, 1.5]} />
                    <meshStandardMaterial color="#f5f5dc" /> {/* Beige/cream */}
                </mesh>
                {/* Mirror frame */}
                <mesh position={[0, 2.5, 0]}>
                    <boxGeometry args={[2.5, 2, 0.1]} />
                    <meshStandardMaterial color="#deb887" />
                </mesh>
                {/* Mirror */}
                <mesh position={[0, 2.5, 0.06]}>
                    <planeGeometry args={[2.2, 1.7]} />
                    <meshStandardMaterial color="#e0ffff" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Drawer handles */}
                <mesh position={[-0.5, -0.3, 0.8]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.8} />
                </mesh>
                <mesh position={[0.5, -0.3, 0.8]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.8} />
                </mesh>
            </group>

            {/* CDs on Dresser - Stacked */}
            {albums.map((_, i) => (
                <CDAlbum
                    key={i}
                    position={[-4.5 + i * 0.9, -0.85, -3.5]}
                    rotation={[0, 0.2 * i, 0]}
                    index={i}
                />
            ))}

            {/* Posters on Wall - 2000s style arrangement */}
            <Poster position={[-2, 3, -5.4]} index={0} color="#ff1493" />
            <Poster position={[1, 2.5, -5.4]} index={1} color="#00ced1" />
            <Poster position={[4, 3.2, -5.4]} index={2} color="#9932cc" />

            {/* Bed - Princess style */}
            <group position={[3, -2.5, 1]}>
                {/* Bed frame */}
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[3.5, 1, 5]} />
                    <meshStandardMaterial color="#fff0f5" />
                </mesh>
                {/* Mattress */}
                <mesh position={[0, 0.1, 0]}>
                    <boxGeometry args={[3.2, 0.5, 4.8]} />
                    <meshStandardMaterial color="#ffb6c1" />
                </mesh>
                {/* Pillows */}
                <mesh position={[-0.7, 0.5, -2]}>
                    <boxGeometry args={[1, 0.4, 0.8]} />
                    <meshStandardMaterial color="#fff5ee" />
                </mesh>
                <mesh position={[0.7, 0.5, -2]}>
                    <boxGeometry args={[1, 0.4, 0.8]} />
                    <meshStandardMaterial color="#ffe4e1" />
                </mesh>
                {/* Headboard */}
                <mesh position={[0, 1.5, -2.4]}>
                    <boxGeometry args={[3.5, 3, 0.2]} />
                    <meshStandardMaterial color="#dda0dd" />
                </mesh>
            </group>

            {/* Diary on Bed */}
            <Diary position={[2.5, -1.65, 1.5]} rotation={[0, 0.3, 0]} />

            {/* Nightstand */}
            <group position={[0.8, -3, 3]}>
                <mesh>
                    <boxGeometry args={[1.2, 1.5, 1.2]} />
                    <meshStandardMaterial color="#f5f5dc" />
                </mesh>
                {/* Lamp */}
                <mesh position={[0, 1.2, 0]}>
                    <cylinderGeometry args={[0.15, 0.2, 0.5, 8]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.6} />
                </mesh>
                <mesh position={[0, 1.7, 0]}>
                    <coneGeometry args={[0.4, 0.5, 8]} />
                    <meshStandardMaterial color="#ffb6c1" emissive="#ff69b4" emissiveIntensity={0.3} />
                </mesh>
            </group>

            {/* Phone on Nightstand */}
            <PhoneLink position={[0.5, -2.15, 3.2]} rotation={[0, -0.3, 0]} />

            {/* Fluffy Rug */}
            <mesh position={[0, -3.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[2.5, 32]} />
                <meshStandardMaterial color="#dda0dd" />
            </mesh>

            {/* Beanbag Chair */}
            <mesh position={[-3, -3, 2]}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial color="#ff69b4" />
            </mesh>

            {/* Bookshelf on left wall */}
            <group position={[-5.8, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                {/* Shelves */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2, 0.1, 0.6]} />
                    <meshStandardMaterial color="#deb887" />
                </mesh>
                <mesh position={[0, 1.5, 0]}>
                    <boxGeometry args={[2, 0.1, 0.6]} />
                    <meshStandardMaterial color="#deb887" />
                </mesh>
                {/* Books */}
                <mesh position={[-0.5, 0.4, 0]}>
                    <boxGeometry args={[0.3, 0.6, 0.4]} />
                    <meshStandardMaterial color="#ff69b4" />
                </mesh>
                <mesh position={[-0.1, 0.35, 0]}>
                    <boxGeometry args={[0.25, 0.5, 0.4]} />
                    <meshStandardMaterial color="#9370db" />
                </mesh>
                <mesh position={[0.3, 0.45, 0]}>
                    <boxGeometry args={[0.35, 0.7, 0.4]} />
                    <meshStandardMaterial color="#00ced1" />
                </mesh>
            </group>

            {/* Window with curtains (right wall) */}
            <group position={[5.9, 1.5, -2]} rotation={[0, -Math.PI / 2, 0]}>
                {/* Window frame */}
                <mesh>
                    <boxGeometry args={[2.5, 3, 0.1]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                {/* Window glass - glowing slightly */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[2.2, 2.7]} />
                    <meshStandardMaterial
                        color="#87ceeb"
                        emissive="#add8e6"
                        emissiveIntensity={0.1}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                {/* Curtain left */}
                <mesh position={[-1.5, 0, 0.1]}>
                    <boxGeometry args={[0.8, 4, 0.1]} />
                    <meshStandardMaterial color="#ff69b4" />
                </mesh>
                {/* Curtain right */}
                <mesh position={[1.5, 0, 0.1]}>
                    <boxGeometry args={[0.8, 4, 0.1]} />
                    <meshStandardMaterial color="#ff69b4" />
                </mesh>
            </group>

            {/* Heart-shaped pillow on beanbag */}
            <mesh position={[-3, -2.2, 2.3]} rotation={[0.3, 0.5, 0]}>
                <sphereGeometry args={[0.4, 8, 8]} />
                <meshStandardMaterial color="#ff1493" />
            </mesh>
        </>
    );
}
