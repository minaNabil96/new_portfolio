"use client";

import { useRouter } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { Plus } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create project");
    }

    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent-purple/20 border border-accent-purple/30 rounded-xl flex items-center justify-center">
          <Plus className="w-5 h-5 text-accent-purple" />
        </div>
        <div>
          <h1 className="text-3xl font-black gradient-text">New Project</h1>
          <p className="text-muted text-sm mt-1">Add a project to your portfolio</p>
        </div>
      </div>

      <ProjectForm onSubmit={handleCreate} submitLabel="Create Project" />
    </div>
  );
}
