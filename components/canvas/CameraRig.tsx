"use client";

// @ts-expect-error - Beta version type issues
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

export function CameraRig() {
    const { viewport } = useThree();

    useFrame((state: any, delta: number) => {
        // Smooth camera movement based on pointer position
        // Divide by 20 to keep it subtle (fake parallax)
        easing.damp3(
            state.camera.position,
            [
                (state.pointer.x * viewport.width) / 20,
                (state.pointer.y * viewport.height) / 20,
                5
            ],
            0.25,
            delta
        );

        // Look slightly towards the center
        state.camera.lookAt(0, 0, 0);
    });

    return null; // This component only controls the camera
}
