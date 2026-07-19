export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  gradient: string;
  category: string;
  image?: string;
  demoLink?: string;
  repoLink?: string;
  buttonText?: string;
  featured?: boolean;
}

export const mlProjects: Project[] = [
  {
    id: "covid-detector",
    titleKey: "ml.p1.title",
    descriptionKey: "ml.p1.description",
    tags: ["Python","PyTorch","Computer Vision","Deep Learning","Streamlit","ResNet","Transfer Learning","Hugging Face","Scikit-learn","Pandas"],
    gradient: "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]",
    category: "ML / AI",
    image: "/images/projects/ml/covid.png",
    demoLink: "https://huggingface.co/spaces/minanabil96/mina_covid-xray-detector",
    repoLink: "https://github.com/minaNabil96/devops-incident-sim-pipeline",
    buttonText: "Live Demo",
    featured: true
  },
  {
    id: "devops-sim-pipeline",
    titleKey: "ml.p2.title",
    descriptionKey: "ml.p2.description",
    tags: ["Python", "Prompt Engineering", "Jinja2", "Kubernetes", "LLM", "SRE", "DevOps"],
    gradient: "bg-gradient-to-br from-[#a855f7] to-[#6366f1]",
    category: "ML / AI",
    image: "/images/projects/ml/devops.svg",
    repoLink: "https://github.com/minaNabil96/devops-incident-sim-pipeline",
    buttonText: "Source Code",
    featured: true
  },
  {
    id: "fc25-analysis",
    titleKey: "ml.p3.title",
    descriptionKey: "ml.p3.description",
    tags: ["Python", "Pandas", "Scikit-learn", "K-Means", "Data Analysis", "Jupyter"],
    gradient: "bg-gradient-to-br from-[#22c55e] to-[#06b6d4]",
    category: "ML / AI",
    image: "/images/projects/ml/fc25.svg",
    repoLink: "https://github.com/minaNabil96/FC25_Players_Analysis",
    buttonText: "Source Code"
  }
];

export const webProjects: Project[] = [
  {
    id: "science-teacher",
    titleKey: "web.p1.title",
    descriptionKey: "web.p1.description",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "i18n"],
    gradient: "bg-gradient-to-br from-[#fb923c] to-[#f43f5e]",
    category: "Full Stack",
    image: "/images/projects/web/teacher.svg",
    demoLink: "https://mrsmirna.vercel.app",
    repoLink: "https://github.com/minaNabil96/science-teacher-website",
    buttonText: "Live Demo",
    featured: true
  },
  {
    id: "spacex-cli",
    titleKey: "web.p2.title",
    descriptionKey: "web.p2.description",
    tags: ["Python", "Click", "Rich", "REST API", "Testing", "CI/CD"],
    gradient: "bg-gradient-to-br from-[#8b5cf6] to-[#ec4899]",
    category: "Full Stack",
    image: "/images/projects/web/spacex.svg",
    repoLink: "https://github.com/minaNabil96/spacex-cli",
    buttonText: "Source Code"
  }
];

export const getFeaturedMLProjects = () => mlProjects.filter(p => p.featured);
export const getFeaturedWebProjects = () => webProjects.filter(p => p.featured);
export const getAllMLProjects = () => mlProjects;
export const getAllWebProjects = () => webProjects;
export const getAllProjects = () => [...mlProjects, ...webProjects];
