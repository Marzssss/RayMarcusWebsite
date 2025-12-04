"use client";

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import RoomScene from './RoomScene';
import { Suspense } from 'react';

export default function SceneWrapper() {
    return (
        <Canvas
            camera={{ position: [6, 3, 8], fov: 50 }}
            className="w-full h-full touch-none"
            dpr={[1, 1.5]} // Limit pixel ratio for mobile performance
            performance={{ min: 0.5 }} // Allow frame rate to drop for smoothness
            gl={{
                antialias: true,
                powerPreference: "high-performance",
                alpha: true
            }}
        >
            <fog attach="fog" args={['#1a0a1a', 8, 25]} />
            <Suspense fallback={null}>
                <RoomScene />
                <Preload all />
            </Suspense>
        </Canvas>
    );
}
