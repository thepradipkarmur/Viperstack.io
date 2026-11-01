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
  const navItems = [{
    label: 'Home',
    href: '#'
  }, {
    label: 'Live',
    href: '#live'
  }, {
    label: 'Products',
    href: '#pricing'
  }, {
    label: 'About',
    href: '#about'
  }, {
    label: 'Contact',
    href: '#contact'
  }];
  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <>
      <motion.header initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.5
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-blur' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a href="#" onClick={e => {
            e.preventDefault();
            scrollToSection('#');
          }} className="flex items-center gap-2" whileHover={{
            scale: 1.02
          }}>
              <img src="/viperstack-logo.png" alt="ViperStack logo" width={36} height={36} className="w-9 h-9 rounded-full ring-1 ring-[#d6b26a]/30 shadow-[0_0_20px_rgba(214,178,106,0.25)]" />
              <span className="font-display text-2xl tracking-tight text-chrome">ViperStack</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => <a key={item.label} href={item.href} onClick={e => {
              e.preventDefault();
              scrollToSection(item.href);
            }} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {item.label}
                </a>)}
              <motion.a href="#contact" onClick={e => {
              e.preventDefault();
              scrollToSection('#contact');
            }} className="btn-gold px-5 py-2.5 text-sm" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>Book a meeting </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        x: '100%'
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: '100%'
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 z-40 bg-background md:hidden">
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => <motion.a key={item.label} href={item.href} onClick={e => {
            e.preventDefault();
            scrollToSection(item.href);
          }} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className="font-display text-4xl text-foreground hover:text-gold transition-colors">
                  {item.label}
                </motion.a>)}
              <motion.a href="#contact" onClick={e => {
            e.preventDefault();
            scrollToSection('#contact');
          }} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="btn-gold px-7 py-3 mt-4">
                Schedule a Call
              </motion.a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default Header;