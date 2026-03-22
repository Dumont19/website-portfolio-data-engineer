'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', number: '01' },
  { name: 'Work', href: '#work', number: '02' },
  { name: 'Contact', href: '#contact', number: '03' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efeito para detectar scroll e ativar o "vidro"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* BARRA SUPERIOR (Desktop & Mobile Header) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-350 mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <a href="#" className="relative z-50 text-white font-medium tracking-tight text-lg group">
          </a>

          {/* DESKTOP MENU (Escondido no Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="text-[10px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    /{link.number}
                </span>
                {link.name}
              </a>
            ))}
          </div>

          {/* BOTÃO HAMBURGUER (Apenas Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 text-white p-1 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* OVERLAY MENU MOBILE (Tela Cheia) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-6 md:hidden"
          >
             {/* Textura de fundo sutil */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             
             {/* Links Gigantes */}
             <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                    className="group flex items-baseline gap-4 text-5xl font-medium text-neutral-500 hover:text-white transition-colors"
                  >
                    <span className="text-sm font-mono text-neutral-700 group-hover:text-neutral-500 transition-colors">
                        0{i + 1}
                    </span>
                    {link.name}
                  </motion.a>
                ))}
             </div>

             {/* Rodapé do Menu */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="absolute bottom-10 left-6 right-6 border-t border-white/10 pt-6 flex justify-between items-center"
             >
                <span className="text-xs font-mono text-neutral-600 uppercase">System Nav</span>
                <span className="text-xs font-mono text-neutral-600">Encrypted Connection</span>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}