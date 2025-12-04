import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Room from "./Room";
import { Suspense, useEffect, useState } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export default function Scene() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{
                antialias: false, // Disable antialias when using postprocessing for better performance
                alpha: false,
                powerPreference: "high-performance",
                stencil: false,
                depth: true
            }}
            camera={{ position: [4, 3, 4], fov: 50 }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
            <Suspense fallback={null}>
                <color attach="background" args={['#1a0a1e']} />

                <Room />

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>

                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    rotateSpeed={0.4}
                    dampingFactor={0.05}
                    enableDamping={true}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                />

                <Preload all />
            </Suspense>
        </Canvas>
    );
}
