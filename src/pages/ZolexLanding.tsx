import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModuleRow } from "@/components/ModuleRow";
import { modules } from "@/lib/modules";
import useTypewriter from "@/hooks/useTypewriter";

export default function ZolexLanding() {
  const [showBoot, setShowBoot] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const bootText = useTypewriter("> INITIALIZING YEGOR_CORE ... ACCESS GRANTED", 50);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBoot(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ email, message });
    // Add your submission logic here
  };

  return (
    <div className="relative min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))]">
      {/* BOOT SEQUENCE */}
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="font-mono text-xs text-[hsl(var(--text-muted))]">
            {bootText}
            <span className="ml-2 cursor-blink text-[hsl(var(--accent))]">▍</span>
          </div>
        </motion.div>
      )}

      {/* HERO */}
      <section className="relative grid min-h-[70vh] place-items-center vignette">
        <div className="scanlines absolute inset-0" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-none border border-[var(--stroke)] bg-[var(--surface)]">
            <span className="font-mono text-2xl text-[hsl(var(--accent))]">YM</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            yegor method
          </h1>
          <p className="mt-3 text-sm text-[hsl(var(--text-muted))] md:text-base">
            how to operate and get shit done
          </p>
          <div className="mt-8 font-mono text-xs text-[hsl(var(--text-muted))]/70">
            {"> ACCESS GRANTED"}
            <span className="ml-2 cursor-blink text-[hsl(var(--accent))]">▍</span>
          </div>
        </motion.div>
      </section>

      {/* PROTOCOL CONSOLE */}
      <section id="protocols" className="relative mx-auto max-w-3xl px-4 py-12">
        <div className="mb-4 font-mono text-xs text-[hsl(var(--text-muted))]/70 text-center">
          what can yegor do for you, neo?
        </div>
        <div className="space-y-2">
          {modules.map((m, i) => (
            <ModuleRow key={m.code} {...m} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* ABOUT YEGOR */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 font-mono text-xs text-[hsl(var(--text-muted))]/70">
          [ OPERATOR PROFILE ]
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "OPERATOR, NOT INFLUENCER",
              desc: "I build systems that print attention and convert it."
            },
            {
              title: "PROOF OF WORK",
              desc: "Threads that trend. Channels that grow. Offers that sell."
            },
            {
              title: "PREFERRED WEAPONS",
              desc: "Twitter virality, UGC pipelines, private dealflow, info-product engines."
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-[var(--stroke)] bg-[var(--surface)] p-6"
            >
              <h3 className="mb-3 font-mono text-sm font-semibold text-[hsl(var(--accent))]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[hsl(var(--text-muted))]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACCESS / CONTACT */}
      <section id="contact" className="relative mx-auto max-w-2xl px-4 py-16">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          request access
        </h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid gap-3 font-mono text-sm">
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="> input secure contact"
              className="border border-[var(--stroke)] bg-transparent px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--accent))]"
            />
            <textarea
              required
              name="msg"
              rows={5}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="> outline mission parameters"
              className="border border-[var(--stroke)] bg-transparent px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--accent))]"
            />
            <button
              type="submit"
              className="justify-self-start bg-[hsl(var(--accent))] px-5 py-3 font-semibold text-black shadow-glow transition-all hover:-translate-y-[1px] will-change-transform"
            >
              [ INITIATE PROTOCOL ]
            </button>
          </form>
        ) : (
          <div className="font-mono text-sm text-[hsl(var(--text-muted))]">
            <div>{">"} routing to secure inbox...</div>
            <div className="mt-2">{">"} protocol: accepted | eta: 24h</div>
          </div>
        )}
      </section>

      {/* SYSTEM BAR FOOTER */}
      <footer className="border-t border-[var(--stroke)] py-6">
        <div className="mx-auto max-w-7xl px-4 font-mono text-xs text-[hsl(var(--text-muted))]">
          <div className="flex items-center gap-2">
            <span>STATUS:</span>
            <span className="cursor-blink text-[hsl(var(--accent))]">● ACTIVE</span>
            <span className="mx-2">|</span>
            <span>BUILD: YEGOR_OS_V1.0</span>
            <span className="mx-2">|</span>
            <span>SECURITY: CLASSIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
