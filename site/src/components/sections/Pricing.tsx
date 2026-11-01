import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Settings, Rocket, Link2, Layers, Check } from 'lucide-react';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      icon: Search,
      name: 'Clay Prospecting System Setup',
      price: '$2,500',
      priceNote: 'One-time project',
      description:
        'Complete Clay workspace with working waterfall enrichment, 500+ enriched prospects delivered ready for outreach.',
      features: [
        'Clay workspace configured from scratch',
        'Waterfall enrichment (3-5 data sources)',
        '500 prospects enriched and verified',
        'Basic HubSpot sync via Make.com',
        '1-hour training call',
      ],
    },
    {
      icon: Settings,
      name: 'HubSpot Workflow Rescue Package',
      price: '$3,000',
      priceNote: 'One-time project',
      description:
        'Fix or build 3 critical workflows: lead routing, deal automation, and form follow-up.',
      features: [
        'Lead assignment/routing automation',
        'Deal stage progression workflow',
        'Form submission follow-up sequence',
        'Task creation automation',
        'Complete documentation',
      ],
    },
    {
      icon: Rocket,
      name: 'Outbound Campaign Launcher',
      price: '$5,000',
      priceNote: 'One-time project',
      description:
        'End-to-end outbound setup: Clay lists → HubSpot sequences → Make.com automation.',
      features: [
        '2 complete outbound campaigns built',
        'Clay enrichment tables (1,000+ prospects)',
        'HubSpot email sequences written',
        'Make.com multi-touch workflows',
        'Performance tracking dashboard',
      ],
    },
    {
      icon: Link2,
      name: 'Integration Stack',
      price: '$4,000',
      priceNote: 'One-time project',
      description:
        'Connect all 3 tools seamlessly with bulletproof automation and error handling.',
      features: [
        'Clay → HubSpot data sync (Make.com orchestrated)',
        'Bi-directional contact updates',
        'Deal creation from enriched leads',
        'Error handling and monitoring',
        '30-day support',
      ],
    },
    {
      icon: Layers,
      name: 'Pipeline Generation System',
      price: '$7,500',
      priceNote: 'Fixed price',
      description:
        'Complete automated pipeline generation - the whole enchilada. Everything you need to generate meetings without hiring SDRs.',
      features: [
        'Everything from Products 1-4 PLUS:',
        '3 outbound campaigns',
        'AI-powered personalization (ChatGPT/Claude)',
        'Advanced Make.com workflows',
        '60-day optimization period',
        'Weekly check-ins',
      ],
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 hero-gradient relative overflow-hidden" ref={ref}>
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl text-chrome mb-4 leading-[1.05]">
            Products & Pricing.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Fixed-price products for every GTM automation need
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`metal-card spotlight p-8 flex flex-col ${product.featured ? 'gold-ring lg:col-span-1' : ''}`}
            >
              {product.featured && (
                <div className="eyebrow mb-6 w-fit !text-[#e8cf94] !border-[#d6b26a]/40">
                  MOST COMPREHENSIVE
                </div>
              )}

              <div className="w-12 h-12 rounded-xl border border-[#d6b26a]/25 bg-gradient-to-b from-[#d6b26a]/15 to-transparent flex items-center justify-center mb-6">
                <product.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
              <p className="font-display text-5xl text-gold mb-1">{product.price}</p>
              <p className="text-sm text-muted-foreground mb-4">{product.priceNote}</p>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">{product.description}</p>

              <div className="border-t border-border/30 pt-6">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                  What's Included:
                </p>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.a
                href="https://calendar.app.google/cg39LGy5K82i4qqA6"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 mt-auto ${product.featured ? 'btn-gold' : 'btn-metal'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Call
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground text-sm mt-12 max-w-2xl"
        >
          All products include implementation, training, and documentation. Need something custom?{' '}
          <a href="#contact" className="text-primary hover:underline">
            Contact us
          </a>{' '}
          for a tailored solution.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
