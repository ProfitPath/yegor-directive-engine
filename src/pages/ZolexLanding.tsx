import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModuleRow } from "@/components/ModuleRow";
import { modules } from "@/lib/modules";
import useTypewriter from "@/hooks/useTypewriter";
import yLogo from "@/assets/y-logo.png";
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
    console.log({
      email,
      message
    });
    // Add your submission logic here
  };
  return <div className="relative min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))]">
      {/* BOOT SEQUENCE */}
      {showBoot && <motion.div initial={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="font-mono text-xs text-[hsl(var(--text-muted))]">
            {bootText}
            <span className="ml-2 cursor-blink text-[hsl(var(--accent))]">▍</span>
          </div>
        </motion.div>}

      {/* HERO */}
      <section className="relative grid min-h-[70vh] place-items-center vignette">
        <div className="scanlines absolute inset-0" />
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1,
        duration: 0.6
      }} className="relative z-10 text-center">
          <div className="mx-auto mb-6">
            <img src={yLogo} alt="Y logo" className="h-32 w-32" />
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
      <section id="protocols" className="relative mx-auto max-w-[700px] px-4 py-12">
        <div className="rounded-md border border-white/[0.08] bg-black overflow-hidden">
          {modules.map((m, i) => <ModuleRow key={m.code} {...m} defaultOpen={i === 0} />)}
        </div>
      </section>

      {/* ABOUT YEGOR */}
      

      {/* ACCESS / CONTACT */}
      

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
    </div>;
}