import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON<T>(file: string, fallback: T): T {
  ensureDir();
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeJSON<T>(file: string, data: T) {
  ensureDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  gradient: string;
  image: string;
  demoLink: string;
  repoLink: string;
  buttonText: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// --- Users ---
export function getUsers(): User[] {
  return readJSON<User[]>(USERS_FILE, []);
}

export function saveUsers(users: User[]) {
  writeJSON(USERS_FILE, users);
}

export function findUserByUsername(username: string): User | undefined {
  return getUsers().find((u) => u.username === username);
}

// --- Projects ---
export function getProjects(): Project[] {
  return readJSON<Project[]>(PROJECTS_FILE, []);
}

export function saveProjects(projects: Project[]) {
  writeJSON(PROJECTS_FILE, projects);
}

export function findProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}
