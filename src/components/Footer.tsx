"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  const socials = [
    { icon: <Github size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Mail size={20} />, href: "#" },
  ];

  return (
    <footer className="py-12 px-6 bg-[#0f1117]/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8 md:flex-row">
        <p className="text-sm text-muted order-3 md:order-1">
          {t("rights")}
        </p>

        <div className="flex items-center gap-4 order-1 md:order-2">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="w-10 h-10 glass-card flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all border-none"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="text-sm text-muted flex items-center gap-2 order-2 md:order-3">
          {t("builtWith")} <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </p>
      </div>
    </footer>
  );
}
