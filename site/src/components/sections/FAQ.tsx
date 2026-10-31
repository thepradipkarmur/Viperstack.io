import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who is this for?',
      answer:
        "ViperStack is for B2B companies ($2M-$50M in revenue) who need outbound automation but don't have the technical resources to build it themselves. Our typical clients have a sales team of 3-20 reps and are looking to scale pipeline without hiring more SDRs or learning complex tools like Clay.",
    },
    {
      question: 'How long does implementation take?',
      answer:
        'Most products are delivered within 2-3 weeks. The Clay Prospecting System and HubSpot Workflow Rescue Package typically take 1-2 weeks. The full Pipeline Generation System takes 3-4 weeks for complete setup and optimization. We provide weekly updates throughout the process.',
    },
    {
      question: "What if we don't have HubSpot, Clay, or Make.com already?",
      answer:
        "No problem! We help you get set up with the right tools and accounts. We'll recommend which plans you need (and which you don't) to avoid overpaying. Our pricing does not include the tool subscriptions themselves - just our implementation and setup services.",
    },
    {
      question: 'Do you provide ongoing support after implementation?',
      answer:
        "Yes! Products 4 and 5 include 30-60 days of post-launch support. After that, we offer maintenance packages if you need ongoing help. However, our goal is to build systems that are robust and easy for your team to maintain, with full documentation and training provided.",
    },
    {
      question: 'Can you integrate with our existing tools (Salesforce, Apollo, etc.)?',
      answer:
        "Absolutely. We specialize in Make.com workflow automation, which can connect virtually any tool in your tech stack. If you're using Salesforce instead of HubSpot, or Apollo for prospecting, we can integrate everything seamlessly. Custom integrations are available in our higher-tier products.",
    },
    {
      question: 'What makes you different from other HubSpot or Clay agencies?',
      answer:
        "We're full-stack GTM developers, not tool-specific consultants. Most agencies specialize in just HubSpot or just Clay - we build complete integrated systems across all three tools (HubSpot, Clay, Make.com) plus AI integration. You get one team handling everything, not juggling multiple vendors. Plus, we focus on fixed-price products instead of open-ended retainers.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 hero-gradient relative overflow-hidden" ref={ref}>
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
            Frequently Asked Questions.
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-border/30 last:border-0"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
