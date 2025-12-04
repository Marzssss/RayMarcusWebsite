"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Overlay from '@/components/ui/Overlay';

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="relative w-full h-screen overflow-hidden bg-black" suppressHydrationWarning>
            <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white">Loading 3D Experience...</div>}>
                <Scene />
            </Suspense>
            <Overlay />
        </main>
    );
}
