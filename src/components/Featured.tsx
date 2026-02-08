"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "./ProjectCard";
import { Link } from "@/i18n/routing";
import { getFeaturedMLProjects, getFeaturedWebProjects, Project } from "@/lib/projects";

export default function Featured() {
  const t = useTranslations("Projects");
  const tFeatured = useTranslations("Featured");

  // Get featured projects from shared data
  const featuredMLProjects = getFeaturedMLProjects();
  const featuredWebProjects = getFeaturedWebProjects();

  // Transform projects to resolve translation keys
  const transformProject = (project: Project) => ({
    title: t(project.titleKey),
    description: t(project.descriptionKey),
    tags: project.tags,
    gradient: project.gradient,
    category: project.category,
    image: project.image,
    demoLink: project.demoLink,
    repoLink: project.repoLink,
    buttonText: project.buttonText || tFeatured("viewProject")
  });

  const mlProjects = featuredMLProjects.map(transformProject);
  const webProjects = featuredWebProjects.map(transformProject);

  return (
    <section id="featured" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
          {tFeatured("title")}
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          {tFeatured("subtitle")}
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8 rounded-full" />
      </div>

      <div className="space-y-32">
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-accent-purple rounded-full" />
            <h3 className="text-2xl font-bold text-white">{tFeatured("mlTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mlProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <Link href="/ml-projects" className="text-muted hover:text-white transition-colors">{tFeatured("viewProject")}</Link>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-accent-cyan rounded-full" />
            <h3 className="text-2xl font-bold text-white">{tFeatured("webTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {webProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <Link href="/web-projects" className="text-muted hover:text-white transition-colors">{tFeatured("viewProject")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
