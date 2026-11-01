import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ACCOUNTS, clock, pick, useOnScreen, useTicker } from './hooks';

type Tag = 'CLAY' | 'AI' | 'MAKE' | 'HUBSPOT' | 'SEND';
type Line = { id: number; time: string; tag: Tag; msg: string; ok?: string };

const TAG_STYLE: Record<Tag, string> = {
  CLAY: 'text-[#e8cf94] border-[#d6b26a]/30 bg-[#d6b26a]/10',
  AI: 'text-white border-white/20 bg-white/10',
  MAKE: 'text-[#c9ccd6] border-white/15 bg-white/5',
  HUBSPOT: 'text-[#f0d9a6] border-[#d6b26a]/25 bg-[#d6b26a]/5',
  SEND: 'text-[#d6b26a] border-[#d6b26a]/40 bg-transparent',
};

const steps = (a: (typeof ACCOUNTS)[number]): Omit<Line, 'id' | 'time'>[] => [
  { tag: 'CLAY', msg: `enrich ${a.domain} → waterfall`, ok: '3 sources' },
  { tag: 'CLAY', msg: `${a.name.split(' ')[0].toLowerCase()}@${a.domain}`, ok: 'verified' },
  { tag: 'AI', msg: `ICP score ${a.company}`, ok: `${80 + Math.floor(Math.random() * 19)}/100` },
  { tag: 'AI', msg: `personalised opener drafted`, ok: 'claude' },
  { tag: 'MAKE', msg: `scenario #${10 + Math.floor(Math.random() * 30)} routed → ${a.title}` },
  { tag: 'HUBSPOT', msg: `contact + deal synced`, ok: 'stage: qualified' },
  { tag: 'SEND', msg: `sequence step 1 queued`, ok: '09:12 local' },
];

let uid = 0;

const LiveTerminal = () => {
  const [ref, visible] = useOnScreen<HTMLDivElement>();
  const [queue, setQueue] = useState(() => steps(pick(ACCOUNTS)));
  const [lines, setLines] = useState<Line[]>([]);
  const [stats, setStats] = useState({ enriched: 1284, drafted: 912, meetings: 37 });

  useTicker(() => {
    const [next, ...rest] = queue;
    setLines((l) => [...l.slice(-7), { ...next, id: uid++, time: clock() }]);
    setQueue(rest.length ? rest : steps(pick(ACCOUNTS)));
    setStats((s) => ({
      enriched: s.enriched + (next.tag === 'CLAY' ? 1 : 0),
      drafted: s.drafted + (next.tag === 'AI' ? 1 : 0),
      meetings: s.meetings + (next.tag === 'SEND' && Math.random() < 0.35 ? 1 : 0),
    }));
  }, 850, visible);

  return (
    <div ref={ref} className="metal-card spotlight overflow-hidden backdrop-blur-xl">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d6b26a]/70" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">viperstack://pipeline-engine</span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#d6b26a]">
          <span className="live-dot" /> live
        </span>
      </div>

      {/* log stream */}
      <div className="h-[268px] overflow-hidden px-4 py-3 font-mono text-[12px] leading-[1.9]">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              layout
              initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-white/25">{l.time}</span>
              <span className={`rounded border px-1.5 text-[10px] leading-[1.6] ${TAG_STYLE[l.tag]}`}>{l.tag}</span>
              <span className="truncate text-white/75">{l.msg}</span>
              {l.ok && <span className="ml-auto shrink-0 text-[#d6b26a]">✓ {l.ok}</span>}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex items-center gap-2 text-white/40">
          <span className="text-[#d6b26a]">›</span>
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-[#d6b26a]/80" />
        </div>
      </div>

      {/* counters */}
      <div className="grid grid-cols-3 border-t border-white/5">
        {[
          ['Enriched', stats.enriched],
          ['AI drafts', stats.drafted],
          ['Meetings', stats.meetings],
        ].map(([label, n]) => (
          <div key={label as string} className="border-r border-white/5 px-4 py-3 last:border-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
            <motion.div key={n as number} initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-lg text-chrome">
              {(n as number).toLocaleString()}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTerminal;
