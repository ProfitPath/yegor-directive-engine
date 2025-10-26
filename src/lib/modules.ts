export interface Module {
  code: string;
  title: string;
  desc: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export const modules: Module[] = [
  {
    code: "TWITTER.VIRAL",
    title: "badass twitter virality",
    desc: "viral organic twitter growth, from the best in the fucking game",
    cta: { label: "[ DEPLOY VIRAL OPS ]", href: "#contact" }
  },
  {
    code: "UGC.MODELS",
    title: "ugc with hot models",
    desc: "High-conversion UGC pipelines: casting → briefs → edits → deliverables.",
    cta: { label: "[ BOOK CREATOR OPS ]", href: "#contact" }
  },
  {
    code: "ZOLEX.ELITE",
    title: "zolex — elite gc",
    desc: "Invite-only operators room. Escrowed deals. Zero-noise threads.",
    cta: { label: "[ REQUEST CHAMBER ACCESS ]", href: "https://zolex.io", external: true }
  },
  {
    code: "SCALE.SUITE",
    title: "scale suite — free telegram",
    desc: "Daily ops notes, prompts, executable playbooks. Free feed.",
    cta: { label: "[ JOIN TELEGRAM ]", href: "https://t.me/scaleSuite", external: true }
  },
  {
    code: "PRINTMONEY.PRO",
    title: "info-prod sauce",
    desc: "Frameworks and templates that sell. Productize → funnel → distribute.",
    cta: { label: "[ GET THE SAUCE ]", href: "https://printmoney.pro", external: true }
  }
];
