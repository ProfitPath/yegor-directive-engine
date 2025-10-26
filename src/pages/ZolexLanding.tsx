import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Shield, Lock, Users } from "lucide-react";

// Design tokens
const tokens = {
  bg: "#000",
  text: "#EDEDED",
  muted: "#9CA3AF",
  accent: "#7CFFB2",
  accent2: "#8AB4FF",
  surface: "rgba(255,255,255,0.04)",
  stroke: "rgba(255,255,255,0.08)",
  glow: "0 0 40px rgba(124,255,178,0.35)",
};

// Navigation items
const navItems = [
  { label: "about", href: "#about" },
  { label: "join", href: "#join" },
  { label: "q&a", href: "#qa" },
];

// Feature cards
const features = [
  {
    icon: Shield,
    title: "absolute privacy",
    desc: "end-to-end encryption. no tracking. no logs.",
  },
  {
    icon: Lock,
    title: "escrow protection",
    desc: "every transaction secured. funds held until delivery confirmed.",
  },
  {
    icon: Users,
    title: "private rooms",
    desc: "invite-only channels. your network, your rules.",
  },
];

// Mock members
const members = [
  { handle: "@ghost_trader", label: "verified seller" },
  { handle: "@cipher_dev", label: "code marketplace" },
  { handle: "@vault_ops", label: "security audit" },
  { handle: "@silk_route", label: "logistics" },
];

// FAQs
const faqs = [
  {
    q: "what is zolex?",
    a: "zolex is a pitch-black marketplace for high-trust, encrypted transactions. We facilitate secure deals in private, invite-only rooms.",
  },
  {
    q: "how do I join?",
    a: "We onboard in small batches. Submit your application below with a short note about your background and what you want to do inside.",
  },
  {
    q: "is this legal?",
    a: "zolex is a privacy-first platform. What you do is your responsibility. We provide the infrastructure; you control the content.",
  },
  {
    q: "what about payments?",
    a: "All transactions go through our escrow system. Funds are held securely until both parties confirm the deal.",
  },
];

export default function ZolexLanding() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, message });
    // Add your submission logic here
  };

  return (
    <div style={{ backgroundColor: tokens.bg, color: tokens.text, minHeight: "100vh" }}>
      {/* NAV */}
      <nav className="border-b" style={{ borderColor: tokens.stroke }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-8">
            <div className="text-xl font-medium tracking-tight">zolex</div>
            <div className="hidden items-center gap-6 text-sm md:flex" style={{ color: tokens.muted }}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href="#join"
            className="rounded-2xl border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5"
            style={{ borderColor: tokens.stroke, boxShadow: "none" }}
          >
            join / request invite
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="border-b py-20 md:py-32" style={{ borderColor: tokens.stroke }}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-7 md:gap-8">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-4"
            >
              <h1 className="mb-6 text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">
                a pitch-black marketplace the FBI would hate to be in
              </h1>
              <p className="mb-8 text-lg leading-relaxed" style={{ color: tokens.muted }}>
                ultra-private. invite-only. zero logs. encrypted end-to-end. if you're here, you already know why.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#join"
                  className="rounded-2xl px-6 py-3 text-sm font-medium shadow-md transition-all hover:-translate-y-0.5"
                  style={{ background: tokens.accent, color: tokens.bg, boxShadow: tokens.glow }}
                >
                  request access
                </a>
                <a
                  href="#about"
                  className="rounded-2xl border bg-transparent px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{ borderColor: tokens.stroke }}
                >
                  learn more
                </a>
              </div>
            </motion.div>

            {/* Right: Trust bar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-3"
            >
              <div className="flex flex-col gap-4 rounded-2xl p-6" style={{ background: tokens.surface, border: `1px solid ${tokens.stroke}` }}>
                <div className="text-xs uppercase tracking-wider" style={{ color: tokens.muted }}>
                  trusted by
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ background: tokens.accent }} />
                  <span className="text-sm">2,400+ verified members</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ background: tokens.accent }} />
                  <span className="text-sm">$12M+ in escrow</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ background: tokens.accent }} />
                  <span className="text-sm">zero breaches</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT / FEATURES */}
      <section id="about" className="border-b py-20" style={{ borderColor: tokens.stroke }}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-medium">how it works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: tokens.muted }}>
              three pillars: privacy, security, and trust. Everything else is noise.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{ background: tokens.surface, border: `1px solid ${tokens.stroke}` }}
              >
                <f.icon size={32} style={{ color: tokens.accent }} className="mb-4" />
                <h3 className="mb-2 text-lg font-medium">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: tokens.muted }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="border-b py-20" style={{ borderColor: tokens.stroke }}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 text-2xl font-medium">members you may know</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <motion.div
                key={m.handle}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-4"
                style={{ background: tokens.surface, border: `1px solid ${tokens.stroke}` }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full" style={{ background: tokens.stroke }} />
                  <div>
                    <div className="text-sm">{m.handle}</div>
                    <div className="text-xs" style={{ color: tokens.muted }}>
                      {m.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="border-b py-20" style={{ borderColor: tokens.stroke }}>
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="text-2xl font-medium">how to join</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm" style={{ color: tokens.muted }}>
            We onboard in small batches. Share a short note about your background and what you want to do inside.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-xl gap-3 text-left">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
              style={{ borderColor: tokens.stroke }}
              required
            />
            <textarea
              placeholder="what do you want to do here?"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
              style={{ borderColor: tokens.stroke }}
              required
            />
            <button
              type="submit"
              className="rounded-2xl px-5 py-3 text-sm font-medium shadow-md transition-all hover:-translate-y-0.5"
              style={{ background: tokens.accent, color: tokens.bg, boxShadow: tokens.glow }}
            >
              request invite
            </button>
          </form>
        </div>
      </section>

      {/* Q&A */}
      <section id="qa" className="py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-6 flex items-center gap-2 text-sm" style={{ color: tokens.muted }}>
            <HelpCircle size={16} />
            <span>q&a</span>
          </div>
          <div className="divide-y rounded-2xl" style={{ border: `1px solid ${tokens.stroke}`, borderColor: tokens.stroke }}>
            {faqs.map((item, idx) => (
              <details key={idx} className="group" open={idx === 0}>
                <summary className="cursor-pointer list-none px-5 py-4 hover:bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{item.q}</span>
                    <span className="text-xs group-open:hidden" style={{ color: tokens.muted }}>
                      expand
                    </span>
                    <span className="hidden text-xs group-open:block" style={{ color: tokens.muted }}>
                      collapse
                    </span>
                  </div>
                </summary>
                <div className="px-5 pb-5 text-sm" style={{ color: tokens.muted }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10" style={{ borderColor: tokens.stroke }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs md:flex-row md:px-6" style={{ color: tokens.muted }}>
          <p>© {new Date().getFullYear()} zolex</p>
          <div className="flex items-center gap-4">
            <a href="https://inbaddieswetrust.pro" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              in baddies we trust
            </a>
            <a href="https://zolex.io" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              zolex.io
            </a>
            <a href="https://printmoney.pro" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              print money
            </a>
            <a href="https://xvirality.pro" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              xvirality
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
