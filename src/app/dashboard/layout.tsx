import SceneLoader from "@/components/three/SceneLoader";
import TopBar from "@/components/TopBar";
import AIChat from "@/components/AIChat";
import { ScrollProgress } from "@/components/ui/motion";
import { school } from "@/lib/data";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <>
      <ScrollProgress />
      <SceneLoader />
      <TopBar />
      <main className="relative">{children}</main>
      <footer className="relative mt-16 px-4 pb-12 sm:px-6">
        <div className="glass-dark mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[32px] p-8 sm:p-12 text-white border border-white/[0.08] shadow-2xl sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">
              ✦ Vanguard Campus Governance
            </span>
            <p className="font-display mt-3 text-3xl font-bold sm:text-5xl leading-tight">
              Command the institution,<br />
              <span className="text-gradient-gold">liberate the human potential.</span>
            </p>
          </div>
          <div className="text-xs text-white/55 space-y-1">
            <p className="text-white/80 font-semibold">{school.name} · Institutional Node</p>
            <p>© 2026 Eduvyapar Sovereign Digital Campus</p>
            <p className="text-[#39ff14]">Dedicated VIP Support: {school.tollFree}</p>
          </div>
        </div>
      </footer>
      <AIChat />
    </>
  );
}
