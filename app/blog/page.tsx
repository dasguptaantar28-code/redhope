"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { BlogPost } from "@/types/database";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPosts(redHopeStore.getBlogPosts().filter((p) => p.is_published));
  }, []);

  const categories = [
    "all",
    "Health Awareness",
    "Donor Stories",
    "Emergency Awareness",
    "Blood Donation",
    "Community Activities",
  ];

  const filtered = posts.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Stories & News
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              RedHope Blog & Articles
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Inspiring donor journeys, clinical developments, and community news across Bangladesh.
            </p>
          </div>

          {/* Search & Categories */}
          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search blog articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
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
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Recent"}
                      </span>
                    </div>

                    <h2 className="font-bold text-gray-900 text-lg group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
