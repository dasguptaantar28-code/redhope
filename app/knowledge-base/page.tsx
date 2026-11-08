"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, ArrowRight, Search, ShieldCheck } from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { KnowledgeArticle } from "@/types/database";

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setArticles(redHopeStore.getKnowledgeArticles());
  }, []);

  const categories = ["all", "Eligibility", "Myths & Facts", "Health Tips", "Blood Science"];

  const filtered = articles.filter((a) => {
    if (selectedCategory !== "all" && a.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Medical & Clinical Knowledge
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              Blood Donation Knowledge Base
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Scientifically accurate, physician-verified health guides on voluntary blood donation.
            </p>
          </div>

          {/* Search & Categories */}
          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles on myths, eligibility, diet, or hemoglobin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden shadow-xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat
                      ? "bg-red-600 text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat === "all" ? "All Topics" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase">
                      {art.category}
                    </span>
                    <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-red-600 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100">
                  <Link
                    href={`/knowledge-base/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
