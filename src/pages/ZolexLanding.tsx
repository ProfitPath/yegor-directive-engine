import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Lock, Activity } from "lucide-react";

const operations = [
  {
    code: "PRINTMONEY.PRO",
    purpose: "FINANCIAL WARFARE SYSTEMS",
    status: "ACTIVE",
  },
  {
    code: "XVIRALITY.PRO",
    purpose: "SIGNAL AMPLIFICATION PROTOCOL",
    status: "ACTIVE",
  },
  {
    code: "INBADDIESWETRUST.PRO",
    purpose: "TRUST NETWORK INFRASTRUCTURE",
    status: "ACTIVE",
  },
  {
    code: "ZOLEX.IO",
    purpose: "COMMAND & CONTROL CENTER",
    status: "CLASSIFIED",
  },
];

const manifesto = [
  "WE OPERATE IN SIGNAL, NOT NOISE.",
  "TRUST IS ENCRYPTED. POWER IS DISTRIBUTED.",
  "PRIVACY IS NOT NEGOTIABLE.",
  "ACCESS IS EARNED, NEVER GIVEN.",
];

const faqs = [
  {
    q: "WHAT IS ZOLEX?",
    a: "A pitch-black marketplace for high-trust, encrypted transactions. We facilitate secure deals in private, invite-only rooms.",
  },
  {
    q: "HOW DO I JOIN?",
    a: "We onboard in small batches. Submit your application with a short note about your background and what you want to do inside.",
  },
  {
    q: "IS THIS LEGAL?",
    a: "ZOLEX is a privacy-first platform. What you do is your responsibility. We provide the infrastructure; you control the content.",
  },
  {
    q: "WHAT ABOUT PAYMENTS?",
    a: "All transactions go through our escrow system. Funds are held securely until both parties confirm the deal.",
  },
];

