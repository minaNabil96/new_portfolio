"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  category: string;
  buttonText: string;
  image?: string;
  demoLink?: string;
  repoLink?: string;
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectCard({
  title,
  description,
  tags,
  gradient,
  category,
  buttonText,
  image,
  demoLink = "#",
  repoLink = "#"
}: ProjectCardProps) {
  return (
    <TiltCard
      className="glass-card overflow-hidden group hover:border-accent-purple/40 transition-colors duration-500 hover:shadow-[0_0_50px_rgba(124,58,237,0.15)] flex flex-col h-full"
    >
      <div className={`aspect-video w-full relative ${gradient} flex items-center justify-center overflow-hidden`}>
        {image && (
          <motion.img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <motion.a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-accent-purple text-white rounded-full font-bold shadow-lg shadow-purple-900/20"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {buttonText}
          </motion.a>
          <motion.a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.4 }}
            aria-label="View Source Code"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </motion.a>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-white/90">
            {category}
          </span>
        </div>

        <motion.div
          className="p-8 border border-white/20 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl max-w-[80%]"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 0.9, opacity: 1 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h4 className="text-white font-black tracking-tight text-xl text-center drop-shadow-xl">{title}</h4>
        </motion.div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.h3
          className="text-2xl font-bold mb-4 leading-tight"
          initial={{ color: "#f2f2f2" }}
          whileHover={{ color: "#a78bfa" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <p className="text-muted leading-relaxed mb-8 opacity-90 text-[15px]">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2.5">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-muted/90 uppercase tracking-wider"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
