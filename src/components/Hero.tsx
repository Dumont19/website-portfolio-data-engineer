'use client';
import { motion, AnimatePresence, useScroll, useTransform, type Easing } from 'framer-motion';
import { useState, useEffect } from 'react';
import DataSphere from './DataSphere';

const SLOW_EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: SLOW_EASE }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    }
  }
};

export default function Hero() {
  const [isIntro, setIsIntro] = useState(true);
  const { scrollY } = useScroll();
  const sphereOpacity = useTransform(scrollY, [0, 900], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      
      <motion.div
        className={`
            fixed inset-0
            transition-opacity duration-2000
            ${isIntro ? 'z-100' : 'z-0 pointer-events-none'}
        `}
        style={{ opacity: sphereOpacity }}
      >
          <div className="absolute inset-0 bg-black -z-10" />
          <DataSphere isIntro={isIntro} />
      </motion.div>
      
      
      <AnimatePresence>
        {isIntro && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
                className="fixed inset-0 z-101 flex flex-col items-center justify-end pb-48 pointer-events-none"
            >
                <span className="text-[10px] md:text-xs font-mono text-neutral-500 uppercase tracking-[0.4em] animate-pulse">
                   Loading Data
                </span>
            </motion.div>
        )}
      </AnimatePresence>
    
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pointer-events-none">
        <div className="container mx-auto">
            <motion.div 
                className="w-full lg:w-1/2 pointer-events-auto mt-10 lg:mt-0" 
                variants={staggerContainer}
                initial="hidden"
                animate={!isIntro ? "show" : "hidden"} 
            >
                <motion.p variants={fadeInUp} className="font-mono text-xs text-secondary/60 mb-6 tracking-wider ml-1">
                    {'>'} connection_established
                </motion.p>

                <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-medium tracking-tighter leading-none text-white mb-4">
                    Matheus<br />Dumont<span className="text-secondary/40">.</span>
                </motion.h1>
                
                <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary/80 tracking-tight mb-8">
                    Data Engineer & Architect
                </motion.h2>
                
                <motion.p variants={fadeInUp} className="text-base md:text-lg text-secondary max-w-md leading-relaxed font-light">
                    Building the invisible infrastructure that powers modern business. 
                    From chaos to clarity.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="mt-10 md:mt-12 flex flex-wrap gap-4">
                    <a href="#work" className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105">
                        See my work
                    </a>
                    <a href="#contact" className="group px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white hover:text-black">
                        Let&apos;s connect
                    </a>
                </motion.div>
            </motion.div>
        </div>
      </div>

    </section>
  );
}