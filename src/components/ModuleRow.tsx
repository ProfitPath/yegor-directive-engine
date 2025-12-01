import { Module } from "@/lib/modules";
interface ModuleRowProps extends Module {
  defaultOpen?: boolean;
}
export function ModuleRow({
  code,
  title,
  desc,
  cta,
  defaultOpen = false
}: ModuleRowProps) {
  return <details className="mb-3 rounded-lg border border-white/[0.1] bg-white/[0.02] overflow-hidden" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-4 py-3.5 md:py-4 cursor-pointer list-none text-[hsl(var(--text))] text-[0.98rem] transition-colors duration-150 hover:bg-white/[0.05] [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[0.84rem] tracking-[0.12em] uppercase text-white/90">
          [ {code} ]
        </span>
        
      </summary>
      <div className="px-4 pb-4 pl-8 md:pl-10 border-t border-white/[0.08]">
        <p className="mt-3 text-[0.95rem] leading-[1.55] text-[hsl(var(--text-muted))]">
          {desc}
        </p>
        <a href={cta.href} target={cta.external ? '_blank' : undefined} rel={cta.external ? 'noreferrer noopener' : undefined} className="mt-3.5 inline-block rounded-md border border-white/15 px-3.5 py-2.5 font-mono text-[0.8rem] tracking-[0.12em] text-[hsl(var(--text))] no-underline transition-colors duration-150 hover:border-white/70 hover:text-white hover:bg-white/[0.05]">
          {cta.label}
        </a>
      </div>
    </details>;
}