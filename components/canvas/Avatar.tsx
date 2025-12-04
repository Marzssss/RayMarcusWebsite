"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Avatar() {
    const group = useRef<THREE.Group>(null);

    const materials = useMemo(() => ({
        skin: new THREE.MeshStandardMaterial({ color: "#8d5524", roughness: 0.7 }),
        hair: new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.95 }),
        top: new THREE.MeshStandardMaterial({ color: "#ff69b4", roughness: 0.6 }),
        pants: new THREE.MeshStandardMaterial({ color: "#1e3a5f", roughness: 0.7 }),
        socks: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.8 }),
    }), []);

    // Gentle foot sway animation
    useFrame((state) => {
        if (group.current) {
            const t = state.clock.getElapsedTime();
            const leftFoot = group.current.getObjectByName("LeftFoot");
            const rightFoot = group.current.getObjectByName("RightFoot");
            if (leftFoot) leftFoot.rotation.x = Math.sin(t * 1.5) * 0.15;
            if (rightFoot) rightFoot.rotation.x = Math.sin(t * 1.5 + 1) * 0.15;
        }
    });

    return (
        <group ref={group} position={[-1.8, 0.72, 0.8]} rotation={[0, Math.PI, 0]}>
            {/* --- TORSO (laying flat on stomach) --- */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.top}>
                <capsuleGeometry args={[0.18, 0.4, 8, 16]} />
            </mesh>

            {/* --- HEAD (face down on pillow, slightly turned) --- */}
            <group position={[0, 0.05, -0.45]} rotation={[-0.3, 0.4, 0]}>
                {/* Head */}
                <mesh material={materials.skin}>
                    <sphereGeometry args={[0.16, 24, 24]} />
                </mesh>

                {/* Hair - natural afro puffs style */}
                <mesh position={[0, 0.12, 0]} material={materials.hair}>
                    <sphereGeometry args={[0.14, 16, 16]} />
                </mesh>
                <mesh position={[-0.1, 0.14, 0.02]} material={materials.hair}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                </mesh>
                <mesh position={[0.1, 0.14, 0.02]} material={materials.hair}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                </mesh>
                <mesh position={[0, 0.08, -0.1]} material={materials.hair}>
                    <sphereGeometry args={[0.12, 12, 12]} />
                </mesh>
            </group>

            {/* --- ARMS (resting beside head, elbows bent) --- */}
            {/* Left Arm */}
            <group position={[-0.22, 0, -0.15]}>
                <mesh rotation={[1.2, 0, 0.3]} material={materials.skin}>
                    <capsuleGeometry args={[0.05, 0.25, 6, 12]} />
                </mesh>
                <mesh position={[-0.08, 0.02, -0.2]} rotation={[0.8, 0, 0]} material={materials.skin}>
                    <capsuleGeometry args={[0.04, 0.2, 6, 12]} />
                </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.22, 0, -0.15]}>
                <mesh rotation={[1.2, 0, -0.3]} material={materials.skin}>
                    <capsuleGeometry args={[0.05, 0.25, 6, 12]} />
                </mesh>
                <mesh position={[0.08, 0.02, -0.2]} rotation={[0.8, 0, 0]} material={materials.skin}>
                    <capsuleGeometry args={[0.04, 0.2, 6, 12]} />
                </mesh>
            </group>

            {/* --- HIPS --- */}
            <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]} material={materials.pants}>
                <capsuleGeometry args={[0.2, 0.15, 8, 16]} />
            </mesh>

            {/* --- LEGS (thighs laying flat) --- */}
            {/* Left Thigh */}
            <mesh position={[-0.12, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} material={materials.pants}>
                <capsuleGeometry args={[0.09, 0.35, 6, 12]} />
            </mesh>
            {/* Right Thigh */}
            <mesh position={[0.12, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} material={materials.pants}>
                <capsuleGeometry args={[0.09, 0.35, 6, 12]} />
            </mesh>

            {/* --- LOWER LEGS (bent up, feet in air) --- */}
            {/* Left Lower Leg */}
            <group position={[-0.12, 0.15, 0.7]}>
                <mesh rotation={[0.3, 0, 0]} material={materials.pants}>
                    <capsuleGeometry args={[0.07, 0.3, 6, 12]} />
                </mesh>
                {/* Left Foot */}
                <group name="LeftFoot" position={[0, 0.35, 0.05]}>
                    <mesh material={materials.socks}>
                        <capsuleGeometry args={[0.05, 0.1, 6, 8]} />
                    </mesh>
                </group>
            </group>
            {/* Right Lower Leg */}
            <group position={[0.12, 0.2, 0.7]}>
                <mesh rotation={[0.5, 0, 0]} material={materials.pants}>
                    <capsuleGeometry args={[0.07, 0.3, 6, 12]} />
                </mesh>
                {/* Right Foot */}
                <group name="RightFoot" position={[0, 0.35, 0.08]}>
                    <mesh material={materials.socks}>
                        <capsuleGeometry args={[0.05, 0.1, 6, 8]} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}
