"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { Edit3, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          router.push("/admin/projects");
          return;
        }
        setProject(data);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (data: any) => {
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update project");
    }

    router.push("/admin/projects");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-10 h-10 bg-accent-purple/20 border border-accent-purple/30 rounded-xl flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-accent-purple" />
        </div>
        <div>
          <h1 className="text-3xl font-black gradient-text">Edit Project</h1>
          <p className="text-muted text-sm mt-1">{project.title}</p>
        </div>
      </div>

      <ProjectForm
        defaultValues={{
          title: project.title,
          description: project.description,
          description_ru: project.description_ru || "",
          tags: project.tags || [],
          category: project.category,
          gradient: project.gradient,
          image: project.image || "",
          demo_link: project.demoLink || "",
          repo_link: project.repoLink || "",
          button_text: project.buttonText,
          featured: project.featured,
          sort_order: project.sortOrder,
        }}
        onSubmit={handleUpdate}
        submitLabel="Update Project"
      />
    </div>
  );
}
