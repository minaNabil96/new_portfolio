"use client";

import { useState } from "react";
import { Loader2, Save, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  description_ru: string;
  tags: string[];
  category: string;
  gradient: string;
  image: string;
  demo_link: string;
  repo_link: string;
  button_text: string;
  featured: boolean;
  sort_order: number;
}

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel?: string;
}

const presetGradients = [
  { label: "Purple-Blue", value: "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]" },
  { label: "Pink-Purple", value: "bg-gradient-to-br from-[#ec4899] to-[#8b5cf6]" },
  { label: "Cyan-Teal", value: "bg-gradient-to-br from-[#06b6d4] to-[#14b8a6]" },
  { label: "Orange-Red", value: "bg-gradient-to-br from-[#f97316] to-[#ef4444]" },
  { label: "Purple-Indigo", value: "bg-gradient-to-br from-[#a855f7] to-[#6366f1]" },
  { label: "Green-Cyan", value: "bg-gradient-to-br from-[#22c55e] to-[#06b6d4]" },
  { label: "Orange-Pink", value: "bg-gradient-to-br from-[#fb923c] to-[#f43f5e]" },
  { label: "Indigo-Pink", value: "bg-gradient-to-br from-[#8b5cf6] to-[#ec4899]" },
];

const categories = ["ML / AI", "Full Stack"];

export default function ProjectForm({ defaultValues, onSubmit, submitLabel = "Save" }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<ProjectFormData>({
    title: "",
    description: "",
    description_ru: "",
    tags: [],
    category: "ML / AI",
    gradient: presetGradients[0].value,
    image: "",
    demo_link: "",
    repo_link: "",
    button_text: "View Project",
    featured: false,
    sort_order: 0,
    ...defaultValues,
  });

  const update = (field: keyof ProjectFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and English description are required");
      setSaving(false);
      return;
    }

    try {
      await onSubmit(form);
    } catch (err: any) {
      setError(err.message || "Failed to save project");
      setSaving(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      update("tags", [...form.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    update("tags", form.tags.filter((t) => t !== tag));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-muted mb-2">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g., COVID-19 Chest X-Ray Detector"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted mb-2">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Describe what this project does..."
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted mb-2">
          Russian Description
          <span className="text-muted/50 font-normal ml-2">(optional)</span>
        </label>
        <textarea
          value={form.description_ru}
          onChange={(e) => update("description_ru", e.target.value)}
          placeholder="Описание проекта на русском языке..."
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm resize-y"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Category</label>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => update("category", cat)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border ${
                  form.category === cat
                    ? "bg-accent-purple/20 border-accent-purple/30 text-accent-purple"
                    : "bg-white/5 border-white/10 text-muted hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Sort Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => update("sort_order", parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted mb-2">Tags</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Type a tag and press Enter"
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2.5 bg-accent-purple/20 border border-accent-purple/30 rounded-xl text-accent-purple text-sm font-semibold hover:bg-accent-purple/30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-muted"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted mb-2">Card Gradient</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presetGradients.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => update("gradient", g.value)}
              className={`h-14 rounded-xl border-2 transition-all ${
                form.gradient === g.value
                  ? "border-accent-purple ring-2 ring-accent-purple/30"
                  : "border-white/10 hover:border-white/20"
              } ${g.value}`}
              title={g.label}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Image URL</label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            placeholder="/images/projects/ml/covid.png"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Button Text</label>
          <input
            type="text"
            value={form.button_text}
            onChange={(e) => update("button_text", e.target.value)}
            placeholder="Live Demo"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Demo Link</label>
          <input
            type="url"
            value={form.demo_link}
            onChange={(e) => update("demo_link", e.target.value)}
            placeholder="https://huggingface.co/spaces/..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Repo Link</label>
          <input
            type="url"
            value={form.repo_link}
            onChange={(e) => update("repo_link", e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => update("featured", !form.featured)}
          className={`w-12 h-7 rounded-full border-2 transition-all relative ${
            form.featured
              ? "bg-accent-purple border-accent-purple"
              : "bg-white/10 border-white/20"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-md ${
              form.featured ? "left-6" : "left-0.5"
            }`}
          />
        </button>
        <span className="text-sm text-muted font-medium">Featured project</span>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:bg-accent-purple/50 text-white rounded-xl font-bold text-sm transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-muted hover:text-white hover:bg-white/10 font-semibold text-sm transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
