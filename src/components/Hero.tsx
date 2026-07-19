"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import ContactModal from "./ContactModal";

function FloatingOrb({ delay, size, position, color }: { delay: number; size: number; position: string; color: string }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${position}`}
      style={{ width: size, height: size, background: color }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.08, 0.12, 0.06, 0.1, 0.08],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    const maxDist = 200;
    const strength = Math.max(0, 1 - dist / maxDist);
    const moveX = (e.clientX - centerX) * strength * 0.3;
    const moveY = (e.clientY - centerY) * strength * 0.3;
    x.set(moveX);
    y.set(moveY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const t = useTranslations("Hero");
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
        {/* Floating Orbs */}
        <FloatingOrb delay={0} size={300} position="top-[-80px] right-[-80px]" color="radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)" />
        <FloatingOrb delay={1.5} size={250} position="bottom-[10%] left-[-60px]" color="radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)" />
        <FloatingOrb delay={3} size={200} position="top-[30%] left-[15%]" color="radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)" />
        <FloatingOrb delay={2} size={180} position="bottom-[20%] right-[10%]" color="radial-gradient(circle, rgba(129,140,248,0.1), transparent 70%)" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-purple/10 border border-accent-purple/20 rounded-full text-sm mb-8 w-fit mx-auto"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-8 py-4 bg-accent-purple text-white font-bold rounded-xl hover:bg-accent-purple/90 transition-colors shadow-lg shadow-accent-purple/20 flex items-center gap-2"
            >
              {t("viewProjects")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={() => setIsContactOpen(true)}
              className="group px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              {t("getInTouch")}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted/40 animate-bounce"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
