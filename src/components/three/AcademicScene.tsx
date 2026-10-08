"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";
import { useTheme } from "@/context/ThemeContext";

const damp = THREE.MathUtils.damp;

/* ─────────────────────────────────────────────────────────────
   PROCEDURAL TEXTURE GENERATORS (PHOTOREALISTIC & SELF-CONTAINED)
───────────────────────────────────────────────────────────── */

/** Generates a high-detail map texture with continents, graticules & university nodes */
function createWorldMapTexture(isLight: boolean): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Ocean Base
  ctx.fillStyle = isLight ? "#e9f2fb" : "#091728";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle wave/water contour lines
  ctx.strokeStyle = isLight ? "rgba(14, 165, 233, 0.08)" : "rgba(30, 58, 138, 0.15)";
  ctx.lineWidth = 1;
  for (let y = 0; y < canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Graticule grid (Latitude & Longitude)
  ctx.strokeStyle = isLight ? "rgba(184, 134, 11, 0.18)" : "rgba(229, 195, 120, 0.2)";
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= canvas.width; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Equator & Prime Meridian Emphasis
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = isLight ? "rgba(184, 134, 11, 0.45)" : "rgba(229, 195, 120, 0.5)";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Continental landmasses stylized in imperial gold / bronze
  ctx.fillStyle = isLight ? "#d4af37" : "#c59b27";
  ctx.strokeStyle = isLight ? "#996515" : "#fae6b2";
  ctx.lineWidth = 2;

  // Function to draw landmass polygon
  const drawLand = (points: [number, number][]) => {
    ctx.beginPath();
    points.forEach(([px, py], idx) => {
      const x = (px / 360 + 0.5) * canvas.width;
      const y = (0.5 - py / 180) * canvas.height;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // Eurasia & Africa
  drawLand([
    [-10, 36], [0, 45], [15, 55], [30, 70], [60, 75], [110, 75], [170, 65],
    [140, 35], [120, 20], [105, 10], [90, 22], [80, 8], [70, 25], [50, 25],
    [45, 12], [40, -5], [30, -30], [20, -34], [15, -15], [0, 5], [-15, 15],
    [-10, 36]
  ]);

  // North America
  drawLand([
    [-165, 65], [-140, 70], [-90, 75], [-60, 65], [-65, 45], [-80, 25],
    [-95, 18], [-105, 22], [-120, 35], [-125, 50], [-165, 65]
  ]);

  // South America
  drawLand([
    [-80, 10], [-50, -5], [-35, -10], [-40, -22], [-55, -45], [-70, -55],
    [-75, -45], [-70, -20], [-80, 0], [-80, 10]
  ]);

  // Australia
  drawLand([
    [115, -20], [130, -12], [145, -15], [150, -25], [140, -38], [125, -35],
    [115, -30], [115, -20]
  ]);

  // Academic knowledge nodes (Major Universities & Institutional Citadels)
  const academicHubs: [number, number, string][] = [
    [-0.1, 51.5, "Oxford & Cambridge"],
    [-71.1, 42.3, "Harvard & MIT"],
    [77.6, 12.9, "Eduvyapar Sovereign Hub"],
    [103.8, 1.3, "National University"],
    [8.5, 47.3, "ETH Zurich"],
    [139.7, 35.6, "Tokyo Academic"],
  ];

  academicHubs.forEach(([lng, lat, name]) => {
    const x = (lng / 360 + 0.5) * canvas.width;
    const y = (0.5 - lat / 180) * canvas.height;

    // Glowing node ring
    ctx.fillStyle = isLight ? "#059669" : "#39ff14";
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Node label
    ctx.fillStyle = isLight ? "#09182b" : "#f8fafc";
    ctx.font = "bold 18px serif";
    ctx.fillText(`✦ ${name}`, x + 14, y + 5);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/** Generates realistic ledger page texture with academic rules, stamps & Latin charter motto */
function createLedgerTexture(isLight: boolean): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Parchment paper tone
  ctx.fillStyle = isLight ? "#fbf8ef" : "#1a2232";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Margin ruling lines (Red & Double blue line traditional accounting ledger)
  ctx.strokeStyle = isLight ? "#dc2626" : "#f87171";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(90, 0);
  ctx.lineTo(90, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = isLight ? "rgba(15, 23, 42, 0.12)" : "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  for (let y = 140; y < canvas.height - 60; y += 32) {
    ctx.beginPath();
    ctx.moveTo(90, y);
    ctx.lineTo(canvas.width - 60, y);
    ctx.stroke();
  }

  // Academic Header
  ctx.fillStyle = isLight ? "#b8860b" : "#e5c378";
  ctx.font = "bold 26px serif";
  ctx.fillText("EDUVYAPAR SOVEREIGN ACADEMIC ROSTER", 120, 80);

  ctx.fillStyle = isLight ? "#526077" : "#94a3b8";
  ctx.font = "italic 16px serif";
  ctx.fillText("Official Matriculation & Endowment Ledger · Anno Domini MMXXVI", 120, 110);

  // Handwritten ledger entries emulation
  ctx.fillStyle = isLight ? "#0f172a" : "#f1f5f9";
  ctx.font = "14px monospace";
  const records = [
    "Dossier #2026-001  |  Sharma, Aarav N.       |  Technical Fitter SH1  |  [VERIFIED]",
    "Dossier #2026-002  |  Kaur, Simran            |  Electrician Tech SH1  |  [CONFIRMED]",
    "Dossier #2026-003  |  Reddy, Vikram S.        |  Applied Mechanics     |  [VERIFIED]",
    "Dossier #2026-004  |  Patel, Ananya           |  Autonomous Systems    |  [ADMITTED]",
    "Dossier #2026-005  |  D'Souza, Marcus         |  Energy Distribution   |  [CONFIRMED]",
    "Dossier #2026-006  |  Iyer, Gayatri           |  Data Analytics Grid   |  [VERIFIED]",
    "Dossier #2026-007  |  Banerjee, Rohan         |  Structural Welding    |  [ADMITTED]",
    "Dossier #2026-008  |  Menon, Devika           |  Instrumentation Tech  |  [CONFIRMED]",
  ];

  records.forEach((rec, idx) => {
    ctx.fillText(rec, 110, 180 + idx * 64);
  });

  // Stamped Official Crimson Wax/Ink Seal
  ctx.save();
  ctx.translate(canvas.width - 180, canvas.height - 180);
  ctx.strokeStyle = isLight ? "#991b1b" : "#ef4444";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 68, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = isLight ? "#991b1b" : "#ef4444";
  ctx.font = "bold 13px serif";
  ctx.textAlign = "center";
  ctx.fillText("SOVEREIGN ACADEMY", 0, -25);
  ctx.font = "bold 24px serif";
  ctx.fillText("✦ VERIFIED ✦", 0, 8);
  ctx.font = "11px serif";
  ctx.fillText("SEAL OF CHANCELLOR", 0, 32);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/* ─────────────────────────────────────────────────────────────
   REALISTIC 3D EDUCATIONAL ARTIFACTS
───────────────────────────────────────────────────────────── */

/**
 * 1. The Realistic Brass & Turned Mahogany Armillary Celestial Globe of Knowledge
 * Represents global education, scholarly inquiry, and institutional sovereignty.
 */
function RealisticArmillaryGlobe({ isLight }: { isLight: boolean }) {
  const globeGroup = useRef<THREE.Group>(null!);
  const sphereMesh = useRef<THREE.Mesh>(null!);
  const mapTex = useMemo(() => createWorldMapTexture(isLight), [isLight]);

  useFrame((_, dt) => {
    if (sphereMesh.current) {
      sphereMesh.current.rotation.y += dt * 0.18;
    }
    if (globeGroup.current) {
      globeGroup.current.rotation.y = Math.sin(Date.now() * 0.0004) * 0.15;
    }
  });

  return (
    <group ref={globeGroup} position={[2.6, 0.4, -0.8]} scale={1.15}>
      {/* Heavy Turned Mahogany / Walnut Wood Pedestal */}
      <group position={[0, -2.4, 0]}>
        {/* Tier 1: Beveled Base Plinth */}
        <mesh receiveShadow>
          <cylinderGeometry args={[1.35, 1.48, 0.24, 48]} />
          <meshStandardMaterial
            color={isLight ? "#451a03" : "#2a1205"}
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>
        {/* Tier 2: Fluted Brass Collar */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[1.15, 1.25, 0.12, 48]} />
          <meshStandardMaterial
            color={isLight ? "#b8860b" : "#d4af37"}
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>
        {/* Tier 3: Turned Baluster Pillar */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.32, 0.52, 1.05, 32]} />
          <meshStandardMaterial
            color={isLight ? "#451a03" : "#2a1205"}
            roughness={0.5}
            metalness={0.08}
          />
        </mesh>
        {/* Brass Support Cup */}
        <mesh position={[0, 1.32, 0]}>
          <cylinderGeometry args={[0.55, 0.35, 0.18, 32]} />
          <meshStandardMaterial
            color={isLight ? "#b8860b" : "#d4af37"}
            metalness={0.94}
            roughness={0.18}
          />
        </mesh>
      </group>

      {/* Solid Brass Meridian Ring (Tilted at real Earth Axial Tilt 23.44°) */}
      <group rotation={[0, 0, THREE.MathUtils.degToRad(-23.44)]}>
        {/* 360-degree Etched Brass Meridian Ring */}
        <mesh>
          <torusGeometry args={[2.0, 0.05, 16, 96]} />
          <meshStandardMaterial
            color={isLight ? "#b8860b" : "#d4af37"}
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>

        {/* Outer Calibrated Equatorial Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.08, 0.035, 12, 96]} />
          <meshStandardMaterial
            color={isLight ? "#996515" : "#fae6b2"}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Brass Polar Axis Pins */}
        <mesh position={[0, 2.05, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, -2.05, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* The Realistic Terrestrial Globe Sphere with Education Map */}
        <mesh ref={sphereMesh} castShadow receiveShadow>
          <sphereGeometry args={[1.7, 64, 48]} />
          <meshStandardMaterial
            map={mapTex ?? undefined}
            roughness={isLight ? 0.35 : 0.45}
            metalness={isLight ? 0.15 : 0.25}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 2. The Realistic Open Archival Academic Codex & Ledger
 * Photorealistic leather binding, gold-gilded edges, realistic manuscript spread, & bookmark ribbon.
 */
function RealisticOpenLedger({ isLight }: { isLight: boolean }) {
  const ledgerGroup = useRef<THREE.Group>(null!);
  const pageTex = useMemo(() => createLedgerTexture(isLight), [isLight]);

  useFrame((_, dt) => {
    if (ledgerGroup.current) {
      ledgerGroup.current.rotation.y = damp(
        ledgerGroup.current.rotation.y,
        0.35 + Math.sin(Date.now() * 0.0006) * 0.06,
        1.5,
        dt
      );
    }
  });

  return (
    <group ref={ledgerGroup} position={[-2.4, -4.5, -0.6]} rotation={[0.42, 0.35, -0.1]} scale={1.1}>
      {/* Left Leather Book Cover */}
      <mesh position={[-1.02, -0.06, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(6)]}>
        <boxGeometry args={[2.0, 0.08, 2.7]} />
        <meshStandardMaterial
          color={isLight ? "#451a03" : "#1c1917"}
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>

      {/* Right Leather Book Cover */}
      <mesh position={[1.02, -0.06, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(-6)]}>
        <boxGeometry args={[2.0, 0.08, 2.7]} />
        <meshStandardMaterial
          color={isLight ? "#451a03" : "#1c1917"}
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>

      {/* Gold-Gilded Page Block Edge (Left & Right) */}
      <mesh position={[-1.0, 0.08, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(5)]}>
        <boxGeometry args={[1.9, 0.24, 2.55]} />
        <meshStandardMaterial
          color={isLight ? "#b8860b" : "#d4af37"}
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[1.0, 0.08, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(-5)]}>
        <boxGeometry args={[1.9, 0.24, 2.55]} />
        <meshStandardMaterial
          color={isLight ? "#b8860b" : "#d4af37"}
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      {/* Open Parchment Surface (Left Page) */}
      <mesh position={[-0.96, 0.21, 0]} rotation={[-Math.PI / 2, 0, THREE.MathUtils.degToRad(-5)]}>
        <planeGeometry args={[1.85, 2.5]} />
        <meshStandardMaterial
          map={pageTex ?? undefined}
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>

      {/* Open Parchment Surface (Right Page) */}
      <mesh position={[0.96, 0.21, 0]} rotation={[-Math.PI / 2, 0, THREE.MathUtils.degToRad(5)]}>
        <planeGeometry args={[1.85, 2.5]} />
        <meshStandardMaterial
          map={pageTex ?? undefined}
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>

      {/* Silk Bookmark Ribbon (Crimson / Burgundy Satin) */}
      <mesh position={[0, 0.24, 0.4]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.14, 0.02, 3.1]} />
        <meshStandardMaterial
          color={isLight ? "#991b1b" : "#be123c"}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

/**
 * 3. The Realistic Scholar's Desk: Rolled Diploma Parchment & 18k Golden Fountain Pen
 * Grounded directly in admissions, graduation, and official student registration.
 */
function RealisticScholarDesk({ isLight }: { isLight: boolean }) {
  const deskGroup = useRef<THREE.Group>(null!);

  useFrame((_, dt) => {
    if (deskGroup.current) {
      deskGroup.current.rotation.y = damp(
        deskGroup.current.rotation.y,
        -0.25 + Math.sin(Date.now() * 0.0005) * 0.05,
        1.5,
        dt
      );
    }
  });

  return (
    <group ref={deskGroup} position={[2.5, -8.2, -0.9]} rotation={[0.35, -0.25, 0.08]} scale={1.15}>
      {/* ─── ROLLED DIPLOMA PARCHMENT ─── */}
      <group position={[-0.6, 0, 0]} rotation={[0, 0.35, Math.PI / 2]}>
        {/* Main Rolled Cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.32, 2.8, 36]} />
          <meshStandardMaterial
            color={isLight ? "#fbf7ed" : "#f1f5f9"}
            roughness={0.82}
            metalness={0.02}
          />
        </mesh>
        {/* Curled Edge Flap */}
        <mesh position={[0.22, 0, 0.15]}>
          <boxGeometry args={[0.15, 2.76, 0.03]} />
          <meshStandardMaterial color={isLight ? "#f1ece0" : "#e2e8f0"} roughness={0.85} />
        </mesh>
        {/* Crimson Satin Tie Ribbon */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.33, 0.33, 0.25, 36]} />
          <meshStandardMaterial
            color={isLight ? "#991b1b" : "#dc2626"}
            roughness={0.35}
            metalness={0.45}
          />
        </mesh>
        {/* 3D Wax Seal Medallion */}
        <mesh position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
          <meshStandardMaterial
            color={isLight ? "#831843" : "#991b1b"}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      </group>

      {/* ─── 18K GOLD FOUNTAIN PEN & MARBLE STAND ─── */}
      <group position={[1.2, -0.2, 0.4]} rotation={[0, -0.4, 0]}>
        {/* Beveled Black Marble Pen Stand */}
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <boxGeometry args={[1.5, 0.18, 0.85]} />
          <meshStandardMaterial
            color={isLight ? "#0f172a" : "#020617"}
            roughness={0.12}
            metalness={0.3}
          />
        </mesh>

        {/* Brass Pen Socket Sleeve */}
        <mesh position={[0, 0.1, 0]} rotation={[0.45, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 0.45, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* The Fountain Pen Resting in Socket */}
        <group position={[0, 0.5, 0.2]} rotation={[0.45, 0, 0]}>
          {/* Pen Barrel (Black Lacquered) */}
          <mesh>
            <cylinderGeometry args={[0.07, 0.05, 1.8, 24]} />
            <meshStandardMaterial
              color="#05080e"
              roughness={0.08}
              metalness={0.2}
            />
          </mesh>
          {/* Gold Center Band & Pocket Clip */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.12, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.96} roughness={0.12} />
          </mesh>
          {/* Two-Tone 18k Gold Nib */}
          <mesh position={[0, -0.98, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.075, 0.24, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.96} roughness={0.12} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * 4. Architectural Neoclassical Colonnade / Rotunda of Knowledge
 * Fluted marble pillars representing institutional foundations and scholarly longevity.
 */
function NeoclassicalColonnade({ isLight }: { isLight: boolean }) {
  const pillars = useMemo(
    () => [
      { x: -3.8, z: -3.5 },
      { x: -1.9, z: -4.2 },
      { x: 1.9, z: -4.2 },
      { x: 3.8, z: -3.5 },
    ],
    []
  );

  return (
    <group position={[0, -11.5, -2]}>
      {pillars.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          {/* Classical Square Plinth Base */}
          <mesh position={[0, -1.8, 0]}>
            <boxGeometry args={[0.85, 0.35, 0.85]} />
            <meshStandardMaterial
              color={isLight ? "#e2e8f0" : "#1e293b"}
              roughness={0.45}
            />
          </mesh>
          {/* Fluted Column Shaft */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.34, 0.38, 4.2, 32]} />
            <meshStandardMaterial
              color={isLight ? "#f8fafc" : "#334155"}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
          {/* Ionic / Doric Capital */}
          <mesh position={[0, 2.6, 0]}>
            <boxGeometry args={[0.82, 0.32, 0.82]} />
            <meshStandardMaterial
              color={isLight ? "#e2e8f0" : "#1e293b"}
              roughness={0.45}
            />
          </mesh>
        </group>
      ))}

      {/* Classical Architrave Entablature Beam across Top */}
      <mesh position={[0, 2.9, -3.8]}>
        <boxGeometry args={[9.5, 0.45, 1.2]} />
        <meshStandardMaterial
          color={isLight ? "#cbd5e1" : "#1e293b"}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

/**
 * Smooth Camera Rig linked to Lenis scrollState
 * Swoops purposefully from the Celestial Globe (Hero) -> Open Ledger (Dispatch)
 * -> Scholar's Desk (Admissions Form) -> Architectural Rotunda (Governance).
 */
function ScrollytellingCameraRig() {
  const p = useRef(0);

  useFrame((state, dt) => {
    p.current = damp(p.current, scrollState.progress, 2.2, dt);
    const { camera, pointer } = state;

    // Camera trajectory linked to real content milestones
    // 0.0 = Hero Globe
    // 0.35 = Executive Ledger
    // 0.65 = Admission Desk (Pen + Diploma)
    // 0.95 = Classical Rotunda
    const targetY = damp(camera.position.y, pointer.y * 0.28 - p.current * 10.2, 2.2, dt);
    const targetX = damp(camera.position.x, pointer.x * 0.35, 2.2, dt);
    const targetZ = damp(camera.position.z, 6.8 - Math.sin(p.current * Math.PI) * 1.2, 2.2, dt);

    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.position.z = targetZ;

    // Keep camera tilted elegantly toward educational focal artifacts
    camera.lookAt(0, -p.current * 10.2 - 0.2, -1.0);
  });

  return null;
}

export default function AcademicScene() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Background Atmosphere: Sunlit Classical Library dawn or Deep Starlit Academy */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isLight
            ? "bg-[radial-gradient(ellipse_90%_70%_at_85%_10%,rgba(212,175,55,0.18)_0%,transparent_65%),radial-gradient(ellipse_80%_60%_at_15%_45%,rgba(16,185,129,0.1)_0%,transparent_65%),radial-gradient(ellipse_70%_60%_at_50%_90%,rgba(14,165,233,0.08)_0%,transparent_70%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_50%,#e2e8f0_100%)]"
            : "bg-[radial-gradient(ellipse_90%_70%_at_85%_10%,rgba(180,140,50,0.16)_0%,transparent_65%),radial-gradient(ellipse_80%_60%_at_15%_45%,rgba(14,35,64,0.45)_0%,transparent_65%),radial-gradient(ellipse_70%_60%_at_50%_90%,rgba(15,23,42,0.6)_0%,transparent_70%),linear-gradient(180deg,#040810_0%,#07101e_50%,#03060c_100%)]"
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
          toneMappingExposure: isLight ? 1.05 : 1.18,
        }}
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        {/* Soft, Dignified Academic Studio & Library Lighting */}
        <ambientLight
          intensity={isLight ? 1.4 : 0.75}
          color={isLight ? "#fffbeb" : "#e2e8f0"}
        />
        <directionalLight
          position={[6, 9, 5]}
          intensity={isLight ? 3.2 : 2.5}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-6, -1, 3]}
          intensity={isLight ? 1.4 : 1.1}
          color={isLight ? "#d4af37" : "#e5c378"}
        />
        <directionalLight
          position={[0, -7, 3]}
          intensity={isLight ? 1.2 : 0.8}
          color={isLight ? "#059669" : "#38bdf8"}
        />

        <Environment resolution={128}>
          <Lightformer
            intensity={isLight ? 3.0 : 2.2}
            position={[0, 7, 2]}
            scale={[14, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={isLight ? 1.6 : 1.4}
            position={[7, 0, 2]}
            scale={[4, 9, 1]}
            color={isLight ? "#d4af37" : "#e5c378"}
          />
          <Lightformer
            intensity={isLight ? 1.2 : 1.0}
            position={[-7, 0, 2]}
            scale={[4, 9, 1]}
            color="#38bdf8"
          />
        </Environment>

        <ScrollytellingCameraRig />

        {/* 1. HERO TIER (Scroll 0% - 25%): The Grand Armillary Terrestrial Globe */}
        <RealisticArmillaryGlobe isLight={isLight} />

        {/* 2. EXECUTIVE DISPATCH TIER (Scroll 25% - 55%): The Open Archival Ledger */}
        <RealisticOpenLedger isLight={isLight} />

        {/* 3. ADMISSIONS & INTAKE TIER (Scroll 55% - 80%): Scholar's Fountain Pen & Diploma */}
        <RealisticScholarDesk isLight={isLight} />

        {/* 4. GOVERNANCE & ROSTER TIER (Scroll 80% - 100%): Neoclassical Rotunda Columns */}
        <NeoclassicalColonnade isLight={isLight} />
      </Canvas>
    </div>
  );
}
