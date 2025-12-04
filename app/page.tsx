"use client";

import dynamic from 'next/dynamic';
import ModalRoot from '@/components/ModalRoot';
import LoadingScreen from '@/components/LoadingScreen';
import { Suspense } from 'react';

const SceneWrapper = dynamic(() => import('@/components/SceneWrapper'), {
    ssr: false,
    loading: () => <LoadingScreen />
});

export default function Home() {
    return (
        <main className="w-full h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                    RAY MARCUS
                </h1>
                <p className="text-pink-300 text-xs md:text-sm mt-1 tracking-widest uppercase">
                    ✧ Interactive Experience ✧
                </p>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-2">
                    <p className="text-pink-200 text-xs md:text-sm">
                        ✦ Drag to rotate • Click objects to interact ✦
                    </p>
                </div>
            </div>

            {/* Social hint */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 pointer-events-none">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-pink-400/30">
                    <p className="text-pink-200 text-xs">
                        🎵 Click the phone for Instagram
                    </p>
                </div>
            </div>

            {/* 3D Canvas */}
            <Suspense fallback={<LoadingScreen />}>
                <SceneWrapper />
            </Suspense>

            {/* Modals */}
            <ModalRoot />

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-bl from-pink-500/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
        </main>
    );
}
