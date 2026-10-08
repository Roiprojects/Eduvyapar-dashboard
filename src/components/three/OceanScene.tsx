"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";

const damp = THREE.MathUtils.damp;

/** Majestic Celestial Whale / Leviathan that swims smoothly through 3D space */
function CelestialWhale() {
  const group = useRef<THREE.Group>(null!);
  const spineSegments = useRef<THREE.Group[]>([]);
  const fluke = useRef<THREE.Group>(null!);
  const leftFin = useRef<THREE.Group>(null!);
  const rightFin = useRef<THREE.Group>(null!);

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * 1.35;
    const scroll = scrollState.progress;

    // Swimming path influenced by scroll and idle time
    const targetY = 1.2 - scroll * 9.5 + Math.sin(t * 0.4) * 0.4;
    const targetX = 1.8 + Math.cos(t * 0.3) * 0.6 + state.pointer.x * 0.4;
    const targetZ = -1.2 - Math.sin(scroll * Math.PI) * 1.5;

    group.current.position.y = damp(group.current.position.y, targetY, 2.5, dt);
    group.current.position.x = damp(group.current.position.x, targetX, 2.5, dt);
    group.current.position.z = damp(group.current.position.z, targetZ, 2.5, dt);

    // Roll and pitch
    group.current.rotation.z = Math.sin(t * 0.5) * 0.08 - state.pointer.x * 0.1;
    group.current.rotation.x = 0.2 + Math.cos(t * 0.4) * 0.06;
    group.current.rotation.y = -0.65 + Math.sin(t * 0.3) * 0.15;

    // Sinuous undulating swimming motion through spine segments
    spineSegments.current.forEach((seg, i) => {
      if (seg) {
        seg.rotation.y = Math.sin(t * 2.2 - i * 0.45) * (0.08 + i * 0.04);
        seg.rotation.z = Math.cos(t * 2.2 - i * 0.45) * 0.03;
      }
    });

    if (fluke.current) {
      fluke.current.rotation.y = Math.sin(t * 2.2 - 3.2) * 0.35;
      fluke.current.rotation.z = Math.cos(t * 2.2 - 3.2) * 0.18;
    }

    if (leftFin.current) {
      leftFin.current.rotation.z = -0.3 + Math.sin(t * 1.8) * 0.22;
      leftFin.current.rotation.x = Math.cos(t * 1.8) * 0.12;
    }
    if (rightFin.current) {
      rightFin.current.rotation.z = 0.3 - Math.sin(t * 1.8) * 0.22;
      rightFin.current.rotation.x = Math.cos(t * 1.8) * 0.12;
    }
  });

  return (
    <group ref={group} scale={1.15}>
      {/* Head & Cranium */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.72, 32, 24]} />
        <meshPhysicalMaterial
          color="#0b1e36"
          roughness={0.25}
          metalness={0.65}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
          sheen={0.8}
          sheenColor="#38bdf8"
        />
      </mesh>

      {/* Golden Ventral Plate / Grooves */}
      <mesh position={[0, -0.28, 0.15]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.58, 0.48, 1.2, 16, 1, true]} />
        <meshStandardMaterial
          color="#e5c378"
          roughness={0.4}
          metalness={0.85}
          wireframe
        />
      </mesh>

      {/* Bioluminescent / Auric blowhole light */}
      <pointLight position={[0, 0.65, -0.2]} color="#39ff14" intensity={1.8} distance={3.5} />

      {/* Spine segment 1 */}
      <group
        ref={(el) => {
          if (el) spineSegments.current[0] = el;
        }}
        position={[0, 0, -0.75]}
      >
        <mesh>
          <cylinderGeometry args={[0.66, 0.54, 0.9, 24]} />
          <meshPhysicalMaterial
            color="#09182c"
            roughness={0.3}
            metalness={0.6}
            clearcoat={0.8}
          />
        </mesh>

        {/* Pectoral Fins (Left & Right) */}
        <group ref={leftFin} position={[-0.8, -0.1, 0.1]} rotation={[0, -0.4, -0.3]}>
          <mesh>
            <boxGeometry args={[1.5, 0.05, 0.48]} />
            <meshStandardMaterial color="#0c2545" metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position={[-0.7, 0, 0]}>
            <coneGeometry args={[0.22, 0.6, 12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.7} roughness={0.2} wireframe />
          </mesh>
        </group>

        <group ref={rightFin} position={[0.8, -0.1, 0.1]} rotation={[0, 0.4, 0.3]}>
          <mesh>
            <boxGeometry args={[1.5, 0.05, 0.48]} />
            <meshStandardMaterial color="#0c2545" metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position={[0.7, 0, 0]}>
            <coneGeometry args={[0.22, 0.6, 12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.7} roughness={0.2} wireframe />
          </mesh>
        </group>

        {/* Spine segment 2 */}
        <group
          ref={(el) => {
            if (el) spineSegments.current[1] = el;
          }}
          position={[0, 0, -0.85]}
        >
          <mesh>
            <cylinderGeometry args={[0.54, 0.42, 0.9, 24]} />
            <meshPhysicalMaterial
              color="#081426"
              roughness={0.35}
              metalness={0.6}
              clearcoat={0.8}
            />
          </mesh>

          {/* Dorsal Fin */}
          <mesh position={[0, 0.52, -0.1]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.18, 0.55, 12]} />
            <meshStandardMaterial color="#e5c378" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Spine segment 3 (Peduncle) */}
          <group
            ref={(el) => {
              if (el) spineSegments.current[2] = el;
            }}
            position={[0, 0, -0.85]}
          >
            <mesh>
              <cylinderGeometry args={[0.42, 0.22, 0.9, 20]} />
              <meshPhysicalMaterial
                color="#06101f"
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>

            {/* Fluke / Tail */}
            <group ref={fluke} position={[0, 0, -0.65]} rotation={[0, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
                <meshStandardMaterial color="#e5c378" metalness={0.9} roughness={0.25} />
              </mesh>
              {[-0.65, 0.65].map((side) => (
                <mesh
                  key={side}
                  position={[side, 0, -0.22]}
                  rotation={[0, side > 0 ? 0.35 : -0.35, Math.PI / 2]}
                >
                  <boxGeometry args={[0.4, 0.04, 0.85]} />
                  <meshPhysicalMaterial
                    color="#0d2b52"
                    roughness={0.3}
                    metalness={0.7}
                    clearcoat={0.8}
                  />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/** Luxury Celestial Gyroscope / Astrolabe Orbital Rings */
function CelestialGyroscope({ position }: { position: [number, number, number] }) {
  const ring1 = useRef<THREE.Group>(null!);
  const ring2 = useRef<THREE.Group>(null!);
  const ring3 = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);

  useFrame((_, dt) => {
    if (ring1.current) ring1.current.rotation.x += dt * 0.45;
    if (ring2.current) ring2.current.rotation.y += dt * 0.6;
    if (ring3.current) ring3.current.rotation.z += dt * 0.35;
    if (core.current) {
      core.current.rotation.x += dt * 0.8;
      core.current.rotation.y += dt * 0.5;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Ring 1 - Imperial Gold */}
        <group ref={ring1}>
          <mesh>
            <torusGeometry args={[1.5, 0.035, 16, 96]} />
            <meshStandardMaterial color="#e5c378" metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[1.5, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#39ff14" />
          </mesh>
        </group>

        {/* Ring 2 - Electric Cyan Wireframe */}
        <group ref={ring2} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.25, 0.025, 12, 80]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#e5c378" />
          </mesh>
        </group>

        {/* Ring 3 - Deep Titanium */}
        <group ref={ring3} rotation={[0, Math.PI / 3, 0]}>
          <mesh>
            <torusGeometry args={[1.0, 0.02, 12, 64]} />
            <meshStandardMaterial color="#fae6b2" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>

        {/* Glowing Quantum Core */}
        <mesh ref={core}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.2}
            clearcoat={1}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Floating Refractive Glass Monolith */
function CrystalMonolith({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.2;
      mesh.current.rotation.z += dt * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        <mesh ref={mesh} castShadow>
          <dodecahedronGeometry args={[0.75, 0]} />
          <meshPhysicalMaterial
            color="#142642"
            transmission={0.85}
            opacity={1}
            transparent
            roughness={0.1}
            ior={1.52}
            thickness={1.2}
            clearcoat={1}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Smooth Camera Rig linked to Lenis scrollState with zero jank */
function CameraRig() {
  const p = useRef(0);
  useFrame((state, dt) => {
    p.current = damp(p.current, scrollState.progress, 2.5, dt);
    const { camera, pointer } = state;
    camera.position.x = damp(camera.position.x, pointer.x * 0.45, 2, dt);
    camera.position.y = damp(camera.position.y, pointer.y * 0.35 - p.current * 9.5, 2, dt);
    camera.position.z = damp(camera.position.z, 6.8 - Math.sin(p.current * Math.PI) * 1.4, 2, dt);
    camera.lookAt(0, -p.current * 9.5 - 0.2, -1.2);
  });
  return null;
}

export default function OceanScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dark Luxury Vignette & Nebula Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_85%_10%,rgba(14,35,64,0.45)_0%,transparent_60%),radial-gradient(ellipse_80%_60%_at_15%_45%,rgba(20,50,40,0.35)_0%,transparent_65%),radial-gradient(ellipse_70%_60%_at_50%_90%,rgba(138,92,246,0.18)_0%,transparent_70%),linear-gradient(180deg,#05080e_0%,#070d18_50%,#04070d_100%)]" />

      <Canvas
        shadows
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.65} color="#dbeafe" />
        <directionalLight position={[4, 8, 5]} intensity={2.2} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, -2, 3]} intensity={1.2} color="#39ff14" />
        <directionalLight position={[0, -6, 2]} intensity={0.9} color="#e5c378" />

        <Environment resolution={128}>
          <Lightformer intensity={2.4} position={[0, 6, 2]} scale={[12, 3, 1]} color="#ffffff" />
          <Lightformer intensity={1.5} position={[-6, 0, 2]} scale={[3, 8, 1]} color="#38bdf8" />
          <Lightformer intensity={1.2} position={[6, 0, 2]} scale={[3, 8, 1]} color="#e5c378" />
          <Lightformer intensity={1.8} position={[0, -5, 3]} scale={[8, 3, 1]} color="#39ff14" />
        </Environment>

        <CameraRig />

        {/* 3D Celestial Leviathan / Whale Explorer */}
        <CelestialWhale />

        {/* 3D Celestial Gyroscopes */}
        <CelestialGyroscope position={[-2.8, -0.6, -1.8]} />
        <CelestialGyroscope position={[3.2, -6.8, -2.2]} />

        {/* 3D Refractive Crystal Monoliths */}
        <CrystalMonolith position={[-2.5, -4.8, -1.5]} rotation={[0.4, 0.2, 0.8]} />
        <CrystalMonolith position={[2.6, -2.4, -2.0]} rotation={[-0.3, 0.5, -0.6]} />
        <CrystalMonolith position={[-1.8, -9.2, -1.2]} rotation={[0.2, -0.4, 0.3]} />

        {/* Cosmic Starfield & Stardust */}
        <Sparkles count={120} scale={[16, 26, 8]} position={[0, -4.5, -2]} size={2.2} speed={0.3} color="#e5c378" opacity={0.6} />
        <Sparkles count={80} scale={[14, 20, 6]} position={[0, -4.5, -1.5]} size={1.8} speed={0.4} color="#39ff14" opacity={0.5} />
        <Sparkles count={60} scale={[12, 18, 5]} position={[0, -4.5, -1]} size={2.5} speed={0.25} color="#00f0ff" opacity={0.5} />
      </Canvas>
    </div>
  );
}
