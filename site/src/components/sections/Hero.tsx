import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tools = [
    { 
      name: 'HubSpot', 
      description: 'Certified partner and experts in sales, marketing and service hubs for pro and enterprise levels.',
      color: '#FF7A59',
      icon: (
        <svg viewBox="0 0 512 512" className="w-10 h-10" fill="#FF7A59">
          <path d="M267.4 211.6c-25.1 23.7-40.8 57.3-40.8 94.6 0 37.3 15.7 70.9 40.8 94.6l-20.8 20.8c-32.1-30.4-52.2-73.5-52.2-121.4s20.1-91 52.2-121.4l20.8 20.8zm-61.3 94.6c0-49.2 24.4-92.7 61.7-119.1l-20.8-20.8c-45.5 33.5-75.1 87.5-75.1 147.8s29.6 114.3 75.1 147.8l20.8-20.8c-37.3-26.4-61.7-69.9-61.7-119.1v-15.8zm183.8-119.1c37.3 26.4 61.7 69.9 61.7 119.1s-24.4 92.7-61.7 119.1l20.8 20.8c45.5-33.5 75.1-87.5 75.1-147.8s-29.6-114.3-75.1-147.8l-20.8 20.8zm61.3 119.1c0-37.3-15.7-70.9-40.8-94.6l20.8-20.8c32.1 30.4 52.2 73.5 52.2 121.4s-20.1 91-52.2 121.4l-20.8-20.8c25.1-23.7 40.8-57.3 40.8-94.6zM256 306.2c27.6 0 50-22.4 50-50s-22.4-50-50-50-50 22.4-50 50 22.4 50 50 50z"/>
        </svg>
      )
    },
    { 
      name: 'Clay', 
      description: 'Power users since 2022. Unlock the best in class GTM tool for your sales and marketing teams.',
      color: '#3B82F6',
      icon: (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 via-orange-400 to-yellow-400 flex items-center justify-center">
          <div className="w-6 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-full" />
        </div>
      )
    },
    { 
      name: 'Make.com', 
      description: 'Advanced workflow automation experts. We build bulletproof integrations that scale with your business.',
      color: '#6366F1',
      icon: (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
            <circle cx="6" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="18" cy="12" r="2" />
            <path d="M8 12h2M14 12h2" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      )
    },
  ];

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Floating geometric squares */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-32 right-20 w-24 h-24 border border-white/10 rounded-lg"
        />
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-48 right-40 w-16 h-16 border border-white/10 rounded-lg"
        />
        <motion.div
          animate={{ y: [0, -8, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-20 left-10 w-12 h-12 border border-white/10 rounded-lg"
        />
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-60 left-20 w-20 h-20 border border-white/10 rounded-lg"
        />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        {/* Left-aligned content */}
        <div className="max-w-4xl">
          {/* Primary Headline - Large serif-style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight"
          >
            AI Stack for Modern GTM.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            We build complete automated outbound systems using HubSpot, Clay, and Make.com—from data enrichment to pipeline generation.
          </motion.p>

          {/* CTA Button - Teal/Green style like reference */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <motion.a
              href="https://calendar.app.google/cg39LGy5K82i4qqA6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-success hover:bg-success/90 text-white font-medium text-lg px-8 py-4 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.a>
          </motion.div>
        </div>

        {/* Tool Cards - Revamped style matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 cursor-pointer group transition-all hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-6">
                {tool.icon}
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{tool.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
