import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: body.title,
      description: body.description,
      description_ru: body.description_ru || null,
      tags: body.tags || [],
      category: body.category || "ML / AI",
      gradient: body.gradient || "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]",
      image: body.image || null,
      demo_link: body.demo_link || null,
      repo_link: body.repo_link || null,
      button_text: body.button_text || "View Project",
      featured: body.featured || false,
      sort_order: body.sort_order || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("projects")
    .update({
      title: body.title,
      description: body.description,
      description_ru: body.description_ru || null,
      tags: body.tags || [],
      category: body.category,
      gradient: body.gradient,
      image: body.image || null,
      demo_link: body.demo_link || null,
      repo_link: body.repo_link || null,
      button_text: body.button_text || "View Project",
      featured: body.featured || false,
      sort_order: body.sort_order || 0,
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
