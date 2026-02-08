"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Cpu, Globe, Database, Cloud, Terminal, GitBranch } from "lucide-react";

export default function About() {
  const t = useTranslations("About");

  const skills = [
    { name: "PyTorch / TensorFlow", icon: <Cpu className="w-5 h-5 text-accent-purple" /> },
    { name: "Next.js / React", icon: <Globe className="w-5 h-5 text-accent-purple" /> },
    { name: "PostgreSQL / MongoDB", icon: <Database className="w-5 h-5 text-accent-purple" /> },
    { name: "AWS / GCP / Docker", icon: <Cloud className="w-5 h-5 text-accent-purple" /> },
    { name: "Python / TypeScript", icon: <Terminal className="w-5 h-5 text-accent-purple" /> },
    { name: "MLOps / CI/CD", icon: <GitBranch className="w-5 h-5 text-accent-purple" /> },
  ];

  return (
    <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-12 gradient-text">
          {t("title")}
        </h2>
        <p className="text-xl text-muted/80 leading-relaxed mb-16">
          {t("description")}
        </p>

        <h3 className="text-xl font-bold mb-10 text-white tracking-widest uppercase">
          {t("techStack")}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-2xl">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex flex-col items-center gap-3 hover:bg-white/5 transition-colors border-white/5"
            >
              <div className="w-12 h-12 bg-accent-purple/20 border border-accent-purple/30 rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/30 transition-all shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                {skill.icon}
              </div>
              <span className="text-[13px] font-bold text-white/90 tracking-wide uppercase">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
