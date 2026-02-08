import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getTranslations } from "next-intl/server";

export default async function MLProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Projects.ml");

  const projects = [
    {
      title: t("p1.title"),
      description: t("p1.description"),
      tags: ["Python", "PyTorch", "BERT", "FastAPI", "Docker"],
      gradient: "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]",
      category: "ML / AI",
      buttonText: "Live Demo",
      demoLink: "https://huggingface.co/spaces/minanabil96/mina_covid-xray-detector",
      repoLink: "https://github.com/yourusername/your-repo",
      image: "/images/projects/ml/covid.png"
    },
    {
      title: t("p2.title"),
      description: t("p2.description"),
      tags: ["Python", "TensorFlow", "EfficientNet", "Grad-CAM", "AWS"],
      gradient: "bg-gradient-to-br from-[#ec4899] to-[#8b5cf6]",
      category: "ML / AI",
      buttonText: "Source Code",
      image: "/images/projects/ml/covid.png"
    },
    {
      title: t("p3.title"),
      description: t("p3.description"),
      tags: ["Python", "Scikit-learn", "TensorFlow", "Redis", "PostgreSQL"],
      gradient: "bg-gradient-to-br from-[#06b6d4] to-[#14b8a6]",
      category: "ML / AI",
      buttonText: "Source Code",
      image: "/images/projects/ml/covid.png"
    },
    {
      title: t("p4.title"),
      description: t("p4.description"),
      tags: ["Python", "PyTorch", "Transformers", "Pandas", "Plotly"],
      gradient: "bg-gradient-to-br from-[#f97316] to-[#ef4444]",
      category: "ML / AI",
      buttonText: "Source Code",
      image: "/images/projects/ml/covid.png"
    }
  ];

  return (
    <main className="min-h-screen">
      <Header locale={locale} />
      <div className="pt-48 pb-32 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text leading-tight">{t("title")}</h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-medium">{t("subtitle")}</p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-purple via-pink-500 to-accent-cyan mx-auto mt-10 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)]" />
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
