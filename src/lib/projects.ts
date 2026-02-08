export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  gradient: string;
  category: string;
  image: string;
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
    tags: ["Python", "PyTorch", "BERT", "FastAPI", "Docker"],
    gradient: "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]",
    category: "ML / AI",
    image: "/images/projects/ml/covid.png",
    demoLink: "https://huggingface.co/spaces/minanabil96/mina_covid-xray-detector",
    repoLink: "https://github.com/yourusername/your-repo",
    buttonText: "Live Demo",
    featured: true
  },
  {
    id: "medical-classifier",
    titleKey: "ml.p2.title",
    descriptionKey: "ml.p2.description",
    tags: ["Python", "TensorFlow", "EfficientNet", "Grad-CAM", "AWS"],
    gradient: "bg-gradient-to-br from-[#ec4899] to-[#8b5cf6]",
    category: "ML / AI",
    image: "/images/projects/ml/covid.png",
    buttonText: "Source Code",
    featured: true
  },
  {
    id: "recommendation-system",
    titleKey: "ml.p3.title",
    descriptionKey: "ml.p3.description",
    tags: ["Python", "Scikit-learn", "TensorFlow", "Redis", "PostgreSQL"],
    gradient: "bg-gradient-to-br from-[#06b6d4] to-[#14b8a6]",
    category: "ML / AI",
    image: "/images/projects/ml/covid.png",
    buttonText: "Source Code"
  },
  {
    id: "time-series-forecaster",
    titleKey: "ml.p4.title",
    descriptionKey: "ml.p4.description",
    tags: ["Python", "PyTorch", "Transformers", "Pandas", "Plotly"],
    gradient: "bg-gradient-to-br from-[#f97316] to-[#ef4444]",
    category: "ML / AI",
    image: "/images/projects/ml/covid.png",
    buttonText: "Source Code"
  }
];

export const webProjects: Project[] = [
  {
    id: "ecommerce-platform",
    titleKey: "web.p1.title",
    descriptionKey: "web.p1.description",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    gradient: "bg-gradient-to-br from-[#10b981] to-[#06b6d4]",
    category: "Full Stack",
    image: "/images/projects/ml/covid.png",
    buttonText: "Live Demo",
    featured: true
  },
  {
    id: "realtime-chat",
    titleKey: "web.p2.title",
    descriptionKey: "web.p2.description",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "WebRTC"],
    gradient: "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]",
    category: "Full Stack",
    image: "/images/projects/ml/covid.png",
    buttonText: "Live Demo",
    featured: true
  },
  {
    id: "project-management",
    titleKey: "web.p3.title",
    descriptionKey: "web.p3.description",
    tags: ["Next.js", "tRPC", "Prisma", "Tailwind CSS", "Zustand"],
    gradient: "bg-gradient-to-br from-[#f43f5e] to-[#ec4899]",
    category: "Full Stack",
    image: "/images/projects/ml/covid.png",
    buttonText: "Source Code"
  },
  {
    id: "analytics-dashboard",
    titleKey: "web.p4.title",
    descriptionKey: "web.p4.description",
    tags: ["React", "D3.js", "Express", "PostgreSQL", "JWT"],
    gradient: "bg-gradient-to-br from-[#f59e0b] to-[#f97316]",
    category: "Full Stack",
    image: "/images/projects/ml/covid.png",
    buttonText: "Live Demo"
  }
];

export const getFeaturedMLProjects = () => mlProjects.filter(p => p.featured);
export const getFeaturedWebProjects = () => webProjects.filter(p => p.featured);
export const getAllMLProjects = () => mlProjects;
export const getAllWebProjects = () => webProjects;
