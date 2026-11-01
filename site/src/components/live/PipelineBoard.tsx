import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ACCOUNTS, useOnScreen, useTicker } from './hooks';

const STAGES = ['Sourced', 'Enriched', 'Engaged', 'Meeting'];
type Card = { id: number; company: string; stage: number; value: number };

let nextId = 0;
const newCard = (stage = 0): Card => {
  const a = ACCOUNTS[nextId % ACCOUNTS.length];
  return { id: nextId++, company: a.company, stage, value: 8 + Math.floor(Math.random() * 40) };
};

/** Kanban that advances itself — cards glide from sourced to booked meeting. */
const PipelineBoard = () => {
  const [ref, visible] = useOnScreen<HTMLDivElement>();
  const [cards, setCards] = useState<Card[]>(() => [newCard(0), newCard(0), newCard(1), newCard(1), newCard(2), newCard(3)]);
  const [booked, setBooked] = useState(23);

  useTicker(() => {
    setCards((cs) => {
      let out = cs;
      const meeting = cs.filter((c) => c.stage === 3);
      if (meeting.length > 1) {
        out = cs.filter((c) => c.id !== meeting[0].id);
        setBooked((b) => b + 1);
      }
      const movable = out.filter((c) => c.stage < 3);
      if (movable.length) {
        const m = movable[Math.floor(Math.random() * movable.length)];
        out = out.map((c) => (c.id === m.id ? { ...c, stage: c.stage + 1 } : c));
      }
      if (out.filter((c) => c.stage === 0).length < 2) out = [...out, newCard(0)];
      return out;
    });
  }, 1100, visible);

  const pipeline = cards.reduce((n, c) => n + c.value, 0);

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>pipeline: ${pipeline}k open</span>
        <span className="text-[#d6b26a]">{booked} meetings this month</span>
      </div>
      <LayoutGroup>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
          {STAGES.map((s, si) => (
            <div key={s} className="flex flex-col rounded-xl border border-white/5 bg-black/25 p-2">
              <div className="mb-2 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.14em] text-white/40">
                <span>{s}</span>
                <span>{cards.filter((c) => c.stage === si).length}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {cards.filter((c) => c.stage === si).map((c) => (
                    <motion.div
                      key={c.id}
                      layout
                      layoutId={`card-${c.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      className={`rounded-lg border px-2 py-1.5 text-[11px] ${
                        si === 3 ? 'border-[#d6b26a]/40 bg-[#d6b26a]/10 text-[#f0d9a6]' : 'border-white/8 bg-white/[0.03] text-white/75'
                      }`}
                    >
                      <div className="truncate font-medium">{c.company}</div>
                      <div className="font-mono text-[10px] text-white/35">${c.value}k</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
};

export default PipelineBoard;
