"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RibbonInstallation({
  mouse,
  isSuccess,
  isTouch,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  isSuccess: boolean;
  isTouch: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // High-precision architectural infinity-ribbon curve
  const { geometry } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      const x = Math.sin(u) * 2.6 + Math.sin(2 * u) * 0.95;
      const y = Math.cos(u) * 1.6 + Math.cos(2 * u) * 0.45;
      const z = Math.sin(3 * u) * 0.8;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    const geom = new THREE.TubeGeometry(curve, 160, 0.24, 20, true);
    return { geometry: geom };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Continuous architectural rotation
    const rotSpeed = isSuccess ? 0.4 : 0.08;
    meshRef.current.rotation.y += delta * rotSpeed;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06;

    if (!isTouch) {
      // Subtle cursor parallax (0.35x depth factor)
      const targetRotX = mouse.current.y * 0.28;
      const targetRotY = mouse.current.x * 0.38;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        2.5,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        2.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#FAF8F5"
          roughness={0.22}
          metalness={0.18}
          clearcoat={0.4}
          clearcoatRoughness={0.12}
          reflectivity={0.65}
          sheen={0.45}
          sheenColor={new THREE.Color("#EEEBFF")}
        />
      </mesh>
    </group>
  );
}

// Camera transition controller for the "entering the platform" effect
function CameraController({ isSuccess }: { isSuccess: boolean }) {
  useFrame((state, delta) => {
    if (isSuccess) {
      // Smoothly push camera forward into the architectural portal
      state.camera.position.z = THREE.MathUtils.damp(
        state.camera.position.z,
        1.5,
        2.2,
        delta
      );
      state.camera.position.y = THREE.MathUtils.damp(
        state.camera.position.y,
        0.2,
        2,
        delta
      );
    }
  });
  return null;
}

// Drifting knowledge motes in warm amber & lavender
function AtmosphericMotes() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, count] = useMemo(() => {
    const c = 48;
    const pos = new Float32Array(c * 3);
    for (let i = 0; i < c; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return [pos, c];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A5B4FC"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ChapterZeroScene({
  isSuccess = false,
}: {
  isSuccess?: boolean;
}) {
  const mouse = useRef({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      isTouchRef.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  const handlePointerLeave = () => {
    mouse.current = { x: 0, y: 0 };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute inset-0 size-full pointer-events-auto"
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.3} color="#FFFFFF" />
        <directionalLight position={[6, 9, 7]} intensity={2.0} color="#FFFBF2" />
        <directionalLight position={[-5, -4, -3]} intensity={0.7} color="#EEEBFF" />
        <spotLight
          position={[0, 8, 5]}
          intensity={1.0}
          angle={0.65}
          penumbra={1}
          color="#FAF8F5"
        />

        <CameraController isSuccess={isSuccess} />

        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
          <RibbonInstallation
            mouse={mouse}
            isSuccess={isSuccess}
            isTouch={isTouchRef.current}
          />
        </Float>
        <AtmosphericMotes />
      </Canvas>
    </div>
  );
}
