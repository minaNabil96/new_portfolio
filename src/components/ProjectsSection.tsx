"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { getAllProjects, Project } from "@/lib/projects";

const filters = ["all", "ML / AI", "Full Stack"] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const tProjects = useTranslations("Projects");
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>("all");

  const allProjects = useMemo(() => getAllProjects(), []);

  const projects = useMemo(() => {
    const transformed = allProjects.map((project: Project) => ({
      title: tProjects(project.titleKey),
      description: tProjects(project.descriptionKey),
      tags: project.tags,
      gradient: project.gradient,
      category: project.category,
      image: project.image,
      demoLink: project.demoLink,
      repoLink: project.repoLink,
      buttonText: project.buttonText || "View Project"
    }));

    if (activeFilter === "all") return transformed;
    return transformed.filter((p) => p.category === activeFilter);
  }, [activeFilter, tProjects, allProjects]);

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length };
    for (const p of allProjects) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allProjects]);

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
          {t("title")}
        </h2>
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex justify-center mb-16"
      >
        <div className="inline-flex glass-nav p-1 rounded-2xl">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            const count = filterCounts[filter] ?? 0;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {filter === "all" ? "All" : filter}
                <span className="ml-1.5 text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Project cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-lg text-muted">No projects found for this category.</p>
        </motion.div>
      )}
    </section>
  );
}
