"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Loader2,
  FolderKanban,
  Search,
  ArrowUpDown,
} from "lucide-react";

interface ProjectRow {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "sortOrder" | "title">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this project permanently?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  const sorted = [...projects].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "title") cmp = a.title.localeCompare(b.title);
    else if (sortBy === "sortOrder") cmp = a.sortOrder - b.sortOrder;
    else cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortDir === "asc" ? cmp : -cmp;
  });

  const filtered = sorted.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const SortIcon = ({ field }: { field: typeof sortBy }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 opacity-30" />;
    return <ArrowUpDown className={`w-3 h-3 ${sortDir === "asc" ? "rotate-180" : ""}`} />;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black gradient-text">Projects</h1>
          <p className="text-muted text-sm mt-1">{projects.length} total projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl font-bold text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
          {([
            { label: "Date", field: "createdAt" as const },
            { label: "Title", field: "title" as const },
            { label: "Order", field: "sortOrder" as const },
          ]).map(({ label, field }) => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                sortBy === field
                  ? "bg-accent-purple/20 border-accent-purple/30 text-accent-purple"
                  : "bg-white/5 border-white/10 text-muted hover:text-white"
              }`}
            >
              {label} <SortIcon field={field} />
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 text-center border-white/5">
          <FolderKanban className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted text-sm">
            {search ? "No projects match your search" : "No projects yet"}
          </p>
        </div>
      ) : (
        <div className="glass-card border-white/5 divide-y divide-white/5">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-md text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted mt-0.5">
                  {project.category} · {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-4">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/10 transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
