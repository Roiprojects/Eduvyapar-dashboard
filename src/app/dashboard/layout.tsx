import DashboardShell from "@/components/dashboard/DashboardShell";
import AIChat from "@/components/AIChat";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell>
      {children}
      <AIChat />
    </DashboardShell>
  );
}
