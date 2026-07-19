"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Menu,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push("/auth/login");
          return;
        }
        setUsername(data.user.username);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0f1117]/95 border-r border-white/5 backdrop-blur-xl flex flex-col transition-transform duration-300 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-purple/20 border border-accent-purple/30 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <span className="text-lg font-black gradient-text">Admin</span>
              <p className="text-[10px] text-muted uppercase tracking-widest">Portfolio</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                    : "text-muted hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <p className="text-xs text-muted px-4 truncate">{username}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all w-full border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-3 h-3 rotate-180" /> View Portfolio
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 glass-nav rounded-xl text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold gradient-text">Admin</span>
          <button
            onClick={handleLogout}
            className="p-2 glass-nav rounded-xl text-red-400"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
