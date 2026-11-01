import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import EnrichmentTable from '@/components/live/EnrichmentTable';
import WorkflowGraph from '@/components/live/WorkflowGraph';
import AIComposer from '@/components/live/AIComposer';
import PipelineBoard from '@/components/live/PipelineBoard';

const Panel = ({ n, title, tool, children, className = '' }: { n: string; title: string; tool: string; children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`metal-card spotlight flex flex-col p-5 sm:p-6 ${className}`}
  >
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <div className="mb-1 font-mono text-[11px] text-[#d6b26a]">{n} — {tool}</div>
        <h3 className="text-lg text-foreground">{title}</h3>
      </div>
      <span className="flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
        <span className="live-dot" /> live
      </span>
    </div>
    <div className="min-h-[260px] flex-1">{children}</div>
  </motion.div>
);

const LiveSystems = () => (
  <section id="live" className="hero-gradient relative overflow-hidden py-28">
    <div className="hairline absolute inset-x-0 top-0" />
    <div className="container relative z-10 mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 max-w-3xl"
      >
        <div className="eyebrow mb-6"><span className="live-dot" /> Running right now</div>
        <h2 className="mb-5 text-5xl leading-[1.02] text-chrome md:text-7xl">
          Systems that work <em className="text-gold">while you sleep.</em>
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          These aren&apos;t screenshots. Each panel is a live simulation of the infrastructure we ship —
          enrichment, orchestration, AI writing and pipeline, moving in real time.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-12">
        <Panel n="01" tool="Clay" title="Waterfall enrichment" className="lg:col-span-7">
          <EnrichmentTable />
        </Panel>
        <Panel n="02" tool="Make.com" title="Workflow orchestration" className="lg:col-span-5">
          <WorkflowGraph />
        </Panel>
        <Panel n="03" tool="Claude / GPT" title="Signal-based personalisation" className="lg:col-span-5">
          <AIComposer />
        </Panel>
        <Panel n="04" tool="HubSpot" title="Self-moving pipeline" className="lg:col-span-7">
          <PipelineBoard />
        </Panel>
      </div>
      <p className="mt-6 font-mono text-[11px] text-white/30">Simulated data · fictional companies · for illustration</p>
    </div>
  </section>
);

export default LiveSystems;
