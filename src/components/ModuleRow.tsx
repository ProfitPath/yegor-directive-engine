import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Module } from "@/lib/modules";

interface ModuleRowProps extends Module {
  defaultOpen?: boolean;
}

export function ModuleRow({ code, title, desc, cta, defaultOpen = false }: ModuleRowProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-120 ${open ? 'shadow-glow border-[hsl(var(--accent))]' : ''}`}>
      <button
        className="w-full grid grid-cols-[160px_1fr_auto] items-center gap-4 px-4 py-3 text-left hover:shadow-glow hover:border-[hsl(var(--accent))] transition-all duration-120"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-mono text-sm text-[hsl(var(--accent))] flicker">[ {code} ]</span>
        <span className="text-sm md:text-base">{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="px-4 pb-4 text-sm text-[hsl(var(--text-muted))]">{desc}</div>
            <div className="px-4 pb-4">
              <a
                href={cta.href}
                target={cta.external ? '_blank' : undefined}
                rel={cta.external ? 'noreferrer noopener' : undefined}
                className="inline-flex items-center border border-[var(--stroke)] px-4 py-2 text-xs font-mono tracking-wide hover:border-[hsl(var(--accent))] hover:text-white hover:shadow-glow transition-all will-change-transform"
              >
                {cta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
