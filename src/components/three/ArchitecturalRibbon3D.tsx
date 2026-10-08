"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RibbonMesh({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate parametric sculptural ribbon curve inspired by knowledge & spatial architecture
  const { geometry } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      // Elegant architectural infinity-twist curve
      const x = Math.sin(u) * 2.1 + Math.sin(2 * u) * 0.85;
      const y = Math.cos(u) * 1.35 + Math.cos(2 * u) * 0.35;
      const z = Math.sin(3 * u) * 0.65;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    const geom = new THREE.TubeGeometry(curve, 120, 0.2, 16, true);
    return { geometry: geom };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Gentle continuous architectural rotation
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;

    // Subtle responsive tilt to pointer mouse movement (1-3 degrees)
    const targetRotX = mouse.current.y * 0.15;
    const targetRotY = mouse.current.x * 0.25;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#FBFAF7"
          roughness={0.25}
          metalness={0.15}
          clearcoat={0.35}
          clearcoatRoughness={0.15}
          reflectivity={0.6}
          sheen={0.4}
          sheenColor={new THREE.Color("#EEEBFF")}
        />
      </mesh>
    </group>
  );
}

// Micro knowledge particles drifting gently around the sculpture
function KnowledgeDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, count] = useMemo(() => {
    const c = 36;
    const pos = new Float32Array(c * 3);
    for (let i = 0; i < c; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return [pos, c];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#818CF8"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ArchitecturalRibbon3D() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[5, 8, 6]} intensity={1.8} color="#FFFBF0" />
        <directionalLight position={[-4, -3, -2]} intensity={0.6} color="#EEEBFF" />
        <spotLight
          position={[0, 6, 4]}
          intensity={0.9}
          angle={0.6}
          penumbra={1}
          color="#FAF8F5"
        />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <RibbonMesh mouse={mouse} />
        </Float>
        <KnowledgeDust />
      </Canvas>
    </div>
  );
}
