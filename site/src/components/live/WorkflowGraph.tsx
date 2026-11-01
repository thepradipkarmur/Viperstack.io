import { useState } from 'react';
import { useOnScreen, useTicker } from './hooks';

const NODES = [
  { id: 'form', x: 40, y: 120, label: 'Trigger', sub: 'signal' },
  { id: 'clay', x: 160, y: 60, label: 'Clay', sub: 'enrich' },
  { id: 'ai', x: 160, y: 180, label: 'AI', sub: 'score' },
  { id: 'router', x: 280, y: 120, label: 'Router', sub: 'ICP≥80' },
  { id: 'crm', x: 400, y: 60, label: 'HubSpot', sub: 'deal' },
  { id: 'slack', x: 400, y: 180, label: 'Slack', sub: 'alert' },
];
const EDGES: [string, string][] = [
  ['form', 'clay'], ['form', 'ai'], ['clay', 'router'], ['ai', 'router'], ['router', 'crm'], ['router', 'slack'],
];
const ORDER = [['form'], ['clay', 'ai'], ['router'], ['crm', 'slack']];

const node = (id: string) => NODES.find((n) => n.id === id)!;
const path = (a: string, b: string) => {
  const p = node(a), q = node(b);
  const mx = (p.x + q.x) / 2;
  return `M${p.x + 34},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x - 34},${q.y}`;
};

/** Make.com-style scenario: data pulses travel the edges, nodes light up as they fire. */
const WorkflowGraph = () => {
  const [ref, visible] = useOnScreen<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [runs, setRuns] = useState(4812);
  useTicker(() => {
    setStep((s) => {
      const n = (s + 1) % (ORDER.length + 1);
      if (n === 0) setRuns((r) => r + 1);
      return n;
    });
  }, 650, visible);
  const active = new Set(ORDER[step] ?? []);

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>scenario: inbound → pipeline</span>
        <span className="text-[#d6b26a]">run #{runs.toLocaleString()}</span>
      </div>
      <svg viewBox="0 0 440 240" className="w-full flex-1">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0" stopColor="#d6b26a" stopOpacity=".1" />
            <stop offset=".5" stopColor="#d6b26a" stopOpacity=".55" />
            <stop offset="1" stopColor="#d6b26a" stopOpacity=".1" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        {EDGES.map(([a, b], i) => (
          <g key={a + b}>
            <path d={path(a, b)} fill="none" stroke="url(#edge)" strokeWidth="1.2" />
            <path d={path(a, b)} fill="none" stroke="#f0d58f" strokeWidth="1.2" strokeDasharray="2 10" opacity=".5">
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
            </path>
            {visible && (
              <circle r="3" fill="#f6e3ad" filter="url(#glow)">
                <animateMotion dur="2.6s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={path(a, b)} />
              </circle>
            )}
          </g>
        ))}
        {NODES.map((n) => {
          const on = active.has(n.id);
          return (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
              <circle r="30" fill={on ? 'rgba(214,178,106,.16)' : 'rgba(255,255,255,.02)'} style={{ transition: 'fill .3s' }} />
              <circle r="30" fill="none" stroke={on ? '#d6b26a' : 'rgba(255,255,255,.14)'} strokeWidth="1" style={{ transition: 'stroke .3s' }} />
              {on && <circle r="30" fill="none" stroke="#d6b26a" strokeWidth="1" opacity=".6">
                <animate attributeName="r" from="30" to="44" dur=".7s" />
                <animate attributeName="opacity" from=".6" to="0" dur=".7s" />
              </circle>}
              <text textAnchor="middle" y="-2" fontSize="11" fill={on ? '#f6e7b8' : '#e7e5e0'} fontFamily="Geist, sans-serif" fontWeight="600">{n.label}</text>
              <text textAnchor="middle" y="12" fontSize="8" fill="rgba(255,255,255,.4)" fontFamily="Geist Mono, monospace">{n.sub}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WorkflowGraph;
