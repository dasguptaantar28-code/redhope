"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { KnowledgeArticle } from "@/types/database";

export default function KnowledgeSection() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);

  useEffect(() => {
    setArticles(redHopeStore.getKnowledgeArticles().slice(0, 3));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Medical Awareness
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
              Blood Donation Knowledge Base
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Evidence-based medical guidelines reviewed by certified clinical professionals.
            </p>
          </div>

          <Link
            href="/knowledge-base"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-gray-800 border border-gray-200 hover:border-red-300 hover:text-red-600 shadow-xs transition-all"
          >
            <span>Explore All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-gray-50/70 hover:bg-white rounded-3xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
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

              <div className="pt-6 mt-4 border-t border-gray-200/60">
                <Link
                  href={`/knowledge-base/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Full Medical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
