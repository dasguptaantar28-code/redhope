"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-red-950/5 border border-red-100 text-center">
          <h1 className="text-2xl font-black text-gray-900 mb-2">Reset Password</h1>
          <p className="text-xs text-gray-500 mb-6">
            Enter your registered email address to receive password recovery instructions.
          </p>

          {sent ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="text-sm font-bold">Recovery Link Dispatched</h2>
              <p className="text-xs text-emerald-700">
                If an account exists for <strong>{email}</strong>, password reset instructions have been sent.
              </p>
              <Link
                href="/login"
                className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-500/25 transition-all"
              >
                Send Password Reset Link
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <Link href="/login" className="inline-flex items-center gap-1 font-bold text-red-600 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
