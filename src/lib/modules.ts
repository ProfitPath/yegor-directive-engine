export interface ModuleCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface Module {
  code: string;
  title: string;
  desc: string;
  cta: ModuleCta | ModuleCta[];
}

export const modules: Module[] = [
  {
    code: "TWITTER.VIRAL",
    title: "badass twitter virality",
    desc: "DFY/ DWY Twitter Monetization",
    cta: [
      { label: "[ MORE INFO ]", href: "https://xvirality.pro", external: true },
      { label: "[ FREE X BLUEPRINT ]", href: "https://docs.google.com/document/d/e/2PACX-1vTI3vz8aXuYlNWC1r-6NP-LmDbvp7-Ld72UaNnIS22nLK-WHOSpAB-HjaqI0y0sUw/pub", external: true }
    ]
  },
  {
    code: "UGC.MODELS",
    title: "ugc with elite creators",
    desc: "baddies from eastern europe make your ads ultra converting",
    cta: { label: "[ BOOK CREATOR OPS ]", href: "https://inbaddieswetrust.pro", external: true }
  },
  {
    code: "ZYLIX.ELITE",
    title: "the black-site group chat",
    desc: "dm me on telegram (link below) to apply",
    cta: { label: "[ REQUEST CHAMBER ACCESS ]", href: "https://zolex.io", external: true }
  },
  {
    code: "SCALE.SUITE",
    title: "scale suite — free telegram",
    desc: "free telegram GC with value",
    cta: { label: "[ JOIN TELEGRAM ]", href: "https://t.me/scalesuite", external: true }
  },
  {
    code: "PRINTMONEY.PRO",
    title: "info-prod sauce",
    desc: "frameworks and templates that sell. productize → funnel → distribute.",
    cta: { label: "[ GET THE SAUCE ]", href: "https://printmoney.pro", external: true }
  }
];
