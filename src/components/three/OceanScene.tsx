"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";
import { useTheme } from "@/context/ThemeContext";

const damp = THREE.MathUtils.damp;

/**
 * Ultra-Luxury Ethereal Constellation Whale / Leviathan
 * Precision sculpted from luminous golden rib rings, sapphire crystal glass body,
 * and gossamer solar fins that undulate with organic fluid physics.
 */
function LuxuryCelestialWhale({ isLight }: { isLight: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const spineGroup = useRef<THREE.Group>(null!);
  const fluke = useRef<THREE.Group>(null!);
  const leftWing = useRef<THREE.Group>(null!);
  const rightWing = useRef<THREE.Group>(null!);

  // Generate 12 precision concentric rib rings along the spine
  const ribs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const progress = i / 11;
      const scale = Math.sin(progress * Math.PI * 0.85 + 0.25) * 0.95 + 0.15;
      const zOffset = -i * 0.42;
      return { id: i, scale, zOffset };
    });
  }, []);

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * 1.1;
    const scroll = scrollState.progress;

    // Graceful 3D trajectory through space
    const targetY = 1.1 - scroll * 9.8 + Math.sin(t * 0.35) * 0.35;
    const targetX = 1.6 + Math.cos(t * 0.28) * 0.5 + state.pointer.x * 0.4;
    const targetZ = -1.1 - Math.sin(scroll * Math.PI) * 1.2;

    group.current.position.y = damp(group.current.position.y, targetY, 2.2, dt);
    group.current.position.x = damp(group.current.position.x, targetX, 2.2, dt);
    group.current.position.z = damp(group.current.position.z, targetZ, 2.2, dt);

    // Roll & pitch with subtle banking
    group.current.rotation.z = Math.sin(t * 0.4) * 0.06 - state.pointer.x * 0.12;
    group.current.rotation.x = 0.18 + Math.cos(t * 0.35) * 0.05;
    group.current.rotation.y = -0.55 + Math.sin(t * 0.25) * 0.12;

    // Dynamic S-curve spine motion
    if (spineGroup.current) {
      spineGroup.current.children.forEach((child, idx) => {
        child.position.x = Math.sin(t * 1.8 - idx * 0.35) * (0.05 + idx * 0.02);
        child.rotation.y = Math.cos(t * 1.8 - idx * 0.35) * (0.06 + idx * 0.025);
      });
    }

    // Majestic fluke oscillation
    if (fluke.current) {
      fluke.current.rotation.y = Math.sin(t * 1.8 - 3.8) * 0.42;
      fluke.current.rotation.z = Math.cos(t * 1.8 - 3.8) * 0.18;
    }

    // Solar Gossamer Wings fluid flapping
    if (leftWing.current) {
      leftWing.current.rotation.z = -0.22 + Math.sin(t * 1.5) * 0.25;
      leftWing.current.rotation.x = Math.cos(t * 1.5) * 0.12;
    }
    if (rightWing.current) {
      rightWing.current.rotation.z = 0.22 - Math.sin(t * 1.5) * 0.25;
      rightWing.current.rotation.x = Math.cos(t * 1.5) * 0.12;
    }
  });

  return (
    <group ref={group} scale={1.05}>
      {/* Cranium / Head - Faceted Luxury Diamond Glass */}
      <mesh position={[0, 0, 0.4]}>
        <sphereGeometry args={[0.62, 32, 24]} />
        <meshPhysicalMaterial
          color={isLight ? "#e2e8f0" : "#0b1e36"}
          roughness={0.08}
          metalness={isLight ? 0.3 : 0.7}
          transmission={isLight ? 0.8 : 0.4}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Golden Astrolabe Coronet around Head */}
      <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[0.66, 0.022, 16, 64]} />
        <meshStandardMaterial
          color={isLight ? "#b8860b" : "#e5c378"}
          metalness={0.96}
          roughness={0.15}
        />
      </mesh>

      {/* Bioluminescent Starlight Crown Node */}
      <pointLight
        position={[0, 0.5, 0.2]}
        color={isLight ? "#059669" : "#39ff14"}
        intensity={2.4}
        distance={3.8}
      />

      {/* Articulated Spine Rib Cage */}
      <group ref={spineGroup} position={[0, 0, 0]}>
        {ribs.map(({ id, scale, zOffset }) => (
          <group key={id} position={[0, 0, zOffset]}>
            {/* Outer Golden Armillary Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.55 * scale, 0.018, 16, 48]} />
              <meshStandardMaterial
                color={
                  id % 2 === 0
                    ? isLight
                      ? "#b8860b"
                      : "#e5c378"
                    : isLight
                    ? "#059669"
                    : "#39ff14"
                }
                metalness={0.94}
                roughness={0.18}
                wireframe={id % 3 === 0}
              />
            </mesh>

            {/* Inner Translucent Volume */}
            <mesh>
              <sphereGeometry args={[0.52 * scale, 24, 16]} />
              <meshPhysicalMaterial
                color={isLight ? "#f8fafc" : "#061324"}
                roughness={0.15}
                metalness={isLight ? 0.2 : 0.65}
                transmission={isLight ? 0.8 : 0.35}
                clearcoat={0.9}
              />
            </mesh>

            {/* Glowing Vertebral Axis Point */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={isLight ? "#b8860b" : "#fae6b2"} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Left Gossamer Solar Wing */}
      <group ref={leftWing} position={[-0.6, -0.05, -0.6]} rotation={[0, -0.35, -0.2]}>
        <mesh position={[-1.1, 0, 0]}>
          <boxGeometry args={[2.2, 0.025, 0.55]} />
          <meshPhysicalMaterial
            color={isLight ? "#f8fafc" : "#0f2b4c"}
            transmission={isLight ? 0.85 : 0.65}
            roughness={0.1}
            metalness={isLight ? 0.2 : 0.8}
            clearcoat={1.0}
          />
        </mesh>
        <mesh position={[-1.1, 0.015, 0.24]}>
          <boxGeometry args={[2.25, 0.03, 0.04]} />
          <meshStandardMaterial
            color={isLight ? "#b8860b" : "#e5c378"}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        {[-0.4, -0.9, -1.4, -1.9].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.52, 8]} />
            <meshBasicMaterial color={isLight ? "#059669" : "#39ff14"} />
          </mesh>
        ))}
      </group>

      {/* Right Gossamer Solar Wing */}
      <group ref={rightWing} position={[0.6, -0.05, -0.6]} rotation={[0, 0.35, 0.2]}>
        <mesh position={[1.1, 0, 0]}>
          <boxGeometry args={[2.2, 0.025, 0.55]} />
          <meshPhysicalMaterial
            color={isLight ? "#f8fafc" : "#0f2b4c"}
            transmission={isLight ? 0.85 : 0.65}
            roughness={0.1}
            metalness={isLight ? 0.2 : 0.8}
            clearcoat={1.0}
          />
        </mesh>
        <mesh position={[1.1, 0.015, 0.24]}>
          <boxGeometry args={[2.25, 0.03, 0.04]} />
          <meshStandardMaterial
            color={isLight ? "#b8860b" : "#e5c378"}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        {[0.4, 0.9, 1.4, 1.9].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.52, 8]} />
            <meshBasicMaterial color={isLight ? "#059669" : "#39ff14"} />
          </mesh>
        ))}
      </group>

      {/* Caudal Fluke (Tail) */}
      <group ref={fluke} position={[0, 0, -4.9]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 2.4, 16]} />
          <meshStandardMaterial
            color={isLight ? "#b8860b" : "#e5c378"}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[-0.65, 0, -0.32]} rotation={[0, 0.28, Math.PI / 2]}>
          <boxGeometry args={[0.55, 0.02, 1.1]} />
          <meshPhysicalMaterial
            color={isLight ? "#f8fafc" : "#0f2b4c"}
            transmission={isLight ? 0.85 : 0.7}
            roughness={0.12}
            metalness={0.4}
            clearcoat={1.0}
          />
        </mesh>
        <mesh position={[0.65, 0, -0.32]} rotation={[0, -0.28, Math.PI / 2]}>
          <boxGeometry args={[0.55, 0.02, 1.1]} />
          <meshPhysicalMaterial
            color={isLight ? "#f8fafc" : "#0f2b4c"}
            transmission={isLight ? 0.85 : 0.7}
            roughness={0.12}
            metalness={0.4}
            clearcoat={1.0}
          />
        </mesh>
        <pointLight
          position={[0, 0, -0.4]}
          color={isLight ? "#b8860b" : "#e5c378"}
          intensity={1.6}
          distance={2.5}
        />
      </group>
    </group>
  );
}

