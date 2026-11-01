import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnScreen, useTicker } from './hooks';

const PROSPECTS = [
  {
    who: 'Maya Chen · VP Sales, Northwind Labs',
    signals: ['Raised Series B', 'Hiring 4 SDRs', 'On HubSpot'],
    email: [
      ['Hi ', ''], ['Maya', 'v'], [' — congrats on the ', ''], ['Series B', 'v'], ['. Scaling to ', ''],
      ['4 new SDRs', 'v'], [' usually means list-building eats their first month. We wire Clay + ', ''],
      ['HubSpot', 'v'], [' so reps start with 500 verified accounts on day one. Worth 15 min?', ''],
    ],
  },
  {
    who: 'Jordan Reyes · Head of RevOps, Helix Freight',
    signals: ['New CRO joined', 'Make.com in stack', '3 open ops roles'],
    email: [
      ['Jordan', 'v'], [' — saw ', ''], ['a new CRO just joined', 'v'], [' Helix. First 90 days is usually a pipeline audit. Since you already run ', ''],
      ['Make.com', 'v'], [', we can automate routing + enrichment instead of adding ', ''], ['3 more ops hires', 'v'], ['. Open to a look?', ''],
    ],
  },
  {
    who: 'Priya Nair · CRO, Lumen Health',
    signals: ['Expanded to EMEA', 'Outbound team of 12', 'Low reply rates'],
    email: [
      ['Priya', 'v'], [', ', ''], ['EMEA expansion', 'v'], [' + a ', ''], ['12-person outbound team', 'v'],
      [' is a lot of manual research. Our AI layer writes a first line from live signals for every account — teams see reply rates move inside 30 days.', ''],
    ],
  },
];

/** An AI writer composing a personalised opener from live buying signals. */
const AIComposer = () => {
  const [ref, visible] = useOnScreen<HTMLDivElement>();
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const p = PROSPECTS[idx];
  const total = useMemo(() => p.email.reduce((n, [t]) => n + t.length, 0), [p]);

  useTicker(() => {
    setChars((c) => {
      if (c >= total + 70) {
        setIdx((i) => (i + 1) % PROSPECTS.length);
        return 0;
      }
      return c + 3;
    });
  }, 40, visible);

  let left = chars;
  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span className="truncate">{p.who}</span>
        <span className="ml-2 shrink-0 text-[#d6b26a]">claude · drafting</span>
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <AnimatePresence mode="popLayout">
          {p.signals.map((s, i) => (
            <motion.span
              key={idx + s}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-full border border-[#d6b26a]/25 bg-[#d6b26a]/5 px-2.5 py-0.5 text-[11px] text-[#e8cf94]"
            >
              ◆ {s}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex-1 rounded-xl border border-white/5 bg-black/30 p-4 text-[13.5px] leading-relaxed text-white/75">
        {p.email.map(([t, kind], i) => {
          if (left <= 0) return null;
          const shown = t.slice(0, left);
          left -= t.length;
          return kind ? (
            <span key={i} className="rounded bg-[#d6b26a]/15 px-0.5 text-[#f0d9a6]">{shown}</span>
          ) : (
            <span key={i}>{shown}</span>
          );
        })}
        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#d6b26a]" />
      </div>
    </div>
  );
};

export default AIComposer;