export default function ZolexLanding() {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootText, setBootText] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [commandInput, setCommandInput] = useState("");

  const bootSequence = [
    "> INITIALIZING YEGOR_OS_V2.0...",
    "> LOADING ENCRYPTION PROTOCOLS...",
    "> ESTABLISHING SECURE CHANNELS...",
    "> IN BADDIES WE TRUST",
    "> ACCESS GRANTED",
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    
    const typeNextChar = () => {
      if (currentLine < bootSequence.length) {
        const line = bootSequence[currentLine];
        if (currentChar < line.length) {
          setBootText((prev) => prev + line[currentChar]);
          currentChar++;
          setTimeout(typeNextChar, 30);
        } else {
          setBootText((prev) => prev + "\n");
          currentLine++;
          currentChar = 0;
          if (currentLine < bootSequence.length) {
            setTimeout(typeNextChar, 200);
          } else {
            setTimeout(() => setBootComplete(true), 500);
          }
        }
      }
    };

    typeNextChar();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, message });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* BOOT SEQUENCE */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="w-full max-w-3xl px-4">
              <pre className="text-xs leading-relaxed text-red-500 md:text-sm">
                {bootText}
                <span className="inline-block animate-pulse">█</span>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className="border-b border-red-950 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-500">
              <Terminal size={18} />
              ZOLEX
            </div>
            <div className="hidden items-center gap-6 text-xs uppercase tracking-wide text-gray-500 md:flex">
              <a href="#operations" className="transition-colors hover:text-red-500">
                OPS
              </a>
              <a href="#manifest" className="transition-colors hover:text-red-500">
                MANIFEST
              </a>
              <a href="#access" className="transition-colors hover:text-red-500">
                ACCESS
              </a>
            </div>
          </div>
          <a
            href="#access"
            className="border border-red-900 bg-black px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-red-500 transition-all hover:border-red-500 hover:bg-red-950/30 hover:text-red-400"
          >
            [ INITIATE PROTOCOL ]
          </a>
        </div>
      </nav>

      {/* COMMAND TERMINAL HERO */}
      <section className="border-b border-red-950 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-wide md:text-5xl lg:text-6xl">
              <span className="red-glow text-red-500">A PITCH-BLACK MARKETPLACE</span>
              <br />
              <span className="text-white">THE FBI WOULD HATE TO BE IN</span>
            </h1>
            <p className="mb-2 text-xs uppercase tracking-wider text-gray-500 md:text-sm">
              ULTRA-PRIVATE / INVITE-ONLY / ZERO LOGS / ENCRYPTED END-TO-END
            </p>
          </motion.div>

          {/* COMMAND INPUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative border border-red-900 bg-black p-6"
          >
            <div className="mb-3 flex items-center gap-2 text-xs text-red-500">
              <Activity size={14} />
              <span>COMMAND TERMINAL</span>
            </div>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="INPUT MISSION PARAMETERS..."
              className="w-full border-none bg-transparent font-mono text-sm text-white outline-none placeholder:text-gray-700"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-700">
              [ PRESS ENTER TO EXECUTE ]
            </div>
          </motion.div>

          {/* TRUST METRICS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 grid gap-4 text-xs md:grid-cols-3"
          >
            <div className="border border-red-950 bg-black p-4">
              <div className="mb-1 text-red-500">2,400+</div>
              <div className="text-gray-500">VERIFIED OPERATORS</div>
            </div>
            <div className="border border-red-950 bg-black p-4">
              <div className="mb-1 text-red-500">$12M+</div>
              <div className="text-gray-500">IN ESCROW</div>
            </div>
            <div className="border border-red-950 bg-black p-4">
              <div className="mb-1 text-red-500">ZERO</div>
              <div className="text-gray-500">SECURITY BREACHES</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OPERATIONS GRID */}
      <section id="operations" className="border-b border-red-950 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
              OPERATIONS GRID
            </h2>
            <p className="text-xs text-gray-500">ACTIVE MODULES & PROTOCOLS</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {operations.map((op, i) => (
              <motion.div
                key={op.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden border border-red-950 bg-black p-6 transition-all hover:border-red-500"
              >
                {/* Scanline effect on hover */}
                <div className="absolute inset-0 h-full w-0.5 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-[scanline_2s_ease-in-out_infinite]" />
                
                <div className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
                  [ {op.code} ]
                </div>
                <div className="mb-4 text-xs text-gray-400">{op.purpose}</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="text-gray-500">STATUS: {op.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFEST */}
      <section id="manifest" className="border-b border-red-950 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
              ZOLEX MANIFEST
            </h2>
            <p className="text-xs text-gray-500">CORE OPERATING PRINCIPLES</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-red-950 bg-black p-6"
            >
              <Shield className="mb-4 text-red-500" size={28} />
              <h3 className="mb-2 text-sm font-bold uppercase">ABSOLUTE PRIVACY</h3>
              <p className="text-xs text-gray-500">
                End-to-end encryption. No tracking. No logs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-red-950 bg-black p-6"
            >
              <Lock className="mb-4 text-red-500" size={28} />
              <h3 className="mb-2 text-sm font-bold uppercase">ESCROW PROTECTION</h3>
              <p className="text-xs text-gray-500">
                Every transaction secured. Funds held until delivery confirmed.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border border-red-950 bg-black p-6"
            >
              <Terminal className="mb-4 text-red-500" size={28} />
              <h3 className="mb-2 text-sm font-bold uppercase">PRIVATE ROOMS</h3>
              <p className="text-xs text-gray-500">
                Invite-only channels. Your network, your rules.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 border border-red-950 bg-black p-8">
            {manifesto.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="mb-2 text-sm font-bold uppercase tracking-wide text-red-500 last:mb-0"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS REQUEST */}
      <section id="access" className="border-b border-red-950 py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
              INITIATE ACCESS PROTOCOL
            </h2>
            <p className="text-xs text-gray-500">
              WE ONBOARD IN SMALL BATCHES. SHARE YOUR BACKGROUND AND MISSION PARAMETERS.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border border-red-950 bg-black p-4">
              <label className="mb-2 block text-xs text-gray-500">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-none bg-transparent font-mono text-sm text-white outline-none"
                required
              />
            </div>
            <div className="border border-red-950 bg-black p-4">
              <label className="mb-2 block text-xs text-gray-500">MISSION STATEMENT</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-none bg-transparent font-mono text-sm text-white outline-none resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="glitch-hover w-full border border-red-500 bg-red-500 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-red-600"
            >
              [ INITIATE PROTOCOL ]
            </button>
          </form>
        </div>
      </section>

      {/* Q&A */}
      <section className="border-b border-red-950 py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
              SYSTEM FAQ
            </h2>
            <p className="text-xs text-gray-500">CLASSIFIED INFORMATION</p>
          </div>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <details key={idx} className="group border border-red-950 bg-black" open={idx === 0}>
                <summary className="cursor-pointer list-none p-4 text-xs font-bold uppercase tracking-wide text-red-500 transition-colors hover:bg-red-950/20">
                  {item.q}
                </summary>
                <div className="border-t border-red-950 p-4 text-xs leading-relaxed text-gray-400">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / SYSTEM STATUS */}
      <footer className="border-t border-red-950 py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                <span>STATUS: ACTIVE</span>
              </div>
              <span>SECURITY: CLASSIFIED</span>
              <span>BUILD: ZOLEX_V3.0</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-red-950 pt-4 text-xs text-gray-600">
            <div>© {new Date().getFullYear()} ZOLEX</div>
            <div className="flex gap-4">
              <a href="https://inbaddieswetrust.pro" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500">
                INBADDIESWETRUST.PRO
              </a>
              <a href="https://zolex.io" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500">
                ZOLEX.IO
              </a>
              <a href="https://printmoney.pro" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500">
                PRINTMONEY.PRO
              </a>
              <a href="https://xvirality.pro" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500">
                XVIRALITY.PRO
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
