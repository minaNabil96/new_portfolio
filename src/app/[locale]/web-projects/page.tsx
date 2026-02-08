import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getTranslations } from "next-intl/server";
import { getAllWebProjects, Project } from "@/lib/projects";

export default async function WebProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Projects.web");
  const tProjects = await getTranslations("Projects");

  // Get all web projects from shared data
  const allProjects = getAllWebProjects();

  // Transform projects to resolve translation keys
  const projects = allProjects.map((project: Project) => ({
    title: tProjects(project.titleKey),
    description: tProjects(project.descriptionKey),
    tags: project.tags,
    gradient: project.gradient,
    category: project.category,
    image: project.image,
    demoLink: project.demoLink,
    repoLink: project.repoLink,
    buttonText: project.buttonText || "View Project"
  }));

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
