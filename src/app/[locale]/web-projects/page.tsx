import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getTranslations } from "next-intl/server";

export default async function WebProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Projects.web");

  const projects = [
    {
      title: t("p1.title"),
      description: t("p1.description"),
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
      gradient: "bg-gradient-to-br from-[#10b981] to-[#06b6d4]",
      category: "Full Stack",
      buttonText: "Live Demo"
    },
    {
      title: t("p2.title"),
      description: t("p2.description"),
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "WebRTC"],
      gradient: "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]",
      category: "Full Stack",
      buttonText: "Live Demo"
    },
    {
      title: t("p3.title"),
      description: t("p3.description"),
      tags: ["Next.js", "tRPC", "Prisma", "Tailwind CSS", "Zustand"],
      gradient: "bg-gradient-to-br from-[#f43f5e] to-[#ec4899]",
      category: "Full Stack",
      buttonText: "Source Code"
    },
    {
      title: t("p4.title"),
      description: t("p4.description"),
      tags: ["React", "D3.js", "Express", "PostgreSQL", "JWT"],
      gradient: "bg-gradient-to-br from-[#f59e0b] to-[#f97316]",
      category: "Full Stack",
      buttonText: "Live Demo"
    }
  ];

  return (
    <main className="min-h-screen">
      <Header locale={locale} />
      <div className="pt-48 pb-32 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text leading-tight">{t("title")}</h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-medium">{t("subtitle")}</p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-cyan via-emerald-500 to-accent-purple mx-auto mt-10 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
