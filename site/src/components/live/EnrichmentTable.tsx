import { useState } from 'react';
import { motion } from 'framer-motion';
import { ACCOUNTS, useOnScreen, useTicker } from './hooks';

const PROVIDERS = ['Apollo', 'Hunter', 'Prospeo', 'Findymail'];

type Row = { acc: (typeof ACCOUNTS)[number]; stage: number; provider: number; hit: number; score: number };

const makeBatch = (offset: number): Row[] =>
  Array.from({ length: 5 }, (_, i) => ({
    acc: ACCOUNTS[(offset + i) % ACCOUNTS.length],
    stage: 0, // 0 queued · 1 contact · 2 waterfall · 3 email · 4 score
    provider: 0,
    hit: 1 + Math.floor(Math.random() * 3),
    score: 72 + Math.floor(Math.random() * 27),
  }));

/** Clay-style waterfall enrichment table that fills itself in, cell by cell. */
const EnrichmentTable = () => {
  const [ref, visible] = useOnScreen<HTMLDivElement>();
  const [offset, setOffset] = useState(0);
  const [rows, setRows] = useState(() => makeBatch(0));
  const [pause, setPause] = useState(0);

  useTicker(() => {
    if (pause > 0) {
      setPause((p) => p - 1);
      if (pause === 1) {
        const o = offset + 5;
        setOffset(o);
        setRows(makeBatch(o));
      }
      return;
    }
    setRows((rs) => {
      const i = rs.findIndex((r) => r.stage < 4);
      if (i === -1) {
        setPause(6);
        return rs;
      }
      return rs.map((r, j) => {
        if (j !== i) return r;
        if (r.stage === 2 && r.provider < r.hit) return { ...r, provider: r.provider + 1 };
        return { ...r, stage: r.stage + 1 };
      });
    });
  }, 260, visible);

  const done = rows.filter((r) => r.stage === 4).length;

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span className="truncate">table: icp_accounts</span>
        <span className="ml-2 shrink-0 text-[#d6b26a]">{done}/5 enriched</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/5">
        <div className="grid grid-cols-[1.1fr_1.6fr_0.8fr] sm:grid-cols-[1.3fr_1.1fr_1.5fr_0.9fr] gap-px bg-white/5 font-mono text-[10px] uppercase tracking-wider text-white/40">
          {['Company', 'Contact', 'Work email', 'ICP'].map((h) => (
            <div key={h} className={`bg-[#0c0c0e] px-3 py-2 ${h === 'Contact' ? 'hidden sm:block' : ''}`}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.acc.domain + offset}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-[1.1fr_1.6fr_0.8fr] sm:grid-cols-[1.3fr_1.1fr_1.5fr_0.9fr] gap-px border-t border-white/5 bg-white/5 text-[12px]"
          >
            <div className="truncate bg-[#0a0a0c] px-3 py-2.5 text-white/85">{r.acc.company}</div>
            <div className="hidden truncate bg-[#0a0a0c] px-3 py-2.5 sm:block">
              {r.stage >= 1 ? <span className="text-white/70">{r.acc.name}</span> : <span className="shimmer block h-3 w-20 rounded" />}
            </div>
            <div className="truncate bg-[#0a0a0c] px-3 py-2.5 font-mono text-[11px]">
              {r.stage < 2 && <span className="shimmer block h-3 w-28 rounded" />}
              {r.stage === 2 && (
                <span className="text-white/45">
                  {PROVIDERS.slice(0, r.provider + 1).map((p, k) => (
                    <span key={p} className={k < r.provider ? 'line-through opacity-50' : 'text-[#e8cf94]'}>
                      {p}{k < r.provider ? ' → ' : '…'}
                    </span>
                  ))}
                </span>
              )}
              {r.stage >= 3 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80">
                  {r.acc.name.split(' ')[0].toLowerCase()}@{r.acc.domain}
                  <span className="ml-1.5 text-[#d6b26a]">✓</span>
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-[#0a0a0c] px-3 py-2.5">
              <div className="hidden h-1 flex-1 sm:block overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#8b6a2c] to-[#f0d58f]"
                  initial={{ width: 0 }}
                  animate={{ width: r.stage >= 4 ? `${r.score}%` : 0 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="w-6 font-mono text-[11px] text-white/60">{r.stage >= 4 ? r.score : '··'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnrichmentTable;
