"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Plus, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface ProjectRow {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, ml: 0, web: 0, featured: 0 });
  const [recent, setRecent] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setStats({
          total: data.length,
          ml: data.filter((p: any) => p.category === "ML / AI").length,
          web: data.filter((p: any) => p.category === "Full Stack").length,
          featured: data.filter((p: any) => p.featured).length,
        });
        setRecent(data.slice(0, 5));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: "Total Projects", value: stats.total, color: "from-[#7c3aed] to-[#3b82f6]" },
    { label: "ML / AI", value: stats.ml, color: "from-[#22c55e] to-[#06b6d4]" },
    { label: "Full Stack", value: stats.web, color: "from-[#fb923c] to-[#f43f5e]" },
    { label: "Featured", value: stats.featured, color: "from-[#f59e0b] to-[#ec4899]" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black gradient-text">Dashboard</h1>
          <p className="text-muted text-sm mt-1">Overview of your portfolio</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl font-bold text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className={`glass-card p-5 border-white/5 relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-[0.07]`} />
            <p className="text-xs text-muted uppercase tracking-widest font-semibold relative">{card.label}</p>
            <p className="text-3xl font-black text-white mt-2 relative">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card border-white/5">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-accent-purple" /> Recent Projects
          </h2>
          <Link
            href="/admin/projects"
            className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-12 text-center">
            <FolderKanban className="w-12 h-12 text-muted/30 mx-auto mb-3" />
            <p className="text-muted text-sm">No projects yet</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent-purple/20 border border-accent-purple/30 rounded-xl text-accent-purple text-sm font-semibold hover:bg-accent-purple/30 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Your First Project
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recent.map((project) => (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}/edit`}
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {project.category} {project.featured && "· Featured"}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
