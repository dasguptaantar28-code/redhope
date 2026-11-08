"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { BlogPost } from "@/types/database";

function BlogPostDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      const found = redHopeStore.getBlogPostBySlug(slug);
      setPost(found);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl text-center max-w-sm">
            <h2 className="text-base font-bold text-gray-900">Post Not Found</h2>
            <Link
              href="/blog"
              className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
            >
              Back to Blog
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
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative h-72 sm:h-96 w-full bg-gray-100">
              <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mt-3 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author_name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Recent"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-sm text-gray-700 leading-relaxed font-medium">
                {post.summary}
              </div>

              <div className="prose prose-red text-gray-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {post.content}
              </div>

              <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Share this inspiring story:</span>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Article link copied to clipboard!");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BlogPostDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading blog post...</div>}>
      <BlogPostDetailContent />
    </Suspense>
  );
}
