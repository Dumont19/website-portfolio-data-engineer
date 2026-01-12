'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/matheus-dumont-282673287/" },
    { name: "GitHub", icon: <Github size={24} />, href: "https://github.com/Dumont19" },
    { name: "Email", icon: <Mail size={24} />, href: "mailto:hunterdatatech@gmail.com" }
  ];

  return (
    <section id="contact" className="relative min-h-[80vh] bg-black flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 overflow-hidden border-t border-white/5">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-1400px mx-auto w-full relative z-10 flex flex-col justify-center flex-1">
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8 block">{`// Initialize_Connection`}</span>
            
            <h2 className="text-4xl md:text-6xl font-medium text-white mb-16 max-w-4xl leading-tight">
                Ready to transform your <br/>
                <span className="text-neutral-500">raw data into business value?</span>
            </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-16">
            {socialLinks.map((social, i) => (
                <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
                >
                    <span className="p-4 bg-white/5 rounded-full border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        {social.icon}
                    </span>
                    <span className="text-xl font-medium tracking-tight">{social.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                </motion.a>
            ))}
        </div>

      </div>

      <div className="w-full max-w-1400px mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-6 text-xs font-mono text-neutral-600">
         
         <div className="flex flex-col gap-1">
            <span>© 2026 Matheus Dumont</span>
            <span>Data Engineering & Architecture</span>
         </div>

         <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-8 w-full md:w-auto">
            
            <div className="flex flex-col items-start md:items-end">
                <span className="uppercase tracking-widest mb-1">Location</span>
                <span className="text-neutral-400">Brazil</span>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
                <span className="uppercase tracking-widest mb-1">Status</span>
                <span className="flex items-center gap-2 text-green-500">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Open for offers
                </span>
            </div>
         </div>

      </div>
    </section>
  );
}