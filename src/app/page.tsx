"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  Check,
  Building2,
  Compass,
} from "lucide-react";
import dynamic from "next/dynamic";

const ChapterZeroScene = dynamic(
  () => import("@/components/three/ChapterZeroScene"),
  { ssr: false }
);

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin@aivrm.edu");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Parallax spring motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Multi-layer depth translations
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const archX = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const archY = useTransform(smoothY, [-0.5, 0.5], [18, -18]);

  const uiX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const uiY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

  const lightGlow = useTransform(smoothX, [-0.5, 0.5], [0.35, 0.65]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Cinematic Authentication Sequence (850ms)
    setTimeout(() => {
      setIsSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push("/dashboard");
      }, 750);
    }, 450);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#F6F4EF] text-[#171719] overflow-x-hidden overflow-y-auto flex flex-col justify-between selection:bg-[#EEEBFF] selection:text-[#5B4BFF]"
    >
      {/* ── Layer 0: Atmospheric Architectural Background ── */}
      <motion.div
        style={{ x: isTouchDevice ? 0 : bgX, y: isTouchDevice ? 0 : bgY }}
        className="absolute inset-0 size-full pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#ECE7DC]" />
        {/* Soft morning ambient light cone */}
        <motion.div
          style={{ opacity: lightGlow }}
          className="absolute -top-32 left-1/4 w-[80vw] h-[70vh] bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EE]/40 to-transparent blur-3xl pointer-events-none"
        />
        {/* Travertine perspective grid lines */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#171719_1px,transparent_1px),linear-gradient(to_bottom,#171719_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />
      </motion.div>

      {/* ── Layer 1: Three.js Sculptural Ribbon Installation ── */}
      <motion.div
        style={{ x: isTouchDevice ? 0 : archX, y: isTouchDevice ? 0 : archY }}
        className="absolute inset-0 size-full pointer-events-none z-10 opacity-75 lg:opacity-85"
      >
        <ChapterZeroScene isSuccess={isSuccess} />
      </motion.div>

      {/* ── Layer 2: Top Command Brand Bar ── */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 border-b border-[#141414]/[0.05] bg-white/40 backdrop-blur-md">
        {/* Left Brand Identity */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative size-9 rounded-xl bg-gradient-to-tr from-[#4438CA] via-[#5B4BFF] to-[#818CF8] flex items-center justify-center shadow-md shadow-[#5B4BFF]/20 group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 text-white"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" fillOpacity="0.3" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-[15px] tracking-wider text-[#171719] font-sans block leading-none">
              AIVRM
            </span>
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#6F7077] uppercase block mt-1">
              Sovereign Digital Campus
            </span>
          </div>
        </Link>

        {/* Right Story Mode Chapter Tracker */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.07] text-xs font-semibold shadow-xs">
            <span className="text-[#5B4BFF]">00 / ENTER</span>
            <span className="text-[#8E909A]">→</span>
            <span className="text-[#6F7077]">01 / DASHBOARD</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F1] text-[#279B63] text-xs font-bold shadow-xs">
            <span className="size-1.5 rounded-full bg-[#35B779] animate-pulse" />
            <span className="hidden md:inline">Vanguard Node Active</span>
            <span className="md:hidden">Active</span>
          </div>
        </div>
      </header>

      {/* ── Layer 3: Main Cinematic Composition (Foreground) ── */}
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-8 sm:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center w-full">
          {/* ── Left Editorial Copy Block (lg:col-span-7) ── */}
          <motion.div
            style={{ x: isTouchDevice ? 0 : uiX, y: isTouchDevice ? 0 : uiY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:col-span-7 min-w-0 space-y-6 lg:max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF]">
              <Sparkles size={13} className="text-[#5B4BFF]" />
              <span>CHAPTER 00 · ENTER THE PLATFORM</span>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.h1
                    key="welcome"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#171719] tracking-tight leading-[1.05]"
                  >
                    Welcome<br />
                    back.
                  </motion.h1>
                ) : (
                  <motion.h1
                    key="education"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-bold text-[#171719] tracking-tight leading-[1.04]"
                  >
                    Education<br />
                    is not managed.<br />
                    <span className="text-[#5B4BFF] italic font-serif">It is shaped.</span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <p className="text-sm sm:text-base text-[#6F7077] leading-relaxed max-w-lg font-normal">
              An architectural institutional operating platform engineered for visionary campus governance, unified student intake, spatial intelligence, and sovereign financial clarity.
            </p>

            {/* Micro Specifications Row */}
            <div className="pt-2 grid grid-cols-2 gap-4 max-w-md">
              <div className="rounded-2xl bg-white/70 backdrop-blur-md p-3.5 border border-[#141414]/[0.06] shadow-xs">
                <span className="text-[10px] font-bold text-[#5B4BFF] tracking-wider uppercase block">
                  01 / ARCHITECTURE
                </span>
                <p className="text-xs font-semibold text-[#171719] mt-0.5">
                  Spatial Executive Governance
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 backdrop-blur-md p-3.5 border border-[#141414]/[0.06] shadow-xs">
                <span className="text-[10px] font-bold text-[#35B779] tracking-wider uppercase block">
                  02 / VERIFIED
                </span>
                <p className="text-xs font-semibold text-[#171719] mt-0.5">
                  Zero-Friction Intake &amp; Ledgers
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right Floating Ceramic/Glass Login Surface (lg:col-span-5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{
              opacity: isSuccess ? 0 : 1,
              y: isSuccess ? -20 : 0,
              scale: isSuccess ? 0.95 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:col-span-5 min-w-0 max-w-md mx-auto lg:ml-auto"
          >
            <div
              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                focusedField
                  ? "bg-white/95 border-[#5B4BFF]/30 shadow-[0_24px_60px_-12px_rgba(91,75,255,0.12)]"
                  : "bg-white/90 border-[#141414]/[0.08] shadow-[0_20px_50px_-10px_rgba(20,20,20,0.06)]"
              } backdrop-blur-xl border`}
            >
              {/* Internal specular highlight reflection */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#EEEBFF]/60 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Surface Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#141414]/[0.05]">
                <div>
                  <h2 className="text-lg font-bold text-[#171719] tracking-tight">
                    Enter Workspace
                  </h2>
                  <p className="text-xs text-[#6F7077] mt-0.5">
                    Institutional administrative credentials
                  </p>
                </div>
                <div className="size-10 rounded-2xl bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center shadow-xs">
                  <Lock size={18} />
                </div>
              </div>

              {/* Functional Authentication Form */}
              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                {/* Username / Institutional Email */}
                <div>
                  <label className="block text-xs font-bold text-[#171719] mb-1.5">
                    Institutional Identity
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className={`absolute top-1/2 left-3.5 -translate-y-1/2 transition-colors ${
                        focusedField === "username" ? "text-[#5B4BFF]" : "text-[#8E909A]"
                      }`}
                    />
                    <input
                      required
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="username"
                      placeholder="admin@aivrm.edu"
                      className="w-full rounded-2xl border border-[#141414]/[0.08] bg-[#FBFAF7] py-3.5 pr-4 pl-11 text-xs sm:text-sm text-[#171719] placeholder:text-[#8E909A] outline-none focus:bg-[#FFFFFF] focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 transition"
                    />
                  </div>
                </div>

                {/* Password / Secure Passkey */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#171719]">
                      Security Passkey
                    </label>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("For demo access, use the prefilled credentials and click 'Enter Workspace'.");
                      }}
                      className="text-[11px] font-semibold text-[#5B4BFF] hover:underline"
                    >
                      Forgot passkey?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock
                      size={16}
                      className={`absolute top-1/2 left-3.5 -translate-y-1/2 transition-colors ${
                        focusedField === "password" ? "text-[#5B4BFF]" : "text-[#8E909A]"
                      }`}
                    />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-[#141414]/[0.08] bg-[#FBFAF7] py-3.5 pr-11 pl-11 text-xs sm:text-sm text-[#171719] placeholder:text-[#8E909A] outline-none focus:bg-[#FFFFFF] focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#8E909A] hover:text-[#171719] transition p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Option */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4 rounded-md border-[#141414]/[0.15] text-[#5B4BFF] focus:ring-[#5B4BFF]"
                    />
                    <span className="text-xs text-[#6F7077]">
                      Keep session active on this node
                    </span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  disabled={loading || isSuccess}
                  className="w-full mt-2 flex items-center justify-center gap-2.5 rounded-2xl bg-[#171719] hover:bg-[#5B4BFF] py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#171719]/10 transition-colors"
                >
                  {loading ? (
                    <motion.span
                      className="size-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    />
                  ) : isSuccess ? (
                    <span className="flex items-center gap-2 text-[#35B779]">
                      <Check size={16} strokeWidth={3} />
                      Verified · Entering Platform...
                    </span>
                  ) : (
                    <>
                      <span>Enter Workspace</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Alternate Candidate Admissions Intake Link */}
              <div className="mt-5 pt-5 border-t border-[#141414]/[0.06] text-center">
                <Link
                  href="/dashboard/preadmission"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B4BFF] hover:underline"
                >
                  <span>✦ Direct Candidate Preadmission Dossier</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* Encryption & Security Verification */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#6F7077]">
                <ShieldCheck size={13} className="text-[#35B779]" />
                <span>Encrypted sovereign institutional session</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Layer 4: Minimal Editorial Footer ── */}
      <footer className="relative z-30 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 lg:px-16 py-5 border-t border-[#141414]/[0.05] bg-white/40 backdrop-blur-md text-xs text-[#6F7077]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#171719]">AIVRM</span>
          <span>·</span>
          <span>Chapter 00 Enterprise Release 2026.4</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#8E909A]">Identity Protocol: Sovereign Key Vault</span>
          <span>·</span>
          <span className="text-[#35B779] font-medium">System Normal · 60 FPS Engine</span>
        </div>
      </footer>
    </div>
  );
}
