# Performance Report

## Overview
This report details the performance optimizations implemented for the Ray Marcus 3D Artist Website upgrade.

## Core Metrics (Estimated)
- **Lighthouse Mobile Score**: 95+ (Target)
- **First Contentful Paint (FCP)**: < 1.5s
- **Time to Interactive (TTI)**: < 2.0s
- **Bundle Size**: Minimal initial load due to code splitting and lazy loading.

## Optimizations Implemented

### 1. Progressive Hydration & Lazy Loading
- **3D Scene**: The entire 3D scene is lazy-loaded via `next/dynamic` with `ssr: false`. This ensures the initial HTML payload is tiny and the heavy WebGL context doesn't block the main thread during hydration.
- **Suspense Boundaries**: A lightweight loading state is shown while the 3D scene initializes.

### 2. React 19 & Next.js 15
- **Server Components**: We leverage React Server Components (RSC) for the initial shell, reducing the amount of JavaScript sent to the client.
- **Compiler**: React 19's compiler (if enabled) and Next.js 15's optimizations ensure efficient re-renders.

### 3. Three.js / R3F Optimizations
- **AdaptiveDpr**: We use `@react-three/drei`'s `AdaptiveDpr` to automatically lower the pixel ratio on low-end devices or during movement, ensuring high FPS.
- **AdaptiveEvents**: Raycasting is optimized to skip checks when the scene is static or performance drops.
- **Geometry & Textures**: We use simple primitives (`BoxGeometry`, `PlaneGeometry`) instead of heavy GLTF models. Textures are loaded via `useTexture` which handles caching.

### 4. Asset Optimization
- **Images**: Next.js `<Image>` component (if used in Overlay) handles automatic resizing and format conversion (WebP/AVIF).
- **Caching**: Aggressive `Cache-Control` headers are configured in `next.config.ts` for immutable assets.

### 5. Mobile-First Considerations
- **Touch Targets**: All interactive elements (CDs, Menu buttons) have large hit areas.
- **Viewport Management**: The `Scene` handles resize events gracefully, and the UI is responsive via Tailwind CSS.

## GPU Budget
- **Target**: Run smoothly on iPhone 8 / Android mid-range.
- **Strategy**:
    - Limit dynamic lights (1 ambient, 1 point, 1 spot).
    - Avoid complex post-processing effects (Bloom, DOF) for the MVP.
    - Use baked lighting where possible (simulated via textures in this demo).

## Bottlenecks Removed
- **Hydration Mismatch**: Fixed a critical hydration error caused by `window.devicePixelRatio` usage during initial render.
- **React 19 Compatibility**: Upgraded R3F to beta versions to resolve `ReactCurrentOwner` runtime errors.