/**
 * Kinetic Celestial Horology Core (Armillary Knowledge Sphere)
 */
function KineticAstrolabe({
  position,
  isLight,
}: {
  position: [number, number, number];
  isLight: boolean;
}) {
  const ring1 = useRef<THREE.Group>(null!);
  const ring2 = useRef<THREE.Group>(null!);
  const ring3 = useRef<THREE.Group>(null!);
  const jewel = useRef<THREE.Mesh>(null!);

  useFrame((_, dt) => {
    if (ring1.current) ring1.current.rotation.x += dt * 0.35;
    if (ring2.current) ring2.current.rotation.y += dt * 0.48;
    if (ring3.current) ring3.current.rotation.z += dt * 0.28;
    if (jewel.current) {
      jewel.current.rotation.x += dt * 0.6;
      jewel.current.rotation.y += dt * 0.75;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.45}>
      <group position={position}>
        {/* Ring 1 - 18k Champagne Gold */}
        <group ref={ring1}>
          <mesh>
            <torusGeometry args={[1.75, 0.03, 16, 120]} />
            <meshStandardMaterial
              color={isLight ? "#b8860b" : "#e5c378"}
              metalness={0.96}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[1.75, 0, 0]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshStandardMaterial
              color={isLight ? "#059669" : "#39ff14"}
              emissive={isLight ? "#059669" : "#39ff14"}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[-1.75, 0, 0]}>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshBasicMaterial color={isLight ? "#b8860b" : "#fae6b2"} />
          </mesh>
        </group>

        {/* Ring 2 - Platinum Meridian Ring */}
        <group ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.45, 0.024, 16, 96]} />
            <meshStandardMaterial
              color={isLight ? "#94a3b8" : "#dbeafe"}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 1.45, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#0284c7"
              emissiveIntensity={0.7}
            />
          </mesh>
        </group>

        {/* Ring 3 - Precision Emerald Dial */}
        <group ref={ring3} rotation={[0, Math.PI / 4, 0]}>
          <mesh>
            <torusGeometry args={[1.15, 0.018, 12, 80]} />
            <meshStandardMaterial
              color={isLight ? "#059669" : "#39ff14"}
              metalness={0.85}
              roughness={0.3}
              wireframe
            />
          </mesh>
        </group>

        {/* Central Refractive Diamond Prism */}
        <mesh ref={jewel}>
          <octahedronGeometry args={[0.48, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.96}
            roughness={0.04}
            metalness={0.08}
            ior={1.72}
            thickness={1.8}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>
        <pointLight
          color={isLight ? "#b8860b" : "#e5c378"}
          intensity={2.2}
          distance={2.8}
        />
      </group>
    </Float>
  );
}

