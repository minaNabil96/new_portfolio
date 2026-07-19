"use client";

import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending — in production, integrate with an email service
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="glass-card p-8 border-white/5 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-white mb-4">Check Your Email</h2>
          <p className="text-muted text-sm mb-6">If an account exists with that email, you&apos;ll receive a reset link.</p>
          <Link href="/auth/login" className="text-accent-purple hover:text-accent-purple/80 transition-colors text-sm font-medium">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
          <h1 className="text-3xl font-black gradient-text">Reset Password</h1>
          <p className="text-muted mt-2 text-sm">Contact admin to reset your password</p>
        </div>

        <div className="glass-card p-8 border-white/5 space-y-5 text-center">
          <p className="text-sm text-muted leading-relaxed">
            Password reset via email is not available in local auth mode. Please contact the system administrator.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 bg-accent-purple text-white rounded-xl font-bold hover:bg-accent-purple/90 transition-all"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
