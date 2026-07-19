"use client";

import { useState } from "react";
import { Shield, Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SetupPage() {
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const [exists, setExists] = useState(false);
  const [error, setError] = useState("");

  const handleSetup = async () => {
    setError("");
    setCreating(true);

    try {
      const res = await fetch("/api/auth/setup", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Setup failed");
        setCreating(false);
        return;
      }

      setExists(data.exists || false);
      setDone(true);
      setCreating(false);
    } catch {
      setError("Connection error. Make sure the server is running.");
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-purple/20 border border-accent-purple/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-accent-purple" />
          </div>
          <h1 className="text-3xl font-black gradient-text">Admin Setup</h1>
          <p className="text-muted mt-2 text-sm">Create the administrator account</p>
        </div>

        <div className="glass-card p-8 border-white/5 space-y-6">
          {done ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {exists ? "Admin Already Exists" : "Admin Account Created"}
              </h2>
              <div className="bg-white/5 rounded-xl p-4 text-left space-y-2 text-sm">
                <p className="text-muted">Sign in with:</p>
                <p className="text-white font-mono">Username: <strong>admin</strong></p>
                <p className="text-white font-mono">Password: <strong>01069534435</strong></p>
              </div>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-purple text-white rounded-xl font-bold hover:bg-accent-purple/90 transition-all"
              >
                Go to Login <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                <p className="text-white font-mono">Username: <strong>admin</strong></p>
                <p className="text-white font-mono">Password: <strong>01069534435</strong></p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSetup}
                disabled={creating}
                className="w-full py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:bg-accent-purple/50 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                {creating ? "Creating..." : "Create Admin Account"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
