'use client';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

const projects = [
  {
    title: "Legacy Migration",
    client: "Telecom Giant",
    desc: "Migrated 5TB+ of critical data from on-prem Oracle to Snowflake. Reduced ETL latency by 60%.",
    tags: ["Snowflake", "Python", "Airflow"],
    color: "#0a0a0a" 
  },
  {
    title: "Real-time Streaming",
    client: "Fintech Core",
    desc: "Engineered a Kafka-Spark pipeline processing 50k transactions/sec with <200ms latency.",
    tags: ["Kafka", "Spark Streaming", "Scala"],
    color: "#121212" 
  },
  {
    title: "Data Lakehouse",
    client: "Retail Analytics",
    desc: "Built a self-healing Data Lakehouse on AWS S3 + Iceberg. Reduced storage costs by 40%.",
    tags: ["AWS", "Iceberg", "Terraform"],
    color: "#171717" 
  }
];

function ProjectCard({ project, i, progress, range, targetScale, totalProjects }: { 
    project: typeof projects[0], 
    i: number, 
    progress: MotionValue<number>, 
    range: number[], 
    targetScale: number,
    totalProjects: number
}) {
    const container = useRef(null);
    const scale = useTransform(progress, range, [1, targetScale]);
    
    const isLast = i === totalProjects - 1;

    return (
        <div ref={container} className="h-[80vh] flex items-start justify-center sticky top-32">
            <motion.div 
                style={{ scale, backgroundColor: project.color, top: `calc(-5% + ${i * 25}px)` }}
                className="relative flex flex-col w-full md:w-250 h-[60vh] md:h-[55vh] rounded-3xl border border-white/10 p-6 md:p-12 overflow-hidden shadow-2xl origin-top"
            >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div>
                         <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 block">
                            Project 0{i + 1}
                         </span>
                         <h3 className="text-2xl md:text-5xl font-medium text-white">{project.title}</h3>
                    </div>
                    <div className="hidden md:block">
                        <span className="px-4 py-2 border border-white/10 rounded-full text-xs text-neutral-400 uppercase">
                            {project.client}
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-end pb-12 md:pb-0"> 
                    <p className="text-base md:text-2xl text-neutral-300 font-light max-w-2xl mb-8 leading-relaxed">
                        {project.desc}
                    </p>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-white/10 pt-6 gap-6 md:gap-0 relative z-20">
                        
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-xs md:text-sm font-mono text-neutral-400 border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        
                        <a href="#" className="group flex items-center gap-2 text-white hover:text-neutral-400 transition-colors self-start md:self-auto">
                            <span className="text-sm font-medium">View Case Study</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

                {!isLast && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
                    >
                        <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                            Scroll_Next
                        </span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowDown className="w-4 h-4 text-neutral-500" />
                        </motion.div>
                    </motion.div>
                )}

                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
                     <svg width="100%" height="100%">
                        <pattern id={`grid-${i}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                     </svg>
                </div>
            </motion.div>
        </div>
    )
}

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="work" className="bg-black relative py-24">
      
    <div className="max-w-350 mx-auto px-6 md:px-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-32"
          >
            Selected Works (2024 - 2026)
          </motion.h2>
      </div>

      <div className="flex flex-col gap-10">
        {projects.map((project, i) => {
            const targetScale = 1 - ( (projects.length - i) * 0.05 );
            return (
                <ProjectCard 
                    key={i} 
                    i={i} 
                    project={project} 
                    progress={scrollYProgress}
                    range={[i * 0.25, 1]}
                    targetScale={targetScale}
                    totalProjects={projects.length}
                />
            );
        })}
      </div>
    </section>
  );
}