/**
 * Parametric Silk Lattice
 */
function ParametricSilkMesh({ isLight }: { isLight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geomRef = useRef<THREE.PlaneGeometry>(null!);

  useFrame((state) => {
    if (!geomRef.current) return;
    const pos = geomRef.current.attributes.position;
    const t = state.clock.elapsedTime * 0.65;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.45 + t) * Math.cos(y * 0.45 + t * 0.8) * 0.55 +
        Math.sin((x + y) * 0.35 + t * 1.2) * 0.3;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  return (
    <group position={[0, -7.5, -4.5]} rotation={[-Math.PI / 2.6, 0, 0.15]}>
      <mesh ref={meshRef}>
        <planeGeometry ref={geomRef} args={[16, 12, 36, 28]} />
        <meshStandardMaterial
          color={isLight ? "#b8860b" : "#e5c378"}
          emissive={isLight ? "#052e16" : "#0a2a1a"}
          wireframe
          transparent
          opacity={isLight ? 0.38 : 0.32}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

/**
 * Floating High-Index Refractive Monolith
 */
function RefractiveMonolith({
  position,
  rotation,
  isLight,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  isLight: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.18;
      mesh.current.rotation.x += dt * 0.12;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={position} rotation={rotation}>
        <mesh ref={mesh}>
          <dodecahedronGeometry args={[0.82, 0]} />
          <meshPhysicalMaterial
            color={isLight ? "#f1f5f9" : "#0f2642"}
            transmission={isLight ? 0.94 : 0.88}
            roughness={0.06}
            ior={1.6}
            thickness={1.4}
            clearcoat={1.0}
            metalness={0.1}
            transparent
            opacity={0.96}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Smooth Camera Rig linked to Lenis scrollState */
function CameraRig() {
  const p = useRef(0);
  useFrame((state, dt) => {
    p.current = damp(p.current, scrollState.progress, 2.4, dt);
    const { camera, pointer } = state;
    camera.position.x = damp(camera.position.x, pointer.x * 0.42, 2.2, dt);
    camera.position.y = damp(camera.position.y, pointer.y * 0.32 - p.current * 9.8, 2.2, dt);
    camera.position.z = damp(camera.position.z, 6.9 - Math.sin(p.current * Math.PI) * 1.3, 2.2, dt);
    camera.lookAt(0, -p.current * 9.8 - 0.2, -1.2);
  });
  return null;
}

export default function OceanScene() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Background Gradient adapted to Light / Dark Luxury */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isLight
            ? "bg-[radial-gradient(ellipse_95%_75%_at_85%_10%,rgba(212,175,55,0.18)_0%,transparent_65%),radial-gradient(ellipse_80%_65%_at_15%_50%,rgba(16,185,129,0.12)_0%,transparent_65%),radial-gradient(ellipse_75%_65%_at_50%_90%,rgba(14,165,233,0.1)_0%,transparent_70%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_50%,#e2e8f0_100%)]"
            : "bg-[radial-gradient(ellipse_95%_75%_at_85%_10%,rgba(16,40,75,0.45)_0%,transparent_65%),radial-gradient(ellipse_80%_65%_at_15%_50%,rgba(20,60,40,0.32)_0%,transparent_65%),radial-gradient(ellipse_75%_65%_at_50%_90%,rgba(138,92,246,0.16)_0%,transparent_70%),linear-gradient(180deg,#03060c_0%,#060c18_50%,#03050a_100%)]"
        }`}
      />

      <Canvas
        shadows
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isLight ? 1.05 : 1.22,
        }}
        camera={{ position: [0, 0, 6.9], fov: 40 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <ambientLight
          intensity={isLight ? 1.3 : 0.7}
          color={isLight ? "#fffbeb" : "#dbeafe"}
        />
        <directionalLight
          position={[5, 9, 6]}
          intensity={isLight ? 3.2 : 2.6}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[-6, -2, 4]}
          intensity={isLight ? 1.6 : 1.5}
          color={isLight ? "#059669" : "#39ff14"}
        />
        <directionalLight
          position={[0, -7, 3]}
          intensity={isLight ? 1.5 : 1.1}
          color={isLight ? "#b8860b" : "#e5c378"}
        />

        <Environment resolution={128}>
          <Lightformer
            intensity={isLight ? 3.2 : 2.8}
            position={[0, 7, 2]}
            scale={[14, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={isLight ? 1.4 : 1.8}
            position={[-7, 0, 2]}
            scale={[4, 9, 1]}
            color={isLight ? "#0284c7" : "#38bdf8"}
          />
          <Lightformer
            intensity={isLight ? 1.8 : 1.4}
            position={[7, 0, 2]}
            scale={[4, 9, 1]}
            color={isLight ? "#b8860b" : "#e5c378"}
          />
          <Lightformer
            intensity={isLight ? 1.6 : 2.0}
            position={[0, -6, 3]}
            scale={[9, 4, 1]}
            color={isLight ? "#059669" : "#39ff14"}
          />
        </Environment>

        <CameraRig />

        {/* Ultra-Luxury Ethereal Constellation Whale */}
        <LuxuryCelestialWhale isLight={isLight} />

        {/* Multi-Million Horological Astrolabe Spheres */}
        <KineticAstrolabe position={[-2.9, -0.8, -1.9]} isLight={isLight} />
        <KineticAstrolabe position={[3.3, -6.6, -2.1]} isLight={isLight} />

        {/* Parametric Flowing Silk Lattice */}
        <ParametricSilkMesh isLight={isLight} />

        {/* Floating High-Index Diamond Monoliths */}
        <RefractiveMonolith
          position={[-2.6, -4.6, -1.6]}
          rotation={[0.4, 0.2, 0.8]}
          isLight={isLight}
        />
        <RefractiveMonolith
          position={[2.7, -2.2, -2.1]}
          rotation={[-0.3, 0.5, -0.6]}
          isLight={isLight}
        />
        <RefractiveMonolith
          position={[-1.9, -9.0, -1.3]}
          rotation={[0.2, -0.4, 0.3]}
          isLight={isLight}
        />

        {/* Starlight Constellations & Shimmering Auric Dust */}
        <Sparkles
          count={150}
          scale={[18, 28, 9]}
          position={[0, -4.5, -2]}
          size={2.4}
          speed={0.28}
          color={isLight ? "#b8860b" : "#e5c378"}
          opacity={isLight ? 0.5 : 0.65}
        />
        <Sparkles
          count={90}
          scale={[15, 22, 7]}
          position={[0, -4.5, -1.5]}
          size={1.9}
          speed={0.35}
          color={isLight ? "#059669" : "#39ff14"}
          opacity={isLight ? 0.45 : 0.55}
        />
        <Sparkles
          count={70}
          scale={[14, 20, 6]}
          position={[0, -4.5, -1]}
          size={2.6}
          speed={0.22}
          color={isLight ? "#0284c7" : "#00f0ff"}
          opacity={isLight ? 0.45 : 0.55}
        />
      </Canvas>
    </div>
  );
}
