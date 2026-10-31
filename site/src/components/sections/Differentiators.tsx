import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Workflow, Brain, CheckCircle, ArrowRight } from 'lucide-react';

const Differentiators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    {
      icon: Code,
      title: 'Full-Stack GTM Development',
      description:
        "We don't just implement one tool - we architect and build your complete GTM infrastructure. HubSpot, Clay, Make.com, and AI - fully integrated.",
    },
    {
      icon: Workflow,
      title: 'Make.com Workflow Orchestration',
      description:
        'While others struggle with buggy native integrations, we use Make.com to orchestrate bulletproof automation that connects everything seamlessly.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description:
        'We integrate ChatGPT and Claude for hyper-personalized outreach at scale. Every message feels human-written, not template-based.',
    },
    {
      icon: CheckCircle,
      title: '100% Done-For-You',
      description:
        "You don't need to learn Clay or build workflows. We handle everything - you just wake up to qualified prospects in your CRM ready to contact.",
    },
  ];

  return (
    <section id="about" className="py-24 hero-gradient relative overflow-hidden" ref={ref}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why ViperStack?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Full-stack GTM developers, not just tool implementers
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 group transition-all hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
