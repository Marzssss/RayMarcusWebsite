"use client";

import { useMemo } from "react";
import { useTexture, Sparkles, Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import Hotspots from "@/components/interactions/Hotspots";

export default function Room() {
    // Load Textures
    const wallTexture = useTexture("/textures/wall.png");
    const poster1Texture = useTexture("/textures/poster-live.svg");
    const poster2Texture = useTexture("/textures/poster-y2k.svg");
    const posterRnb1 = useTexture("/textures/poster-rnb1.svg");
    const posterRnb2 = useTexture("/textures/poster-rnb2.svg");
    const posterRnb3 = useTexture("/textures/poster-rnb3.svg");
    const rugTexture = useTexture("/textures/rug-shag.svg");
    const tvTexture = useTexture("/textures/tv-106.svg");

    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(2, 1);

    // Materials
    const materials = useMemo(() => ({
        floor: new THREE.MeshStandardMaterial({ color: "#2a1a2a", roughness: 0.8 }),
        wall: new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }),
        bedding: new THREE.MeshStandardMaterial({ color: "#9333ea", roughness: 0.6 }),
        desk: new THREE.MeshStandardMaterial({ color: "#ff69b4", roughness: 0.2 }),
        poster1: new THREE.MeshStandardMaterial({ map: poster1Texture, roughness: 0.4 }),
        poster2: new THREE.MeshStandardMaterial({ map: poster2Texture, roughness: 0.4 }),
        posterRnb1: new THREE.MeshStandardMaterial({ map: posterRnb1, roughness: 0.4 }),
        posterRnb2: new THREE.MeshStandardMaterial({ map: posterRnb2, roughness: 0.4 }),
        posterRnb3: new THREE.MeshStandardMaterial({ map: posterRnb3, roughness: 0.4 }),
        screen: new THREE.MeshStandardMaterial({ map: tvTexture, roughness: 0.1, metalness: 0.5, emissive: "#ffffff", emissiveIntensity: 0.5 }),
        rug: new THREE.MeshStandardMaterial({ map: rugTexture, roughness: 1, bumpScale: 0.5 }),
        lavaBase: new THREE.MeshStandardMaterial({ color: "#c0c0c0", metalness: 0.8, roughness: 0.2 }),
        lavaGlass: new THREE.MeshPhysicalMaterial({ color: "#ff4500", transmission: 0.6, thickness: 1, roughness: 0.1, ior: 1.5 }),
        beanBag: new THREE.MeshStandardMaterial({ color: "#00ced1", roughness: 0.8 }),
        wood: new THREE.MeshStandardMaterial({ color: "#5c4033", roughness: 0.6 }),
        pink: new THREE.MeshStandardMaterial({ color: "#ff69b4", roughness: 0.5 }),
        white: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.6 }),
        gold: new THREE.MeshStandardMaterial({ color: "#ffd700", metalness: 0.8, roughness: 0.2 }),
        silver: new THREE.MeshStandardMaterial({ color: "#c0c0c0", metalness: 0.9, roughness: 0.1 }),
        plastic: new THREE.MeshStandardMaterial({ color: "#333333", roughness: 0.3 }),
    }), [wallTexture, poster1Texture, poster2Texture, posterRnb1, posterRnb2, posterRnb3, rugTexture, tvTexture]);

    return (
        <group dispose={null}>
            {/* --- LIGHTING --- */}
            <ambientLight intensity={0.5} color="#4a004a" />
            <pointLight position={[0, 3, 0]} intensity={0.5} distance={10} color="#ffccaa" />
            <pointLight position={[-2, 2.5, -2]} intensity={1.2} distance={6} color="#ff69b4" />
            <pointLight position={[2, 2.5, -2]} intensity={1.2} distance={6} color="#00ffff" />
            <pointLight position={[1.5, 1, -1.8]} intensity={1.5} distance={4} color="#ff4500" />
            <pointLight position={[1.8, 1, -1.5]} intensity={1} distance={3} color="#00ff00" />
            <spotLight position={[-1, 2.8, -1]} target-position={[-1, 2, -2.5]} angle={0.6} penumbra={0.4} intensity={3} color="#ffffff" />
            <spotLight position={[1, 2.8, -1]} target-position={[1, 2, -2.5]} angle={0.6} penumbra={0.4} intensity={3} color="#ffffff" />

            {/* --- STRUCTURE --- */}
            <group name="Structure">
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={materials.floor}>
                    <planeGeometry args={[5, 5]} />
                </mesh>
                <mesh position={[0, 1.5, -2.5]} receiveShadow material={materials.wall}>
                    <planeGeometry args={[5, 3]} />
                </mesh>
                <mesh rotation={[0, Math.PI / 2, 0]} position={[-2.5, 1.5, 0]} receiveShadow material={materials.wall}>
                    <planeGeometry args={[5, 3]} />
                </mesh>
                <mesh rotation={[0, -Math.PI / 2, 0]} position={[2.5, 1.5, 0]} receiveShadow material={materials.wall}>
                    <planeGeometry args={[5, 3]} />
                </mesh>
            </group>

            {/* --- FURNITURE --- */}
            <group name="Furniture">
                {/* --- DETAILED BED --- */}
                <group name="Bed">
                    <mesh position={[-1.8, 0.2, 1]} castShadow receiveShadow material={materials.wood}>
                        <boxGeometry args={[1.3, 0.4, 2.6]} />
                    </mesh>
                    <mesh position={[-1.8, 0.8, -0.35]} castShadow receiveShadow material={materials.wood}>
                        <boxGeometry args={[1.3, 0.8, 0.1]} />
                    </mesh>
                    <mesh position={[-1.8, 0.45, 1]} castShadow receiveShadow>
                        <boxGeometry args={[1.2, 0.2, 2.5]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.9} />
                    </mesh>
                    <mesh position={[-1.8, 0.56, 1]} castShadow receiveShadow material={materials.bedding}>
                        <boxGeometry args={[1.18, 0.02, 2.48]} />
                    </mesh>
                    <mesh position={[-1.8, 0.62, 1.3]} castShadow receiveShadow>
                        <boxGeometry args={[1.1, 0.15, 1.5]} />
                        <meshStandardMaterial color="#e879f9" roughness={0.7} />
                    </mesh>
                    <mesh position={[-1.8, 0.68, 0.5]} castShadow receiveShadow rotation={[0.3, 0, 0]}>
                        <boxGeometry args={[1.1, 0.08, 0.4]} />
                        <meshStandardMaterial color="#e879f9" roughness={0.7} />
                    </mesh>
                    <mesh position={[-1.8, 0.7, -0.05]} rotation={[0.15, 0, 0]}>
                        <boxGeometry args={[0.9, 0.18, 0.35]} />
                        <meshStandardMaterial color="#fdf2f8" roughness={0.8} />
                    </mesh>
                    <mesh position={[-1.5, 0.8, 0]} rotation={[0.1, 0.3, 0]}>
                        <boxGeometry args={[0.4, 0.15, 0.3]} />
                        <meshStandardMaterial color="#fbcfe8" roughness={0.8} />
                    </mesh>
                    <mesh position={[-2.1, 0.75, 0.1]} rotation={[0.2, -0.2, 0.1]}>
                        <boxGeometry args={[0.25, 0.2, 0.25]} />
                        <meshStandardMaterial color="#c084fc" roughness={0.7} />
                    </mesh>
                    {/* Stuffed Animals */}
                    <mesh position={[-2.2, 0.75, 0.5]}>
                        <sphereGeometry args={[0.12, 16, 16]} />
                        <meshStandardMaterial color="#fca5a5" roughness={0.9} />
                    </mesh>
                    <mesh position={[-1.4, 0.75, 0.3]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#a5f3fc" roughness={0.9} />
                    </mesh>
                </group>

                {/* --- DESK / VANITY --- */}
                <group name="Desk">
                    <mesh position={[0, 0.4, -2]} castShadow receiveShadow material={materials.desk}>
                        <boxGeometry args={[2, 0.8, 0.8]} />
                    </mesh>
                    {/* Chair */}
                    <mesh position={[0, 0.3, -1.3]} castShadow receiveShadow material={materials.pink}>
                        <boxGeometry args={[0.5, 0.6, 0.5]} />
                    </mesh>
                    <mesh position={[0, 0.7, -1.1]} castShadow receiveShadow material={materials.pink}>
                        <boxGeometry args={[0.5, 0.5, 0.1]} />
                    </mesh>
                </group>

                {/* --- DETAILED VANITY ITEMS --- */}
                <group name="VanityItems" position={[0, 0.82, -2]}>
                    {/* Large Mirror */}
                    <mesh position={[0, 0.5, -0.2]} rotation={[0.1, 0, 0]}>
                        <planeGeometry args={[0.8, 0.6]} />
                        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0} />
                    </mesh>
                    <mesh position={[0, 0.5, -0.21]}>
                        <boxGeometry args={[0.85, 0.65, 0.03]} />
                        <meshStandardMaterial color="#ff69b4" />
                    </mesh>

                    {/* Makeup Organizer */}
                    <mesh position={[-0.6, 0.1, 0.1]}>
                        <boxGeometry args={[0.25, 0.2, 0.15]} />
                        <meshPhysicalMaterial color="#ffb6c1" transmission={0.3} roughness={0.1} />
                    </mesh>

                    {/* Perfume Bottles */}
                    <mesh position={[-0.3, 0.08, 0.15]}>
                        <cylinderGeometry args={[0.03, 0.04, 0.12, 8]} />
                        <meshPhysicalMaterial color="#ffd700" transmission={0.5} roughness={0} />
                    </mesh>
                    <mesh position={[-0.2, 0.06, 0.1]}>
                        <cylinderGeometry args={[0.025, 0.03, 0.1, 8]} />
                        <meshPhysicalMaterial color="#ff69b4" transmission={0.5} roughness={0} />
                    </mesh>

                    {/* Lipsticks */}
                    <mesh position={[0.3, 0.04, 0.15]} rotation={[0, 0, Math.PI / 8]}>
                        <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
                        <meshStandardMaterial color="#ff0000" />
                    </mesh>
                    <mesh position={[0.35, 0.04, 0.12]} rotation={[0, 0, -Math.PI / 6]}>
                        <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
                        <meshStandardMaterial color="#cc0066" />
                    </mesh>

                    {/* Jewelry Box */}
                    <mesh position={[0.5, 0.06, 0.1]}>
                        <boxGeometry args={[0.18, 0.1, 0.14]} />
                        <meshStandardMaterial color="#8b4513" />
                    </mesh>

                    {/* Hair Brush */}
                    <mesh position={[0.7, 0.02, 0.15]} rotation={[0, 0.5, 0]}>
                        <boxGeometry args={[0.06, 0.02, 0.15]} />
                        <meshStandardMaterial color="#ff69b4" />
                    </mesh>

                    {/* Hair Products */}
                    <mesh position={[-0.7, 0.1, 0.1]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.18, 8]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    <mesh position={[-0.8, 0.08, 0.15]}>
                        <cylinderGeometry args={[0.035, 0.035, 0.14, 8]} />
                        <meshStandardMaterial color="#ffd700" />
                    </mesh>

                    {/* Photo Frame */}
                    <mesh position={[0.85, 0.15, 0.05]} rotation={[0.2, -0.3, 0]}>
                        <boxGeometry args={[0.15, 0.2, 0.02]} />
                        <meshStandardMaterial color="#ff69b4" />
                    </mesh>

                    {/* Candle */}
                    <mesh position={[-0.5, 0.08, 0.2]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
                        <meshStandardMaterial color="#ffb6c1" />
                    </mesh>
                </group>

                {/* TV Stand */}
                <mesh position={[1.8, 0.3, -1.8]} castShadow receiveShadow material={materials.wood}>
                    <boxGeometry args={[1, 0.6, 1]} />
                </mesh>

                {/* Bean Bag Chair */}
                <mesh position={[1.5, 0.4, 1.5]} castShadow receiveShadow material={materials.beanBag}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                </mesh>

                {/* --- DETAILED FUR RUG --- */}
                <group position={[0.3, 0.01, 0.5]} rotation={[-Math.PI / 2, 0, 0.2]}>
                    {/* Base layer */}
                    <mesh receiveShadow>
                        <circleGeometry args={[1.0, 48]} />
                        <meshStandardMaterial color="#ff1493" roughness={1} />
                    </mesh>
                    {/* Fluffy layers */}
                    <mesh position={[0, 0, 0.01]}>
                        <circleGeometry args={[0.95, 48]} />
                        <meshStandardMaterial color="#ff69b4" roughness={1} />
                    </mesh>
                    <mesh position={[0.05, 0.05, 0.02]}>
                        <circleGeometry args={[0.9, 48]} />
                        <meshStandardMaterial color="#ff1493" roughness={1} />
                    </mesh>
                    <mesh position={[-0.03, 0.03, 0.03]}>
                        <circleGeometry args={[0.85, 48]} />
                        <meshStandardMaterial color="#db2777" roughness={1} />
                    </mesh>
                </group>

                {/* Bookshelf */}
                <group position={[2.2, 0.8, 1]}>
                    <mesh material={materials.wood}>
                        <boxGeometry args={[0.6, 1.6, 0.4]} />
                    </mesh>
                    {/* Books */}
                    <mesh position={[-0.15, 0.4, 0.1]}>
                        <boxGeometry args={[0.08, 0.35, 0.25]} />
                        <meshStandardMaterial color="#ff0000" />
                    </mesh>
                    <mesh position={[-0.05, 0.38, 0.1]}>
                        <boxGeometry args={[0.08, 0.32, 0.25]} />
                        <meshStandardMaterial color="#0000ff" />
                    </mesh>
                    <mesh position={[0.05, 0.42, 0.1]}>
                        <boxGeometry args={[0.08, 0.38, 0.25]} />
                        <meshStandardMaterial color="#00ff00" />
                    </mesh>
                    <mesh position={[0.15, 0.36, 0.1]}>
                        <boxGeometry args={[0.08, 0.3, 0.25]} />
                        <meshStandardMaterial color="#ffff00" />
                    </mesh>
                    {/* Photo frames */}
                    <mesh position={[0, -0.3, 0.15]} rotation={[0.1, 0, 0]}>
                        <boxGeometry args={[0.2, 0.25, 0.02]} />
                        <meshStandardMaterial color="#c0c0c0" />
                    </mesh>
                </group>

                {/* Floor Lamp */}
                <group position={[2, 0, -0.5]}>
                    <mesh position={[0, 0.6, 0]} material={materials.plastic}>
                        <cylinderGeometry args={[0.03, 0.05, 1.2, 8]} />
                    </mesh>
                    <mesh position={[0, 1.3, 0]}>
                        <coneGeometry args={[0.2, 0.3, 16]} />
                        <meshStandardMaterial color="#ffccff" emissive="#ffccff" emissiveIntensity={0.3} />
                    </mesh>
                </group>
            </group>

            {/* --- WALL DECOR --- */}
            <group name="WallDecor">
                {/* Back Wall Posters */}
                <mesh position={[-1.5, 2, -2.49]} material={materials.poster1}>
                    <planeGeometry args={[0.6, 0.9]} />
                </mesh>
                <mesh position={[-0.5, 2.2, -2.49]} material={materials.poster2}>
                    <planeGeometry args={[0.5, 0.7]} />
                </mesh>
                <mesh position={[0.5, 1.8, -2.49]} material={materials.posterRnb1}>
                    <planeGeometry args={[0.6, 0.8]} />
                </mesh>
                <mesh position={[1.5, 2.1, -2.49]} material={materials.posterRnb2}>
                    <planeGeometry args={[0.5, 0.75]} />
                </mesh>

                {/* Left Wall Posters */}
                <mesh position={[-2.49, 2, -0.5]} rotation={[0, Math.PI / 2, 0]} material={materials.posterRnb3}>
                    <planeGeometry args={[0.7, 1]} />
                </mesh>
                <mesh position={[-2.49, 2.2, 0.8]} rotation={[0, Math.PI / 2, 0]} material={materials.poster1}>
                    <planeGeometry args={[0.5, 0.7]} />
                </mesh>
                <mesh position={[-2.49, 1.5, 1.5]} rotation={[0, Math.PI / 2, 0]} material={materials.posterRnb1}>
                    <planeGeometry args={[0.4, 0.6]} />
                </mesh>

                {/* Right Wall Posters */}
                <mesh position={[2.49, 2.3, -1]} rotation={[0, -Math.PI / 2, 0]} material={materials.posterRnb2}>
                    <planeGeometry args={[0.6, 0.85]} />
                </mesh>
                <mesh position={[2.49, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} material={materials.poster2}>
                    <planeGeometry args={[0.5, 0.65]} />
                </mesh>

                {/* Cork Board with Photos */}
                <mesh position={[0, 1.5, -2.49]}>
                    <planeGeometry args={[0.8, 0.6]} />
                    <meshStandardMaterial color="#d2b48c" roughness={0.9} />
                </mesh>
                <mesh position={[-0.2, 1.55, -2.48]} rotation={[0, 0, 0.1]}>
                    <planeGeometry args={[0.15, 0.2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[0.15, 1.45, -2.48]} rotation={[0, 0, -0.15]}>
                    <planeGeometry args={[0.15, 0.2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[0, 1.6, -2.48]} rotation={[0, 0, 0.05]}>
                    <planeGeometry args={[0.12, 0.15]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Wall Shelves */}
                <mesh position={[-1.8, 1.5, -2.45]}>
                    <boxGeometry args={[0.6, 0.05, 0.15]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>
                {/* Items on shelf */}
                <mesh position={[-1.9, 1.58, -2.4]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
                    <meshPhysicalMaterial color="#ff69b4" transmission={0.5} />
                </mesh>
                <mesh position={[-1.7, 1.58, -2.4]}>
                    <boxGeometry args={[0.08, 0.12, 0.06]} />
                    <meshStandardMaterial color="#ffd700" />
                </mesh>

                {/* Fairy Lights around ceiling */}
                <Sparkles count={100} scale={[5, 0.5, 5]} size={3} speed={0.3} opacity={0.9} color="#ff69b4" position={[0, 2.8, 0]} />
                <Sparkles count={50} scale={[5, 0.5, 5]} size={2} speed={0.2} opacity={0.7} color="#00ffff" position={[0, 2.7, 0]} />
            </group>

            {/* --- FLOOR ITEMS --- */}
            <group name="FloorItems">
                {/* Shoes by door */}
                <mesh position={[2, 0.05, 2]} rotation={[0, -0.5, 0]}>
                    <boxGeometry args={[0.08, 0.08, 0.2]} />
                    <meshStandardMaterial color="#ff1493" />
                </mesh>
                <mesh position={[2.15, 0.05, 2.05]} rotation={[0, -0.3, 0]}>
                    <boxGeometry args={[0.08, 0.08, 0.2]} />
                    <meshStandardMaterial color="#ff1493" />
                </mesh>

                {/* Magazine Stack */}
                <mesh position={[0.8, 0.05, 1.8]} rotation={[0, 0.3, 0]}>
                    <boxGeometry args={[0.25, 0.08, 0.35]} />
                    <meshStandardMaterial color="#ff69b4" />
                </mesh>

                {/* Throw Pillow on floor */}
                <mesh position={[1, 0.1, 0.8]} rotation={[0.2, 0.5, 0.1]}>
                    <boxGeometry args={[0.3, 0.15, 0.3]} />
                    <meshStandardMaterial color="#c084fc" />
                </mesh>
            </group>

            {/* --- TV & ELECTRONICS --- */}
            <group name="Electronics">
                {/* TV Screen */}
                <mesh position={[1.8, 0.9, -1.8]} rotation={[0, -0.5, 0]}>
                    <boxGeometry args={[0.8, 0.6, 0.08]} />
                    <primitive object={materials.screen} />
                </mesh>

                {/* DVD/CD Player */}
                <mesh position={[1.8, 0.65, -1.75]}>
                    <boxGeometry args={[0.4, 0.08, 0.3]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>

                {/* CDs scattered */}
                <mesh position={[1.5, 0.62, -1.6]} rotation={[-Math.PI / 2, 0, 0.2]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
                </mesh>
                <mesh position={[1.6, 0.62, -1.55]} rotation={[-Math.PI / 2, 0, -0.3]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
                </mesh>

                {/* Lava Lamp */}
                <group position={[2.1, 0.6, -1.75]}>
                    <mesh position={[0, 0.1, 0]} material={materials.lavaBase}>
                        <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
                    </mesh>
                    <mesh position={[0, 0.35, 0]} material={materials.lavaGlass}>
                        <capsuleGeometry args={[0.07, 0.3, 4, 8]} />
                    </mesh>
                    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
                        <mesh position={[0, 0.35, 0]}>
                            <sphereGeometry args={[0.04, 16, 16]} />
                            <meshBasicMaterial color="#ff4500" />
                        </mesh>
                    </Float>
                </group>
            </group>

            {/* Hotspots */}
            <Hotspots />

            {/* Realism Enhancements */}
            <Environment preset="city" environmentIntensity={0.5} />
            <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={10} blur={2} far={4} />
        </group>
    );
}
