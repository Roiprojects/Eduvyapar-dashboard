"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownUp,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download,
  FileCheck2,
  Home,
  LayoutList,
  MapPin,
  MessageSquare,
  Pencil,
  Plus,
  Rows3,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import { Counter, Reveal, SplitText } from "@/components/ui/motion";
import { applicants as seed, pipeline, type Applicant } from "@/lib/data";

type SortKey = "appNo" | "name" | "gender" | "cls";
const PER_PAGE = 8;
const CLASSES = [
  "1Yr Fitter SH1",
  "1Yr Fitter SH2",
  "1Yr Fitter SH3",
  "1Yr Electrician SH1",
  "1Yr Electrician SH3",
  "1Yr Welder SH1",
];
const FEE = 2500;
const NOW = Date.now();

const initials = (n: string) =>
  n
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({ a, size = "size-9" }: { a: Pick<Applicant, "name" | "gender">; size?: string }) => (
  <span
    className={`${size} grid shrink-0 place-items-center rounded-2xl text-xs font-bold text-white border border-white/[0.1] shadow-lg ${
      a.gender === "Female"
        ? "bg-gradient-to-br from-[#8a5cf6] to-[#0c2440]"
        : "bg-gradient-to-br from-[#0c2440] to-[#071322] text-[#e5c378]"
    }`}
  >
    {initials(a.name || "?")}
  </span>
);

/* ───────────────────────────── Luxury Wizard ───────────────────────────── */

const steps = [
  { t: "Candidate Identity", s: "Name, trade allocation, date of birth", i: User },
  { t: "Contact & Geolocation", s: "Verified mobile and residential pin", i: MapPin },
  { t: "Guardian Registry", s: "Father & mother lineage records", i: Users },
  { t: "Holographic Vault", s: "Biometric portrait & verified certificates", i: FileCheck2 },
  { t: "Audit & Treasury", s: "Cross-ledger review and fee settlement", i: ShieldCheck },
];

const docsList = ["Student photo", "SSLC marks card", "Transfer certificate", "Caste certificate", "Aadhaar card"];

type Form = {
  first: string;
  last: string;
  dob: string;
  cls: string;
  gender: Applicant["gender"];
  phone: string;
  street: string;
  pin: string;
  city: string;
  father: string;
  mother: string;
  docs: Record<string, boolean>;
  photo: string | null;
};

