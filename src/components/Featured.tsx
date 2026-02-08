"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "./ProjectCard";
import { Link } from "@/i18n/routing";

export default function Featured() {
  const t = useTranslations("Featured");

  const mlProjects = [
    {
      title: "Sentiment Analysis Engine",
      description: "A real-time NLP pipeline that analyzes customer reviews using BERT-based transformers. Achieves 94% accuracy across 5 sentiment classes.",
      tags: ["Python", "PyTorch", "BERT", "FastAPI"],
      gradient: "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]",
      category: "ML / AI",
      image: "/images/projects/ml/covid.png"
    },
    {
      title: "Medical Image Classifier",
      description: "Deep learning model using EfficientNet-B4 for classifying chest X-rays into 14 pathological conditions.",
      tags: ["Python", "TensorFlow", "EfficientNet", "AWS"],
      gradient: "bg-gradient-to-br from-[#ec4899] to-[#8b5cf6]",
      category: "ML / AI",
      image: "/images/projects/ml/covid.png"
    }
  ];

  const webProjects = [
    {
      title: "E-Commerce Platform",
      description: "Full-featured marketplace built with Next.js, Stripe payments, PostgreSQL, and Redis caching.",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      gradient: "bg-gradient-to-br from-[#10b981] to-[#06b6d4]",
      category: "Full Stack",
      image: "/images/projects/ml/covid.png"
    },
    {
      title: "Real-Time Chat App",
      description: "WebSocket-powered messaging platform with end-to-end encryption, file sharing, and video calls.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      gradient: "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]",
      category: "Full Stack",
      image: "/images/projects/ml/covid.png"
    }
  ];

  return (
    <section id="featured" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
          {t("title")}
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8 rounded-full" />
      </div>

      <div className="space-y-32">
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-accent-purple rounded-full" />
            <h3 className="text-2xl font-bold text-white">{t("mlTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mlProjects.map((project) => (
              <ProjectCard key={project.title} {...project} buttonText={t("viewProject")} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <Link href="/ml-projects" className="text-muted hover:text-white transition-colors">{t("viewProject")}</Link>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-accent-cyan rounded-full" />
            <h3 className="text-2xl font-bold text-white">{t("webTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {webProjects.map((project) => (
              <ProjectCard key={project.title} {...project} buttonText={t("viewProject")} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <Link href="/web-projects" className="text-muted hover:text-white transition-colors">{t("viewProject")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
