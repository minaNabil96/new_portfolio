"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Languages, Briefcase, GraduationCap, Cpu, Server, Code2, GitBranch, Terminal, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function About() {
  const t = useTranslations("About");

  const skills = [
    { label: t("skillAI"), icon: Cpu },
    { label: t("skillBackend"), icon: Server },
    { label: t("skillFrontend"), icon: Code2 },
    { label: t("skillInfra"), icon: GitBranch },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-accent-purple/20 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-t from-accent-purple/20 to-transparent" />
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black mb-16 gradient-text text-center"
        >
          {t("title")}
        </motion.h2>

        {/* Personal Info Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 mb-10 border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-black gradient-text mb-2">{t("name")}</h3>
              <p className="text-lg text-accent-purple font-semibold mb-4">{t("role")}</p>
              <div className="flex flex-col gap-2 text-sm text-muted">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent-purple" /> {t("location")}</span>
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent-purple" /> {t("phone")}</span>
                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent-purple" /> {t("email")}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted md:text-right">
              <span className="flex items-center gap-2 md:justify-end"><Languages className="w-4 h-4 text-accent-purple" /> {t("languages")}</span>
              <span className="text-white/70"><span className="text-muted">Nationality:</span> {t("nationality")}</span>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-lg text-muted/80 leading-relaxed max-w-4xl">{t("summary")}</p>
        </motion.div>

        {/* Professional Experience */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold mb-8 text-white tracking-widest uppercase flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-accent-purple" />
            {t("experienceTitle")}
          </h3>

          <div className="glass-card p-8 border-white/5 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple/30 via-accent-purple/10 to-transparent" />

            <div className="relative pl-10">
              <div className="absolute left-[22px] top-1 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]" />

              <h4 className="text-lg font-bold text-white mb-1">{t("experienceRole")}</h4>
              <p className="text-sm text-accent-purple/80 font-medium mb-1">{t("experienceCompany")}</p>
              <p className="text-xs text-muted mb-4 flex items-center gap-4">
                <span>{t("experiencePeriod")}</span>
                <span>|</span>
                <span>{t("experienceLocation")}</span>
              </p>

              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="text-sm text-muted/80 leading-relaxed pl-4 border-l border-white/5">
                    {t(`experience${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold mb-8 text-white tracking-widest uppercase flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-accent-purple" />
            {t("educationTitle")}
          </h3>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-6 border-white/5 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-accent-purple/20 border border-accent-purple/30 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5 text-accent-purple" />
                </div>
                <p className="text-sm text-muted/80 leading-relaxed">{t(`education${i}`)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-8 text-white tracking-widest uppercase flex items-center gap-3">
            <Terminal className="w-5 h-5 text-accent-purple" />
            {t("techStack")}
            <Sparkles className="w-4 h-4 text-accent-purple" />
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  variants={skillVariants}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="glass-card p-5 border-white/5 flex items-center gap-4 group cursor-default"
                >
                  <div className="w-12 h-12 bg-accent-purple/20 border border-accent-purple/30 rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/30 transition-all shrink-0">
                    <Icon className="w-5 h-5 text-accent-purple" />
                  </div>
                  <span className="text-sm text-muted/90 leading-relaxed">{skill.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
