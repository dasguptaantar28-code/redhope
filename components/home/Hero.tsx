"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Search,
  ArrowRight,
  Users,
  Droplet,
  PlusCircle,
  ShieldCheck,
  HandHeart,
  Activity,
} from "lucide-react";

export default function Hero() {
  const bottomPills = [
    {
      title: "Help Others",
      subtitle: "Make a difference",
      icon: Users,
    },
    {
      title: "Save Lives",
      subtitle: "Give hope",
      icon: Droplet,
    },
    {
      title: "Build a Healthy Society",
      subtitle: "Together we can",
      icon: ShieldCheck,
    },
    {
      title: "Be a Hero",
      subtitle: "Donate Blood",
      icon: HandHeart,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-radial from-rose-50/60 via-white to-white pt-6 pb-20">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Layout: Hero Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/80 border border-rose-200 text-red-600 text-xs sm:text-sm font-semibold shadow-xs">
              <Heart className="w-4 h-4 fill-red-600 text-red-600 animate-heart-pulse" />
              <span>A Small Act, A Big Impact</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-none">
              Donate Blood <br />
              <span className="text-red-600">Save Lives</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Be a hero. Donate blood and help someone in need. Together, we can build a healthier,
              more compassionate community across Bangladesh.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/become-a-donor"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 transform hover:-translate-y-0.5 transition-all"
              >
                <Droplet className="w-5 h-5 fill-white" />
                <span>Be a Donor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/search-donors"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-gray-800 bg-white hover:bg-rose-50/60 border-2 border-red-200 hover:border-red-400 transition-all shadow-xs"
              >
                <Search className="w-4 h-4 text-red-600" />
                <span>Search Donors</span>
              </Link>
            </div>

            {/* Fast Quick Info Pill */}
            <div className="pt-4 flex items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-red-600" />
                <span>24/7 Verified Matching</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Privacy Protected</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Reference Hero Graphic Display */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
                <Image
                  src="/images/hero-banner.jpg"
                  alt="Blood Donation in Bangladesh"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Emergency Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Droplet className="w-5 h-5 fill-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Urgent Requests Today</p>
                    <p className="text-[11px] text-red-600 font-semibold">Live in 64 Districts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pills Bar (Directly beneath hero as shown in reference) */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl shadow-red-950/5 border border-rose-100 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-rose-100">
            {bottomPills.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div
                  key={pill.title}
                  className={`flex items-center gap-4 ${idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{pill.title}</h4>
                    <p className="text-xs text-gray-500">{pill.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
