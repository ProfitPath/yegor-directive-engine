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
    desc: "DFY/ DWY Twitter Monetization",
    cta: { label: "[ DEPLOY VIRAL OPS ]", href: "https://xvirality.pro", external: true }
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
    desc: "My badass gc with VERIFIED people making over 50k/m. no brokies or jeets",
    cta: { label: "[ REQUEST CHAMBER ACCESS ]", href: "https://zolex.io", external: true }
  },
  {
    code: "SCALE.SUITE",
    title: "scale suite — free telegram",
    desc: "daily ops notes, prompts, executable playbooks. free feed; pay with attention.",
    cta: { label: "[ JOIN TELEGRAM ]", href: "https://t.me/scalesuite", external: true }
  },
  {
    code: "PRINTMONEY.PRO",
    title: "info-prod sauce",
    desc: "frameworks and templates that sell. productize → funnel → distribute.",
    cta: { label: "[ GET THE SAUCE ]", href: "https://printmoney.pro", external: true }
  }
];
