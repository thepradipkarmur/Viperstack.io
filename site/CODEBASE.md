# ViperStack Website - Complete Codebase

This document contains the complete source code for the ViperStack website.

---

## Table of Contents

1. [Configuration Files](#configuration-files)
2. [Entry Point Files](#entry-point-files)
3. [Pages](#pages)
4. [Layout Components](#layout-components)
5. [Section Components](#section-components)
6. [Utility Components](#utility-components)
7. [Styles](#styles)

---

## Configuration Files

### index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ViperStack | Full-Stack GTM Automation Development</title>
    <meta name="description" content="We build complete automated outbound systems using HubSpot, Clay, and Make.com. Fixed-price products from $2,500 to $7,500." />
    <meta name="author" content="ViperStack" />
    <meta name="keywords" content="GTM automation, HubSpot development, Clay implementation, Make.com workflows, outbound automation" />

    <meta property="og:title" content="ViperStack | AI Stack for Modern GTM" />
    <meta property="og:description" content="Full-stack GTM automation development - we build, integrate, and optimize complete automated outbound systems." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ViperStack" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <link rel="canonical" href="https://viperstack.ai" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ViperStack Custom Colors
        navy: {
          DEFAULT: "hsl(var(--navy))",
          light: "hsl(var(--navy-light))",
        },
        cyan: {
          DEFAULT: "hsl(var(--cyan))",
          dark: "hsl(var(--cyan-dark))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
          light: "hsl(var(--purple-light))",
        },
        gray: {
          light: "hsl(var(--gray-light))",
          soft: "hsl(var(--gray-soft))",
          mid: "hsl(var(--gray-mid))",
        },
        success: "hsl(var(--success))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 217, 255, 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## Entry Point Files

### src/main.tsx

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

### src/App.tsx

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

## Pages

### src/pages/Index.tsx

```tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Differentiators from '@/components/sections/Differentiators';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Differentiators />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
```

### src/pages/NotFound.tsx

```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
```

---

## Layout Components

### src/components/layout/Header.tsx

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'nav-blur' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#');
              }}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">ViperStack</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <motion.a
                href="https://calendar.app.google/cg39LGy5K82i4qqA6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Call
              </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="https://calendar.app.google/cg39LGy5K82i4qqA6"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="btn-primary mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
```

### src/components/layout/Footer.tsx

```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const technologies = ['HubSpot', 'Clay', 'Make.com', 'AI Integration'];

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-border/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Branding */}
          <div>
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#');
              }}
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">ViperStack</span>
            </motion.a>
            <p className="text-sm text-primary mb-2">AI Stack for Modern GTM</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-stack GTM automation for B2B companies
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pradip@viperstack.ai"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  pradip@viperstack.ai
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pradipkarmur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Technologies
            </h4>
            <ul className="space-y-3">
              {technologies.map((tech) => (
                <li key={tech} className="text-muted-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ViperStack. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

## Section Components

### src/components/sections/Hero.tsx

```tsx
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
```

### src/components/sections/Differentiators.tsx

```tsx
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
```

### src/components/sections/Pricing.tsx

```tsx
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
              className={`bg-card/80 backdrop-blur-sm border rounded-2xl p-8 flex flex-col ${
                product.featured ? 'border-accent' : 'border-border/50'
              }`}
            >
              {product.featured && (
                <div className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-6 w-fit">
                  MOST COMPREHENSIVE
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <product.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
              <p className="text-4xl font-bold text-primary mb-1">{product.price}</p>
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
                className={`w-full text-center font-semibold py-3 rounded-lg transition-all duration-200 mt-auto ${
                  product.featured
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-success text-white hover:bg-success/90'
                }`}
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
```

### src/components/sections/FAQ.tsx

```tsx
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
```

### src/components/sections/Contact.tsx

```tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a7d6a111-2cbe-404c-a3c5-c8b3970e25d7',
          name: formData.firstName,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.firstName}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ firstName: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 hero-gradient relative overflow-hidden" ref={ref}>
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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact us.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We'd love to hear from you!
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:pradip@viperstack.ai"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span>pradip@viperstack.ai</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/pradipkarmur/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://calendar.app.google/cg39LGy5K82i4qqA6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-success hover:bg-success/90 text-white font-medium text-lg px-8 py-4 rounded-lg transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.a>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  First Name<span className="text-destructive">*</span>
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-card/50 border-border/50 focus:border-primary h-12"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email<span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-card/50 border-border/50 focus:border-primary h-12"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message<span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-card/50 border-border/50 focus:border-primary min-h-[120px] resize-none"
                  placeholder=""
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-success hover:bg-success/90 text-white px-8 py-3 h-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

---

## Utility Components

### src/components/NavLink.tsx

```tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
```

### src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Styles

### src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ViperStack Design System */
    --background: 220 30% 6%;
    --foreground: 210 40% 98%;

    --card: 220 30% 8%;
    --card-foreground: 210 40% 98%;

    --popover: 220 30% 8%;
    --popover-foreground: 210 40% 98%;

    /* Primary - Electric Blue/Cyan */
    --primary: 187 100% 50%;
    --primary-foreground: 220 30% 6%;

    /* Secondary - Navy */
    --secondary: 220 60% 12%;
    --secondary-foreground: 210 40% 98%;

    /* Accent - Vibrant Purple */
    --accent: 263 70% 58%;
    --accent-foreground: 210 40% 98%;

    --muted: 220 30% 15%;
    --muted-foreground: 220 15% 60%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 220 30% 18%;
    --input: 220 30% 18%;
    --ring: 187 100% 50%;

    --radius: 0.75rem;

    /* Custom ViperStack Colors */
    --navy: 220 60% 8%;
    --navy-light: 220 40% 12%;
    --cyan: 187 100% 50%;
    --cyan-dark: 187 100% 42%;
    --purple: 263 70% 58%;
    --purple-light: 263 70% 65%;
    --gray-light: 210 20% 98%;
    --gray-soft: 210 20% 93%;
    --gray-mid: 215 15% 47%;
    --success: 160 84% 39%;

    /* Gradients */
    --gradient-hero: linear-gradient(135deg, hsl(220 60% 8%) 0%, hsl(220 40% 14%) 100%);
    --gradient-text: linear-gradient(135deg, hsl(187 100% 50%) 0%, hsl(263 70% 58%) 100%);
    --gradient-card: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);

    /* Shadows */
    --shadow-glow: 0 0 40px rgba(0, 217, 255, 0.15);
    --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.3);
    --shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .light {
    --background: 210 20% 98%;
    --foreground: 220 60% 8%;
    --card: 0 0% 100%;
    --card-foreground: 220 60% 8%;
    --muted: 210 20% 93%;
    --muted-foreground: 215 15% 47%;
    --border: 214 32% 91%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 700;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
}

@layer components {
  .gradient-text {
    background: linear-gradient(135deg, hsl(var(--cyan)) 0%, hsl(var(--purple)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .glass-card-light {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid hsl(var(--border));
  }

  .hero-gradient {
    background: linear-gradient(135deg, hsl(220 60% 8%) 0%, hsl(220 40% 14%) 100%);
  }

  .section-light {
    background: hsl(var(--gray-light));
  }

  .glow-effect {
    box-shadow: 0 0 40px rgba(0, 217, 255, 0.2);
  }

  .nav-blur {
    background: rgba(10, 22, 40, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .feature-card {
    @apply bg-white rounded-xl p-8 border-2 border-gray-100 transition-all duration-300;
  }

  .feature-card:hover {
    @apply border-primary shadow-lg;
    transform: translateY(-4px);
  }

  .pricing-card {
    @apply bg-white rounded-xl p-8 border-2 border-gray-100 shadow-lg transition-all duration-300;
  }

  .pricing-card:hover {
    @apply border-primary;
    transform: translateY(-4px);
  }

  .pricing-card-featured {
    @apply border-accent shadow-xl;
    box-shadow: 0 6px 24px rgba(139, 92, 246, 0.2);
  }

  .btn-primary {
    @apply bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-200;
  }

  .btn-primary:hover {
    background: hsl(var(--cyan-dark));
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 217, 255, 0.3);
  }

  .btn-outline {
    @apply border-2 border-primary text-primary font-semibold px-6 py-3 rounded-lg transition-all duration-200 bg-transparent;
  }

  .btn-outline:hover {
    @apply bg-primary text-primary-foreground;
  }

  .network-pattern {
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
    background-size: 40px 40px;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

---

## Dependencies (package.json)

The project uses the following main dependencies:

- **React** ^18.3.1
- **React DOM** ^18.3.1
- **React Router DOM** ^6.30.1
- **Framer Motion** ^12.26.2
- **TanStack React Query** ^5.83.0
- **Tailwind CSS** (via tailwindcss-animate ^1.0.7)
- **Lucide React** ^0.462.0 (icons)
- **Radix UI** components (accordion, dialog, dropdown-menu, etc.)
- **Class Variance Authority** ^0.7.1
- **clsx** ^2.1.1
- **tailwind-merge** ^2.6.0
- **Sonner** ^1.7.4 (toast notifications)
- **React Hook Form** ^7.61.1
- **Zod** ^3.25.76 (validation)

---

*Generated on 2026-01-14*
