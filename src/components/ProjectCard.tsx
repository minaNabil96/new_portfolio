"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden group hover:border-accent-purple/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)] flex flex-col h-full"
    >
      <div className={`aspect-video w-full relative ${gradient} flex items-center justify-center overflow-hidden`}>
        {image && (
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center gap-4">
          <a 
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-accent-purple text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-900/20"
          >
            {buttonText}
          </a>
          <a
             href={repoLink}
             target="_blank"
             rel="noopener noreferrer"
             className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:scale-110 transition-transform"
             aria-label="View Source Code"
          >
            <Github size={20} />
          </a>
        </div>
        
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-white/90">
            {category}
          </span>
        </div>

        <div className="p-8 border border-white/20 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500 max-w-[80%]">
          <h4 className="text-white font-black tracking-tight text-xl text-center drop-shadow-xl">{title}</h4>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-purple transition-colors leading-tight">{title}</h3>
        <p className="text-muted leading-relaxed mb-8 opacity-90 text-[15px]">
          {description}
        </p>
        
        <div className="mt-auto flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-muted/90 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
