import type Lenis from "lenis";

// Shared, allocation-free scroll state read by the WebGL scene every frame.
export const scrollState = { progress: 0, velocity: 0 };

let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenisInstance = l);
export const getLenis = () => lenisInstance;
