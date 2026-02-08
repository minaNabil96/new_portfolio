"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[120px] font-black gradient-text leading-none mb-8"
      >
        {t("title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-muted mb-12 max-w-md mx-auto"
      >
        {t("message")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="px-8 py-4 bg-accent-purple text-white font-bold rounded-xl hover:bg-accent-purple/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-purple/20"
        >
          {t("backHome")}
        </Link>
      </motion.div>
    </div>
  );
}
