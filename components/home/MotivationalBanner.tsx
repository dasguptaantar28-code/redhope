import React from "react";
import { Heart } from "lucide-react";

export default function MotivationalBanner() {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white py-6 shadow-inner relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex items-center justify-center gap-3">
        <Heart className="w-6 h-6 text-rose-200 fill-white animate-heart-pulse hidden sm:inline" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide font-bengali drop-shadow-sm">
          &ldquo;রক্তদান কোনো ইচ্ছিক বিষয় নয়, এটি মানবতার পরিচয়।&rdquo;
        </h2>
        <Heart className="w-6 h-6 text-rose-200 fill-white animate-heart-pulse hidden sm:inline" />
      </div>
    </section>
  );
}
