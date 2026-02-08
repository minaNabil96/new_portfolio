"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[80] m-auto w-full max-w-lg h-fit p-6 sm:p-8"
          >
            <div className="glass-card bg-[#0f1117]/90 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-muted hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-black mb-6 gradient-text">{t("title")}</h2>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} />
                  </div>
                  <p className="text-xl font-bold text-white">{t("success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">{t("name")}</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-purple transition-colors"
                      placeholder={t("namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">{t("email")}</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-purple transition-colors"
                      placeholder="alex@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">{t("message")}</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-purple transition-colors resize-none"
                      placeholder="..."
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-accent-purple text-white font-bold rounded-xl hover:bg-accent-purple/90 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{t("send")}</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
