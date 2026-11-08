"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, ArrowLeft, ShieldCheck, Heart, Share2 } from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { KnowledgeArticle } from "@/types/database";

function KnowledgeArticleDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<KnowledgeArticle | null>(null);

  useEffect(() => {
    if (slug) {
      const found = redHopeStore.getKnowledgeArticleBySlug(slug);
      setArticle(found);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl text-center max-w-sm">
            <BookOpen className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h2 className="text-base font-bold text-gray-900">Article Not Found</h2>
            <Link
              href="/knowledge-base"
              className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
            >
              Back to Knowledge Base
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/knowledge-base"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-6">
            <div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {article.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mt-3 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Clinically Reviewed
                </span>
                <span>•</span>
                <span>RedHope Medical Panel</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-sm text-gray-700 leading-relaxed font-medium">
              {article.summary}
            </div>

            <div className="prose prose-red text-gray-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {article.content}
            </div>

            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Have questions? Reach our 24/7 medical helpline.
              </span>
              <Link
                href="/become-a-donor"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs"
              >
                Become a Donor
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function KnowledgeArticleDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading article...</div>}>
      <KnowledgeArticleDetailContent />
    </Suspense>
  );
}
