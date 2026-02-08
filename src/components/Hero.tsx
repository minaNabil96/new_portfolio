"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";

export default function Hero() {
  const t = useTranslations("Hero");
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-purple/10 border border-accent-purple/20 rounded-full text-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent-purple" />
          <span className="font-medium">{t("badge")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black mb-8 tracking-tighter gradient-text leading-[1.1]"
        >
          {t("name")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted font-medium mb-8"
        >
          {t("role")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-lg text-muted/80 mb-12 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-accent-purple text-white font-bold rounded-xl hover:bg-accent-purple/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-purple/20"
          >
            {t("viewProjects")}
          </button>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
          >
            {t("getInTouch")}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted/40 animate-bounce"
        >
          <ChevronDown />
        </motion.div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