function Field({
  label,
  hint,
  error,
  required,
  ...p
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-xs font-semibold text-white/60">
        <span>
          {label} {required && <span className="text-[#39ff14]">*</span>}
        </span>
        {hint && !error && <span className="font-medium text-[#39ff14]">{hint}</span>}
      </span>
      <input
        required={required}
        aria-invalid={!!error}
        {...p}
        className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 transition outline-none focus:ring-4 ${
          error
            ? "border-[#ff4d6d] focus:ring-[#ff4d6d]/20"
            : "border-white/[0.08] focus:border-[#e5c378] focus:ring-[#e5c378]/15"
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 block text-xs text-[#ff4d6d]"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

const PINS: Record<string, string> = {
  "560041": "Bengaluru",
  "560001": "Bengaluru",
  "570001": "Mysuru",
  "580020": "Hubballi",
};

function Wizard({
  a,
  onClose,
  onSave,
}: {
  a: Applicant | null;
  onClose: () => void;
  onSave: (a: Applicant) => void;
}) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Applicant | null>(null);
  const [touched, setTouched] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [first, ...rest] = (a?.name ?? "").split(" ");
  const [f, setF] = useState<Form>({
    first: first ?? "",
    last: rest.join(" "),
    dob: "2006-08-01",
    cls: a?.cls ?? CLASSES[0],
    gender: a?.gender ?? "Male",
    phone: a ? "9999999998" : "",
    street: "",
    pin: "",
    city: "",
    father: "",
    mother: "",
    docs: a ? { "Student photo": true, "SSLC marks card": true } : {},
    photo: null,
  });

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    setSaved("Saving…");
  };

  useEffect(() => {
    const t = setTimeout(() => setSaved("Autonomous sync live"), 500);
    return () => clearTimeout(t);
  }, [f]);

  const age = f.dob ? Math.floor((NOW - new Date(f.dob).getTime()) / 3.15576e10) : null;
  const errors: Record<string, string | undefined> = {
    first: !f.first.trim() ? "Candidate first name is required" : undefined,
    phone: f.phone && !/^\d{10}$/.test(f.phone.replace(/\D/g, "").slice(-10)) ? "Enter a 10-digit mobile number" : undefined,
    pin: f.pin && !/^\d{6}$/.test(f.pin) ? "PIN code requires 6 digits" : undefined,
  };
  const stepValid = [!errors.first, !errors.phone && !errors.pin, true, true, true][step];
  const docCount = docsList.filter((d) => f.docs[d] || (d === "Student photo" && f.photo)).length;
  const completeness = Math.round(
    ([f.first, f.dob, f.cls, f.phone, f.street, f.pin, f.father, f.mother].filter(Boolean).length / 8) * 70 +
      (docCount / docsList.length) * 30,
  );

  const next = () => {
    setTouched(true);
    if (!stepValid) return;
    setTouched(false);
    if (step < steps.length - 1) return setStep(step + 1);
    const out: Applicant = {
      ...(a ?? {
        appNo: String(20240018 + Math.floor(Math.random() * 80)),
        appStatus: "APP ACCEPTED",
        admStatus: "CONFIRM",
        active: true,
      }),
      name: `${f.first} ${f.last}`.trim(),
      cls: f.cls,
      gender: f.gender,
    } as Applicant;
    setDone(out);
  };

  if (done)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass mb-8 overflow-hidden rounded-[32px] p-10 text-center border border-white/[0.12] bg-[#081220]/95 shadow-2xl"
      >
        <div className="relative mx-auto mb-6 size-20">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 left-1/2 size-2 rounded-full"
              style={{ background: ["#e5c378", "#39ff14", "#00f0ff", "#fae6b2"][i % 4] }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i / 14) * Math.PI * 2) * 90,
                y: Math.sin((i / 14) * Math.PI * 2) * 90,
                opacity: 0,
              }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#39ff14] to-[#2fd3a5] text-[#05080e] shadow-xl shadow-[#39ff14]/30"
          >
            <Check size={36} strokeWidth={3} />
          </motion.span>
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
          Dossier {a ? "Updated" : "Enrolled Successfully"}
        </h3>
        <p className="mt-2 text-sm text-white/60">
          #{done.appNo} · {done.name} · {done.cls}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-3 text-xs font-bold text-white hover:bg-white/[0.15] border border-white/[0.1] transition">
            <Download size={15} /> Download Signed Receipt
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-3 text-xs font-bold text-white hover:bg-white/[0.15] border border-white/[0.1] transition">
            <MessageSquare size={15} /> Transmit SMS to Parent
          </button>
          <button
            onClick={() => onSave(done)}
            className="rounded-full bg-gradient-to-r from-[#e5c378] to-[#fae6b2] px-7 py-3 text-xs font-bold text-[#05080e] shadow-lg shadow-[#e5c378]/25 hover:brightness-110 transition"
          >
            ✦ Return to Registry
          </button>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: 20, rotateX: 8 }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      style={{ transformPerspective: 1400 }}
      className="glass mb-8 overflow-hidden rounded-[32px] border border-white/[0.12] bg-[#070e1b]/95 shadow-2xl"
    >
      {/* Header + Autosave */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 sm:px-9 sm:pt-8 border-b border-white/[0.06] pb-5">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
            {a ? `Edit Dossier #${a.appNo}` : "✦ VIP Candidate Intake Dossier"}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-[#39ff14] mt-1 font-medium">
            <Cloud size={13} /> {saved}
          </p>
        </div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/70 hover:bg-white/[0.12] hover:text-white transition"
        >
          <X size={14} /> Close
        </button>
      </div>

      {/* Step Tracker */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-6 py-4 sm:px-9 bg-white/[0.02]">
        {steps.map((s, i) => (
          <button
            key={s.t}
            onClick={() => i <= step && setStep(i)}
            className="min-w-[140px] flex-1 text-left group"
          >
            <span className="block h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.span
                className="block h-full bg-gradient-to-r from-[#e5c378] to-[#39ff14]"
                animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </span>
            <span
              className={`mt-2.5 flex items-center gap-1.5 text-xs font-semibold ${
                i === step ? "text-[#fae6b2]" : i < step ? "text-[#39ff14]" : "text-white/35"
              }`}
            >
              {i < step ? <Check size={12} strokeWidth={3} /> : <s.i size={12} />} {s.t}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          noValidate
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <h4 className="font-display text-2xl font-bold text-white">{steps[step].t}</h4>
              <p className="mb-6 text-xs sm:text-sm text-white/50">{steps[step].s}</p>

              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="First name"
                    required
                    value={f.first}
                    onChange={(e) => set("first", e.target.value)}
                    error={touched ? errors.first : undefined}
                    autoFocus
                  />
                  <Field
                    label="Last name"
                    value={f.last}
                    onChange={(e) => set("last", e.target.value)}
                  />
                  <Field
                    label="Date of birth"
                    required
                    type="date"
                    value={f.dob}
                    onChange={(e) => set("dob", e.target.value)}
                    hint={age ? `${age} years old` : undefined}
                  />
                  <Field label="Academic year" required defaultValue="2026-2027" />
                  <div className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-semibold text-white/60">
                      Technical Trade Allocation <span className="text-[#39ff14]">*</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CLASSES.map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => set("cls", c)}
                          className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                            f.cls === c
                              ? "bg-gradient-to-r from-[#e5c378] to-[#fae6b2] text-[#05080e] font-bold shadow-lg shadow-[#e5c378]/20"
                              : "bg-white/[0.05] text-white/70 hover:bg-white/[0.08]"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="mb-2 block text-xs font-semibold text-white/60">
                      Gender <span className="text-[#39ff14]">*</span>
                    </span>
                    <div className="flex gap-2">
                      {(["Male", "Female"] as const).map((g) => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => set("gender", g)}
                          className={`flex-1 rounded-2xl py-3 text-xs font-bold transition ${
                            f.gender === g
                              ? "bg-[#e5c378] text-[#05080e] shadow-md shadow-[#e5c378]/20"
                              : "bg-white/[0.05] text-white/60 hover:text-white"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Verified mobile number"
                    required
                    type="tel"
                    inputMode="numeric"
                    placeholder="98765 43210"
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    error={errors.phone}
                    hint={f.phone && !errors.phone ? "Valid Format" : undefined}
                  />
                  <Field label="Guardian email" type="email" placeholder="parent@institutional.com" />
                  <Field
                    label="Residential street / Door No"
                    required
                    value={f.street}
                    onChange={(e) => set("street", e.target.value)}
                    placeholder="#12, 4th Cross"
                  />
                  <Field
                    label="PIN code"
                    required
                    inputMode="numeric"
                    placeholder="560041"
                    value={f.pin}
                    error={errors.pin}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                      set("pin", v);
                      if (PINS[v]) set("city", PINS[v]);
                    }}
                    hint={PINS[f.pin] ? `Auto-detected ${PINS[f.pin]}` : undefined}
                  />
                  <Field label="City" required value={f.city} onChange={(e) => set("city", e.target.value)} />
                  <label className="flex items-center gap-3 self-end rounded-2xl bg-white/[0.04] px-4 py-3.5 text-xs text-white/70 border border-white/[0.06]">
                    <input type="checkbox" defaultChecked className="size-4 accent-[#39ff14]" />
                    Permanent domicile address matches above
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Father's full name"
                    required
                    value={f.father}
                    onChange={(e) => set("father", e.target.value)}
                  />
                  <Field label="Father's mobile" type="tel" placeholder="+91" />
                  <Field
                    label="Mother's full name"
                    required
                    value={f.mother}
                    onChange={(e) => set("mother", e.target.value)}
                  />
                  <Field label="Mother's mobile" type="tel" placeholder="+91" />
                  <Field label="Annual family income" placeholder="₹" inputMode="numeric" />
                  <Field label="Primary profession" placeholder="e.g. Agriculture / Defense" />
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
                  <label className="group relative grid aspect-[3/4] cursor-pointer place-items-center overflow-hidden rounded-3xl border-2 border-dashed border-[#e5c378]/40 bg-white/[0.03] text-center transition hover:border-[#e5c378]">
                    {f.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={f.photo} alt="Student" className="absolute inset-0 size-full object-cover" />
                    ) : (
                      <span className="p-4 text-xs text-white/50">
                        <Camera className="mx-auto mb-2 text-[#e5c378]" size={26} />
                        Biometric portrait
                        <br />
                        <span className="text-[10px] text-[#39ff14]">Click to upload</span>
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) set("photo", URL.createObjectURL(file));
                      }}
                    />
                  </label>
                  <ul className="space-y-2.5">
                    {docsList.slice(1).map((d) => {
                      const ok = !!f.docs[d];
                      return (
                        <li
                          key={d}
                          className={`flex items-center gap-3.5 rounded-2xl p-3.5 transition border ${
                            ok
                              ? "bg-[#39ff14]/10 border-[#39ff14]/30"
                              : "bg-white/[0.03] border-white/[0.06]"
                          }`}
                        >
                          <span
                            className={`grid size-9 place-items-center rounded-xl ${
                              ok
                                ? "bg-[#39ff14] text-[#05080e]"
                                : "bg-white/[0.05] text-white/40"
                            }`}
                          >
                            {ok ? <Check size={16} strokeWidth={3} /> : <FileCheck2 size={16} />}
                          </span>
                          <span className="flex-1 text-xs font-semibold text-white">{d}</span>
                          {ok ? (
                            <button
                              type="button"
                              onClick={() => set("docs", { ...f.docs, [d]: false })}
                              className="grid size-8 place-items-center rounded-full text-white/40 hover:bg-white/[0.1] hover:text-[#ff4d6d]"
                              aria-label={`Remove ${d}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          ) : (
                            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/[0.15] transition border border-white/[0.08]">
                              <Upload size={12} /> Upload
                              <input
                                type="file"
                                className="sr-only"
                                onChange={() => set("docs", { ...f.docs, [d]: true })}
                              />
                            </label>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {[
                    { s: 0, t: "Candidate", v: `${f.first} ${f.last} · ${f.gender} · ${f.cls} · born ${f.dob}` },
                    {
                      s: 1,
                      t: "Geolocation & Domicile",
                      v: [f.phone, f.street, f.city, f.pin].filter(Boolean).join(" · ") || "Incomplete",
                    },
                    {
                      s: 2,
                      t: "Lineage",
                      v: [f.father, f.mother].filter(Boolean).join(" & ") || "Incomplete",
                    },
                    { s: 3, t: "Verified Vault", v: `${docCount} of ${docsList.length} certificates registered` },
                  ].map((r) => (
                    <div
                      key={r.t}
                      className="flex items-start justify-between gap-4 rounded-2xl bg-white/[0.04] p-4 border border-white/[0.06]"
                    >
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-[#e5c378] uppercase">
                          {r.t}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-white/80">{r.v}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(r.s)}
                        className="text-xs font-bold text-[#39ff14] hover:underline"
                      >
                        Modify
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#0c2440] to-[#071322] p-5 text-white border border-[#e5c378]/30 shadow-xl">
                    <span className="text-xs font-semibold text-white/70">Institutional Application Fee</span>
                    <b className="font-display text-2xl text-[#fae6b2]">
                      ₹{FEE.toLocaleString("en-IN")}
                    </b>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              disabled={!step}
              onClick={() => setStep(step - 1)}
              className="rounded-full px-5 py-2.5 text-xs font-bold text-white/60 hover:text-white disabled:opacity-25"
            >
              Back
            </button>
            <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">
              Phase {step + 1} of {steps.length}
            </span>
            <button className="rounded-full bg-gradient-to-r from-[#e5c378] via-[#fae6b2] to-[#e5c378] px-7 py-3 text-xs font-bold text-[#05080e] shadow-lg shadow-[#e5c378]/25 hover:brightness-110 transition">
              {step < steps.length - 1 ? "Proceed ✦" : a ? "Save Dossier" : "Authorize & Settle Fee ✦"}
            </button>
          </div>
        </form>

        {/* Live aside dossier preview */}
        <aside className="h-fit rounded-3xl bg-gradient-to-br from-[#0c2340] to-[#050e1b] p-6 text-white border border-white/[0.1] shadow-2xl lg:sticky lg:top-28">
          <p className="text-[10px] font-bold tracking-[0.25em] text-[#e5c378] uppercase">
            ✦ Telemetry Hologram
          </p>
          <div className="mt-4 flex items-center gap-3">
            {f.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.photo} alt="" className="size-14 rounded-2xl object-cover border border-white/[0.15]" />
            ) : (
              <Avatar a={{ name: `${f.first} ${f.last}`, gender: f.gender }} size="size-14 rounded-2xl text-base" />
            )}
            <div className="min-w-0">
              <p className="font-display truncate text-lg font-bold text-white">
                {`${f.first} ${f.last}`.trim() || "New Candidate"}
              </p>
              <p className="text-xs text-white/55">
                {f.cls}
                {age ? ` · ${age} yrs` : ""}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-white/60 font-medium">Dossier Integrity</span>
              <b className="text-[#39ff14]">{completeness}%</b>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08] p-[1px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#e5c378] to-[#39ff14]"
                animate={{ width: `${completeness}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
          <dl className="mt-6 space-y-2.5 text-xs">
            {[
              ["Contact", f.phone || "—"],
              ["Domicile", f.city || "—"],
              ["Lineage", [f.father, f.mother].filter(Boolean).join(", ") || "—"],
              ["Vault Docs", `${docCount}/${docsList.length}`],
              ["Intake Fee", `₹${FEE.toLocaleString("en-IN")}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-white/45">{k}</dt>
                <dd className="truncate text-right font-semibold text-white/90">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────── Candidate Grid ───────────────────────────── */

const views = [
  { id: "all", label: "All Candidates", test: () => true },
  { id: "active", label: "Active", test: (r: Applicant) => r.active },
  { id: "inactive", label: "Archived", test: (r: Applicant) => !r.active },
  { id: "review", label: "Review Required", test: (r: Applicant) => r.appStatus !== "APP ACCEPTED" },
  { id: "unpaid", label: "Settlement Pending", test: () => true },
] as const;

function Drawer({
  r,
  onClose,
  onEdit,
}: {
  r: Applicant | null;
  onClose: () => void;
  onEdit: (r: Applicant) => void;
}) {
  return (
    <AnimatePresence>
      {r && (
        <>
          <motion.div
            className="fixed inset-0 z-[85] bg-[#05080e]/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[86] w-full max-w-md overflow-y-auto bg-[#070e1b] border-l border-white/[0.1] p-7 shadow-2xl text-white sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 grid size-9 place-items-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition"
            >
              <X size={16} />
            </button>
            <Avatar a={r} size="size-16 text-xl rounded-2xl" />
            <h3 className="font-display mt-5 text-3xl font-bold text-white">{r.name}</h3>
            <p className="text-xs text-white/50 mt-1">
              Dossier #{r.appNo} · {r.cls}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-[#00f0ff]/15 px-3 py-1 text-[10px] font-bold text-[#00f0ff] border border-[#00f0ff]/25">
                {r.appStatus}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                  r.active
                    ? "bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/25"
                    : "bg-white/[0.08] text-white/50"
                }`}
              >
                {r.active ? "Active" : "Archived"}
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => onEdit(r)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e5c378] to-[#fae6b2] py-3 text-xs font-bold text-[#05080e] shadow-lg shadow-[#e5c378]/20 hover:brightness-110 transition"
              >
                <Pencil size={13} /> Edit Dossier
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/[0.06] py-3 text-xs font-bold text-white hover:bg-white/[0.12] transition border border-white/[0.08]">
                <MessageSquare size={13} /> SMS Dispatch
              </button>
            </div>
            <h4 className="mt-8 mb-4 text-[10px] font-bold tracking-[0.25em] text-[#e5c378] uppercase">
              ✦ Audit &amp; Intake Chronology
            </h4>
            <ol className="relative space-y-5 border-l border-white/[0.1] pl-5">
              {[
                { t: "Application Dossier Initialized", d: "Oct 1, 10:24", c: "#e5c378" },
                { t: "Demographic Records Synchronized", d: "Oct 1, 10:41", c: "#39ff14" },
                { t: "Intake Acceptance Validated", d: "Oct 3, 15:02", c: "#00f0ff" },
                { t: "Application Fee Pending", d: "Automated alert active", c: "#ff4d6d" },
              ].map((e) => (
                <li key={e.t} className="relative">
                  <span
                    className="absolute top-1 -left-[25px] size-2.5 rounded-full ring-4 ring-[#070e1b]"
                    style={{ background: e.c }}
                  />
                  <p className="text-xs font-semibold text-white">{e.t}</p>
                  <p className="text-[11px] text-white/45">{e.d}</p>
                </li>
              ))}
            </ol>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ApplicationsPage() {
  const params = useSearchParams();
  const [rows, setRows] = useState(seed);
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState(params.get("q") ?? "");
  const [view, setView] = useState<(typeof views)[number]["id"]>(
    params.get("f") === "unpaid" ? "unpaid" : "all",
  );
  const [cls, setCls] = useState<string>("All classes");
  const [sort, setSort] = useState<{ k: SortKey; dir: 1 | -1 }>({ k: "appNo", dir: 1 });
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [peek, setPeek] = useState<Applicant | null>(null);
  const [editing, setEditing] = useState<Applicant | null | "new">(params.get("new") ? "new" : null);

  const data = useMemo(() => {
    const test = views.find((v) => v.id === view)!.test;
    const f = rows.filter(
      (r) =>
        test(r) &&
        (cls === "All classes" || r.cls === cls) &&
        Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase()),
    );
    return [...f].sort((a, b) => a[sort.k].localeCompare(b[sort.k]) * sort.dir);
  }, [rows, q, sort, view, cls]);

  const pages = Math.max(1, Math.ceil(data.length / PER_PAGE));
  const pageRows = data.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const allOnPage = pageRows.length > 0 && pageRows.every((r) => sel.has(r.appNo));
  const toggle = (id: string) =>
    setSel((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const bulk = (active: boolean) => {
    setRows((rs) => rs.map((r) => (sel.has(r.appNo) ? { ...r, active } : r)));
    setSel(new Set());
  };

  const th = (k: SortKey, label: string) => (
    <th className="px-4 py-3.5 text-left">
      <button
        onClick={() => setSort((s) => ({ k, dir: s.k === k ? ((-s.dir) as 1 | -1) : 1 }))}
        className={`inline-flex items-center gap-1.5 transition ${sort.k === k ? "text-[#39ff14]" : "hover:text-white"}`}
      >
        {label} <ArrowDownUp size={12} />
      </button>
    </th>
  );
  const py = dense ? "py-2.5" : "py-4";

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6">
      <Reveal>
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
          <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-[#39ff14] transition">
            <Home size={13} /> ✦ Sovereign Campus
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-white/70">Admissions &amp; Intake</span>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-[#fae6b2] bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/[0.08]">
            Candidate Dossier Registry
          </span>
        </nav>
      </Reveal>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-black tracking-tight text-white">
            <SplitText text="Candidate Intake" />
            <br />
            <SplitText text="Dossier Registry." className="text-gradient-gold" delay={0.2} />
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/60 leading-relaxed">
            Audit, authenticate, and admit incoming applicants with end-to-end ledger verification.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#e5c378] via-[#fae6b2] to-[#e5c378] px-7 py-4 text-xs font-bold text-[#05080e] shadow-xl shadow-[#e5c378]/25 hover:brightness-110 transition"
        >
          <Plus size={16} /> ✦ New Intake Dossier
        </motion.button>
      </div>

      {/* PIPELINE STATUS BENTO */}
      <div className="no-scrollbar mt-10 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-7">
        {pipeline.map((p) => (
          <motion.div
            key={p.label}
            whileHover={{ y: -4 }}
            className="glass relative min-w-[135px] overflow-hidden rounded-2xl p-4 border border-white/[0.08] hover:border-white/[0.2] transition-colors"
          >
            <span
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: p.tone, boxShadow: `0 0 10px ${p.tone}` }}
            />
            <p className="font-display text-3xl font-extrabold text-white">
              <Counter to={p.value} />
            </p>
            <p className="mt-1 text-[11px] font-semibold text-white/55 truncate">{p.label}</p>
          </motion.div>
        ))}
      </div>

      {/* TABS */}
      <div className="glass relative mt-8 grid grid-cols-2 rounded-full p-1.5 border border-white/[0.08] bg-[#070e1b]/80">
        {["✦ Application Forms Matrix", "✦ Health & Biometrics Archive"].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className="relative rounded-full py-3 text-xs font-bold transition"
          >
            {tab === i && (
              <motion.span
                layoutId="tab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0c2440] to-[#081525] border border-[#e5c378]/30 shadow-lg shadow-black/60"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${tab === i ? "text-[#fae6b2]" : "text-white/55 hover:text-white"}`}>
              {t}
            </span>
          </button>
        ))}
      </div>

      {/* WIZARD CONTAINER */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {editing && (
            <Wizard
              key={editing === "new" ? "new" : editing.appNo}
              a={editing === "new" ? null : editing}
              onClose={() => setEditing(null)}
              onSave={(a) => {
                setRows((r) =>
                  r.some((x) => x.appNo === a.appNo) ? r.map((x) => (x.appNo === a.appNo ? a : x)) : [a, ...r],
                );
                setEditing(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* CANDIDATE DATA GRID */}
      <div className="glass overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#070e1a]/90 shadow-2xl">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5 border-b border-white/[0.06] bg-white/[0.02]">
          <label className="relative w-full sm:w-80">
            <Search size={15} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#39ff14]" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
              placeholder="Search candidate name, ID, trade…"
              className="w-full rounded-full border border-white/[0.08] bg-white/[0.04] py-2.5 pr-4 pl-10 text-xs text-white placeholder-white/40 outline-none focus:border-[#39ff14]/50 focus:ring-2 focus:ring-[#39ff14]/20"
            />
          </label>
          <div className="no-scrollbar flex gap-1 overflow-x-auto">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setView(v.id);
                  setPage(0);
                }}
                className="relative shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition"
              >
                {view === v.id && (
                  <motion.span
                    layoutId="view"
                    className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.15]"
                  />
                )}
                <span className={`relative z-10 ${view === v.id ? "text-[#fae6b2]" : "text-white/55 hover:text-white"}`}>
                  {v.label} <span className="opacity-50 text-[10px] tabular-nums">({rows.filter(v.test).length})</span>
                </span>
              </button>
            ))}
          </div>
          <select
            value={cls}
            onChange={(e) => {
              setCls(e.target.value);
              setPage(0);
            }}
            className="rounded-full border border-white/[0.08] bg-[#0c182a] px-4 py-2 text-xs font-semibold text-white/80 outline-none"
          >
            {["All classes", ...CLASSES, "1st Fitter"].map((c) => (
              <option key={c} value={c} className="bg-[#070e1a] text-white">
                {c}
              </option>
            ))}
          </select>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => setDense(!dense)}
              title={dense ? "Comfortable rows" : "Compact rows"}
              className="grid size-9 place-items-center rounded-full bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white border border-white/[0.06]"
            >
              {dense ? <LayoutList size={15} /> : <Rows3 size={15} />}
            </button>
            <button
              title="Export to Excel / CSV"
              className="grid size-9 place-items-center rounded-full bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white border border-white/[0.06]"
            >
              <Download size={15} />
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div data-lenis-prevent className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[940px] text-xs">
            <thead className="sticky top-0 bg-[#070e1b]/95 text-[10px] font-bold tracking-wider text-white/45 uppercase backdrop-blur border-b border-white/[0.06]">
              <tr>
                <th className="w-12 px-4 py-3.5">
                  <input
                    type="checkbox"
                    aria-label="Select page"
                    checked={allOnPage}
                    onChange={() =>
                      setSel((s) => {
                        const n = new Set(s);
                        pageRows.forEach((r) => (allOnPage ? n.delete(r.appNo) : n.add(r.appNo)));
                        return n;
                      })
                    }
                    className="size-4 accent-[#39ff14]"
                  />
                </th>
                {th("name", "Candidate")}
                {th("appNo", "Dossier ID")}
                {th("cls", "Trade")}
                {th("gender", "Gender")}
                <th className="px-4 py-3.5 text-left">Intake Status</th>
                <th className="px-4 py-3.5 text-left">Settlement</th>
                <th className="px-4 py-3.5 text-right">Active</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false} mode="popLayout">
                {pageRows.map((r, i) => (
                  <motion.tr
                    layout
                    key={r.appNo}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => setPeek(r)}
                    className={`group cursor-pointer border-t border-white/[0.04] transition-colors ${
                      sel.has(r.appNo) ? "bg-[#39ff14]/8" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <td className={`px-4 ${py}`} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label={`Select ${r.name}`}
                        checked={sel.has(r.appNo)}
                        onChange={() => toggle(r.appNo)}
                        className="size-4 accent-[#39ff14]"
                      />
                    </td>
                    <td className={`px-4 ${py}`}>
                      <span className="flex items-center gap-3">
                        {!dense && <Avatar a={r} />}
                        <span className="font-semibold text-white text-sm group-hover:text-[#fae6b2] transition">
                          {r.name}
                        </span>
                      </span>
                    </td>
                    <td className={`px-4 ${py} font-mono text-white/50 text-[11px]`}>#{r.appNo}</td>
                    <td className={`px-4 ${py} text-white/70 font-medium`}>{r.cls}</td>
                    <td className={`px-4 ${py} text-white/50`}>{r.gender}</td>
                    <td className={`px-4 ${py}`}>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${
                          r.appStatus === "APP ACCEPTED"
                            ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20"
                            : "bg-[#e5c378]/15 text-[#fae6b2] border border-[#e5c378]/25"
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-current" />
                        {r.appStatus === "APP ACCEPTED" ? "Validated · Confirmed" : "Review Required"}
                      </span>
                    </td>
                    <td className={`px-4 ${py} text-white/40`}>Pending</td>
                    <td className={`px-4 ${py}`} onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => setEditing(r)}
                          aria-label={`Edit ${r.name}`}
                          className="grid size-8 place-items-center rounded-full bg-white/[0.06] text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-[#39ff14] hover:text-[#05080e] focus:opacity-100"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          role="switch"
                          aria-checked={r.active}
                          aria-label={`${r.name} active`}
                          onClick={() =>
                            setRows((rs) =>
                              rs.map((x) => (x.appNo === r.appNo ? { ...x, active: !x.active } : x)),
                            )
                          }
                          className={`relative h-5 w-10 rounded-full transition-colors ${
                            r.active ? "bg-[#39ff14]" : "bg-white/[0.12]"
                          }`}
                        >
                          <motion.span
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`absolute top-0.5 size-4 rounded-full bg-[#05080e] shadow ${
                              r.active ? "right-0.5" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <ul className="space-y-2 p-3 md:hidden">
          {pageRows.map((r) => (
            <li key={r.appNo}>
              <button
                onClick={() => setPeek(r)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] p-3.5 text-left border border-white/[0.06]"
              >
                <Avatar a={r} size="size-11" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-white">{r.name}</span>
                  <span className="block text-xs text-white/50">
                    #{r.appNo} · {r.cls}
                  </span>
                </span>
                <span
                  className={`size-2.5 rounded-full ${r.active ? "bg-[#39ff14]" : "bg-white/20"}`}
                  aria-label={r.active ? "Active" : "Inactive"}
                />
              </button>
            </li>
          ))}
        </ul>

        {!pageRows.length && (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-2xl font-bold text-white">No candidate dossiers found</p>
            <p className="mt-1 text-xs text-white/50">Try clearing active query filters.</p>
            <button
              onClick={() => {
                setView("all");
                setCls("All classes");
                setQ("");
              }}
              className="mt-5 rounded-full bg-white/[0.08] px-5 py-2.5 text-xs font-bold text-white hover:bg-white/[0.15] border border-white/[0.1]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] p-4 text-xs text-white/50">
          <span>
            Displaying {data.length ? page * PER_PAGE + 1 : 0}–{Math.min(data.length, (page + 1) * PER_PAGE)} of{" "}
            {data.length} candidate dossiers
          </span>
          <div className="flex items-center gap-1.5">
            <button
              disabled={!page}
              onClick={() => setPage(page - 1)}
              className="grid size-8 place-items-center rounded-full bg-white/[0.06] text-white disabled:opacity-30 hover:bg-white/[0.12]"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`size-8 rounded-full font-bold text-xs transition ${
                  i === page ? "bg-gradient-to-r from-[#e5c378] to-[#fae6b2] text-[#05080e]" : "bg-white/[0.05] text-white/70 hover:bg-white/[0.1]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page >= pages - 1}
              onClick={() => setPage(page + 1)}
              className="grid size-8 place-items-center rounded-full bg-white/[0.06] text-white disabled:opacity-30 hover:bg-white/[0.12]"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Dock */}
      <AnimatePresence>
        {sel.size > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-0 bottom-6 z-[70] mx-auto flex w-fit max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-full bg-[#081220]/95 border border-white/[0.15] p-2 pl-5 text-xs text-white shadow-2xl shadow-black/90 backdrop-blur-xl"
            style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <b className="text-[#39ff14]">{sel.size} Dossiers Selected</b>
            <span className="mx-1 h-4 w-px bg-white/20" />
            <button
              onClick={() => bulk(true)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10 transition"
            >
              <CheckCircle2 size={14} className="text-[#39ff14]" /> Activate
            </button>
            <button
              onClick={() => bulk(false)}
              className="rounded-full px-3 py-1.5 hover:bg-white/10 transition text-white/70"
            >
              Archive
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10 transition">
              <MessageSquare size={14} /> SMS Batch
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#e5c378] to-[#fae6b2] px-3.5 py-1.5 font-bold text-[#05080e] shadow-md">
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={() => setSel(new Set())}
              aria-label="Clear selection"
              className="grid size-7 place-items-center rounded-full hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer
        r={peek}
        onClose={() => setPeek(null)}
        onEdit={(r) => {
          setPeek(null);
          setEditing(r);
          window.scrollTo({ top: 0 });
        }}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ApplicationsPage />
    </Suspense>
  );
}
