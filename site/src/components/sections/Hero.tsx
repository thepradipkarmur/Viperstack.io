import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import OrbitField from '@/components/live/OrbitField';
import LiveTerminal from '@/components/live/LiveTerminal';

const BOOK = 'https://calendar.app.google/cg39LGy5K82i4qqA6';
const TOOLS = ['HubSpot', 'Clay', 'Make.com', 'Claude', 'OpenAI', 'Smartlead', 'Apollo', 'Slack', 'Webhooks', 'Zapier'];

const rise = (d: number) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const Hero = () => {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <OrbitField />
      <div className="grid-floor pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 items-center gap-14 px-6 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <motion.div {...rise(0)} className="eyebrow mb-8">
            <span className="live-dot" /> GTM systems online
          </motion.div>

          <motion.h1 {...rise(0.1)} className="mb-8 text-[3.4rem] leading-[0.95] text-foreground sm:text-7xl lg:text-[6.2rem]">
            <span className="text-chrome">AI Stack for</span>
            <br />
            <em className="text-gold pr-2">Modern GTM.</em>
          </motion.h1>

          <motion.p {...rise(0.22)} className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We engineer complete automated outbound systems on HubSpot, Clay and Make.com — from data
            enrichment and AI personalisation to booked meetings. Running 24/7, built once, fixed price.
          </motion.p>

          <motion.div {...rise(0.32)} className="flex flex-wrap items-center gap-3">
            <a href={BOOK} target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3.5 text-[15px]">
              Book a strategy call <ArrowUpRight className="h-4 w-4" />
            </a>
            <button onClick={() => scrollTo('#live')} className="btn-metal px-6 py-3.5 text-[15px]">
              Watch it run
            </button>
          </motion.div>

          <motion.dl {...rise(0.42)} className="mt-14 grid max-w-lg grid-cols-3 gap-4 sm:gap-6 border-t border-white/5 pt-6">
            {[
              ['$2.5–7.5k', 'fixed-price builds'],
              ['500+', 'prospects per setup'],
              ['24/7', 'autonomous pipeline'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl text-chrome sm:text-3xl">{n}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="relative min-w-0"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(214,178,106,0.14),transparent)] blur-2xl" />
          <LiveTerminal />
        </motion.div>
      </div>

      {/* tool marquee */}
      <div className="relative z-10 border-y border-white/5 bg-black/40 py-5 backdrop-blur-sm">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span key={i} className="flex items-center gap-14 whitespace-nowrap font-display text-2xl italic text-white/35">
                {t} <span className="text-[10px] not-italic text-[#d6b26a]/60">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
