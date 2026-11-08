"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  Heart,
  User,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/database";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const { login, demoLogin, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      return setErrorMsg("Please enter both email and password.");
    }

    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push("/dashboard");
      }
    } else {
      setErrorMsg(res.error || "Login failed.");
    }
  };

  const handleDemo = (role: UserRole) => {
    demoLogin(role);
    if (role === "admin") router.push("/admin");
    else if (role === "donor") router.push("/donor-dashboard");
    else router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow flex items-center justify-center py-12 sm:py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-red-950/5 border border-red-100">
          <div className="text-center mb-8">
            <div className="relative w-36 h-10 mx-auto mb-3">
              <Image src="/images/logo.png" alt="RedHope" fill className="object-contain" priority />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Welcome Back</h1>
            <p className="text-xs text-gray-500 mt-1">
              Log in to manage your donations, blood requests, or administrative portal.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick 1-Click Role Switcher */}
          <div className="mb-6 p-4 rounded-2xl bg-rose-50/80 border border-rose-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Instant 1-Click Demo Evaluation</span>
            </div>
            <p className="text-[11px] text-gray-600 mb-3">
              Instantly test and explore each portal with full capabilities:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo("admin")}
                className="py-2 px-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-xs transition-colors"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemo("donor")}
                className="py-2 px-1 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shadow-xs transition-colors"
              >
                Donor Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemo("user")}
                className="py-2 px-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors"
              >
                User Demo
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-gray-400 font-semibold uppercase">
              Or Sign In
            </span>
            <div className="border-t border-gray-200 w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-red-600 hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/25 transition-all disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Signing in..." : "Log In to RedHope"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="text-red-600 font-bold hover:underline">
              Create an account
            </Link>{" "}
            or{" "}
            <Link href="/become-a-donor" className="text-red-600 font-bold hover:underline">
              Join as a Donor
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
