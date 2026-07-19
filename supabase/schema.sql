-- Projects table for portfolio admin
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ru TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'ML / AI',
  gradient TEXT DEFAULT 'bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]',
  image TEXT,
  demo_link TEXT,
  repo_link TEXT,
  button_text TEXT DEFAULT 'View Project',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for sorting
CREATE INDEX idx_projects_sort ON projects(sort_order);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Admins (authenticated users) can do everything
CREATE POLICY "admin_all" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Public can only view
CREATE POLICY "public_select" ON projects
  FOR SELECT USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
