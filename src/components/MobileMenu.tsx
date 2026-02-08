"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { X, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  navLinks: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, locale, navLinks }: MobileMenuProps) {
  const t = useTranslations("Header");
  const otherLocale = locale === "en" ? "ru" : "en";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-[#080808]/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xl font-bold gradient-text">AP</span>
              <button
                onClick={onClose}
                className="p-2 bg-white/5 border border-white/10 rounded-lg text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="px-6 py-4 bg-white/5 border border-white/5 rounded-xl text-lg font-medium text-white hover:bg-white/10 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
              <Link
                href="/"
                locale={otherLocale}
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/5 rounded-xl text-lg font-medium text-white hover:bg-white/10 transition-all w-full justify-center"
              >
                <Globe className="w-5 h-5" />
                <span>{t("lang")}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
