"use client";

import { useState } from "react";
import { useCursor } from "@react-three/drei";
import { useStore } from "@/lib/store";
import { Vector3 } from "three";

interface HotspotProps {
    position: [number, number, number];
    scale?: [number, number, number];
    section: string;
    label?: string;
}

export function Hotspot({ position, scale = [1, 1, 1], section, label }: HotspotProps) {
    const [hovered, setHover] = useState(false);
    const openSection = useStore((state) => state.openSection);

    useCursor(hovered);

    return (
        <mesh
            position={position}
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                openSection(section);
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            visible={false} // Invisible hit area
        >
            <boxGeometry />
            <meshBasicMaterial transparent opacity={0.5} color="hotpink" />
        </mesh>
    );
}

export default function Hotspots() {
    return (
        <group>
            {/* CD Rack / Music Area */}
            <Hotspot position={[-1.5, 0.8, -1.8]} scale={[1, 0.5, 0.5]} section="music" label="CDs" />

            {/* TV / Video Area */}
            <Hotspot position={[1.2, 0.9, -1.8]} scale={[1.2, 0.8, 0.5]} section="video" label="TV" />

            {/* Desk / Bio Area */}
            <Hotspot position={[0, 0.8, -1.5]} scale={[1, 0.5, 0.8]} section="bio" label="Desk" />
        </group>
    );
}
