"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { queries } from "@/lib/data";

type Msg = { from: "ai" | "me"; text: string };

function answer(q: string) {
  const s = q.toLowerCase();
  const hit = queries.find((x) =>
    x.q
      .toLowerCase()
      .split(" ")
      .filter((w) => w.length > 4)
      .some((w) => s.includes(w)),
  );
  return (
    hit?.a ??
    "✦ Institutional intelligence active. You can query application tallies, fee conversion rates, teacher load, or attendance warnings."
  );
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "ai",
      text: "✦ Greetings, Principal. Eduvyapar AI Intelligence is synchronized with all institutional ledgers. What can I analyze for you today?",
    },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);

  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "ai", text: answer(t) }]);
    }, 700);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="AI Intelligence Agent"
        className="fixed right-6 bottom-6 z-[75] grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#0c2340] to-[#050e1b] text-[#39ff14] border border-[#39ff14]/40 shadow-2xl shadow-[#39ff14]/20"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#39ff14]/25 [animation-duration:2.8s]" />
        {open ? <X size={20} className="text-white" /> : <Sparkles size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{ transformOrigin: "bottom right" }}
            className="glass fixed right-6 bottom-24 z-[75] flex h-[500px] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#070e1a]/95 shadow-2xl shadow-black/95"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#0c223c] to-[#081525] p-4 text-white border-b border-white/[0.08]">
              <span className="grid size-9 place-items-center rounded-xl bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/30">
                <Bot size={18} />
              </span>
              <div className="flex-1">
                <p className="font-display font-bold text-sm text-[#fae6b2] flex items-center gap-1.5">
                  ✦ Vanguard Intelligence
                  <span className="size-1.5 rounded-full bg-[#39ff14] animate-pulse" />
                </p>
                <p className="text-[11px] text-white/50">Real-time campus inference engine</p>
              </div>
            </div>

            <div data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    m.from === "me"
                      ? "ml-auto bg-gradient-to-r from-[#e5c378] to-[#fae6b2] text-[#05080e] font-semibold"
                      : "bg-white/[0.05] text-white/80 border border-white/[0.08]"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {typing && (
                <div className="flex w-16 gap-1.5 rounded-2xl bg-white/[0.05] px-4 py-3 border border-white/[0.06]">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="size-1.5 rounded-full bg-[#39ff14]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
              <div ref={end} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
              className="flex gap-2 border-t border-white/[0.08] p-3 bg-white/[0.02]"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask about admissions, fee recovery, attendance…"
                className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-[#39ff14]/50"
              />
              <button
                className="grid size-9 place-items-center rounded-full bg-gradient-to-r from-[#e5c378] to-[#fae6b2] text-[#05080e] shadow-md hover:brightness-110 active:scale-95 transition"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
