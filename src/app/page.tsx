"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, KeyRound, Lock, ShieldCheck, Sparkles, Target, User } from "lucide-react";
import SceneLoader from "@/components/three/SceneLoader";
import { Reveal, SplitText } from "@/components/ui/motion";

export default function SignIn() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SceneLoader />
      <main className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.15fr_1fr]">
        <section>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-[0.25em] text-[#39ff14] uppercase border border-[#39ff14]/30 shadow-lg shadow-[#39ff14]/10">
              <Sparkles size={14} /> Vanguard Campus Intelligence
            </span>
          </Reveal>

          <h1 className="font-display mt-6 text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.94] font-extrabold tracking-tight text-white">
            <SplitText text="The Sovereign" />
            <br />
            <SplitText text="Digital Campus." className="text-gradient-gold" delay={0.2} />
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed font-light">
              Architected for elite institutions, polytechnics, and universities. Unified intake, treasury ledgers, academic COE, and continuous AI foresight in one celestial workspace.
            </p>
          </Reveal>

          <Reveal delay={0.55} className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {[
              {
                i: Target,
                t: "Institutional Mission",
                d: "Empowering visionary academia with zero-friction, sovereign digital infrastructure.",
              },
              {
                i: Sparkles,
                t: "Avant-Garde Values",
                d: "Versatile in vision, prolific in execution. Exemplary stewardship is our benchmark.",
              },
            ].map(({ i: I, t, d }) => (
              <div
                key={t}
                className="glass rounded-3xl p-5 border border-white/[0.08] hover:border-white/[0.18] transition-colors"
              >
                <I className="mb-3 text-[#e5c378]" size={22} />
                <p className="font-display font-bold text-white text-sm">{t}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/50">{d}</p>
              </div>
            ))}
          </Reveal>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50, rotateY: -12 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1400 }}
          className="glass rounded-[36px] p-7 sm:p-10 border border-white/[0.12] bg-[#070e1a]/90 shadow-2xl shadow-black/95 relative overflow-hidden"
        >
          {/* Subtle top glow */}
          <span className="absolute -top-16 -right-16 size-44 rounded-full bg-[#e5c378]/20 blur-3xl pointer-events-none" />

          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0e2748] to-[#071322] text-[#39ff14] border border-[#39ff14]/30 shadow-xl shadow-black/80">
            <KeyRound size={24} />
          </span>

          <h2 className="font-display mt-6 text-3xl sm:text-4xl font-bold text-white">Sign In</h2>
          <p className="mt-1 text-xs sm:text-sm text-white/50">
            Authenticate to access the Sri Vivekananda administrative dashboard.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => router.push("/dashboard"), 600);
            }}
          >
            <label className="relative block">
              <User size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40" />
              <input
                required
                defaultValue="svpiti"
                placeholder="Institutional Username"
                autoComplete="username"
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] py-4 pr-4 pl-12 text-sm text-white placeholder-white/40 outline-none focus:border-[#e5c378] focus:ring-4 focus:ring-[#e5c378]/15 transition"
              />
            </label>

            <label className="relative block">
              <Lock size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40" />
              <input
                required
                type={show ? "text" : "password"}
                defaultValue="demo1234"
                placeholder="Secure Passkey"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] py-4 pr-12 pl-12 text-sm text-white placeholder-white/40 outline-none focus:border-[#e5c378] focus:ring-4 focus:ring-[#e5c378]/15 transition"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                aria-label="Toggle password"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white/40 hover:text-white transition"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            <div className="text-right">
              <a className="text-xs font-semibold text-[#e5c378] hover:text-[#fae6b2] transition" href="#">
                Forgot username or passkey?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e5c378] via-[#fae6b2] to-[#e5c378] py-4 text-sm font-bold text-[#05080e] shadow-xl shadow-[#e5c378]/25 transition hover:brightness-110"
            >
              {loading ? (
                <motion.span
                  className="size-5 rounded-full border-2 border-[#05080e]/40 border-t-[#05080e]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                />
              ) : (
                <>
                  Enter Executive Portal{" "}
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-white/30">
            <span className="h-px flex-1 bg-white/[0.08]" />
            or
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <button
            onClick={() => router.push("/dashboard/preadmission")}
            className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] py-3.5 text-xs font-semibold text-white transition hover:bg-white/[0.08] hover:border-[#39ff14]/30"
          >
            ✦ Open Candidate Preadmission Portal
          </button>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#39ff14]">
            <ShieldCheck size={14} /> End-to-end encrypted institutional session
          </p>
        </motion.section>
      </main>
    </>
  );
}
