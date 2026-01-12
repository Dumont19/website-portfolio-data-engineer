'use client';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

const stack = [
  'Python', 'Snowflake', 'Spark', 'AWS Glue', 'Airflow', 'Kafka', 'Terraform', 'dbt', 'Docker', 'Kubernetes'
];

export default function About() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start end', 'end start'] 
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  const handleMouseEnter = () => {
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
    }
    mouseX.set(0); mouseY.set(0);
  };

  return (
    <section ref={ref} id="about" className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-350 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
            onMouseMove={handleMouseMove} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }} 
            className="relative group perspective-1000 flex justify-center lg:justify-start"
        >
          <motion.div 
            style={{ 
                rotateX: useTransform(mouseY, [-0.5, 0.5], [7, -7]), 
                rotateY: useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
                aspectRatio: '4/5'
            }} 
            className="relative w-full max-w-125 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-white/5"
          >
            <video 
                ref={videoRef}
                key="profile-video-v2"
                src="/profile.mp4"
                autoPlay 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-black/90 via-transparent to-transparent pointer-events-none">
              <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest animate-pulse">
                      ● REC
                  </span>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full backdrop-blur-md">
                      [ Signal_Active ]
                  </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* COLUNA DE TEXTO */}
        <div className="relative z-10">
          <motion.div style={{ y }}>
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tighter mb-6 leading-none">
                Architecting <br /> <span className="text-neutral-500">the invisible.</span>
            </h2>

            <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed mb-10 max-w-lg">
                Data isn&apos;t just rows and columns; it&apos;s the kinetic energy of a business. I build the engines that capture, refine, and propel that energy forward.
            </p>

            <div className="border-t border-white/10 pt-8">
              <span className="block text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">
                  Core_Architecture_Stack
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {stack.map((tech, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.05, duration: 0.5 }} 
                    className="text-sm text-white/80 hover:text-white cursor-crosshair transition-colors"
                  >
                    {tech} <span className="text-neutral-700 ml-3">/</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}