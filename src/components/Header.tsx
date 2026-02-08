"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Globe, Code2, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import MobileMenu from "./MobileMenu";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "en" ? "ru" : "en";

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("mlProjects"), href: "/ml-projects" },
    { name: t("webProjects"), href: "/web-projects" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
          isScrolled ? "bg-[#080808]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-accent-purple/20 border border-accent-purple/30 rounded-xl flex items-center justify-center group-hover:bg-accent-purple/30 transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)]">
              <Code2 className="w-5 h-5 text-accent-purple" />
            </div>
            <span className="text-2xl font-black tracking-tighter gradient-text">AP</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 glass-nav p-1 rounded-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-5 py-2 rounded-xl text-sm font-semibold transition-all",
                  pathname === link.href
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={pathname}
              locale={otherLocale}
              className="hidden md:flex items-center gap-2 px-5 py-2 glass-nav rounded-xl text-sm font-semibold hover:bg-white/10 transition-all border-none"
            >
              <Globe className="w-4 h-4 text-accent-purple" />
              <span>{t("lang")}</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 glass-nav rounded-xl text-white hover:bg-white/10 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
        navLinks={navLinks}
      />
    </>
  );
}
