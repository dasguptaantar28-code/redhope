"use client";

import React, { useEffect, useState } from "react";
import { Users, Droplets, HeartPulse, Sparkles } from "lucide-react";
import { redHopeStore } from "@/lib/store";

export default function StatsSection() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonations: 0,
    activeRequests: 0,
    livesHelped: 0,
  });

  useEffect(() => {
    const data = redHopeStore.getPlatformStats();
    setStats(data);
  }, []);

  const statItems = [
    {
      label: "Registered Donors",
      bnLabel: "নিবন্ধিত রক্তদাতা",
      value: stats.totalDonors,
      suffix: "+",
      icon: Users,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
    },
    {
      label: "Blood Donations",
      bnLabel: "সম্পূর্ণ রক্তদান",
      value: stats.totalDonations,
      suffix: "+",
      icon: Droplets,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      label: "Active Requests",
      bnLabel: "জরুরি রক্তের আবেদন",
      value: stats.activeRequests,
      suffix: "",
      icon: HeartPulse,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      label: "Lives Helped",
      bnLabel: "জীবন বাঁচানো হয়েছে",
      value: stats.livesHelped,
      suffix: "+",
      icon: Sparkles,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
  ];

  return (
    <section className="py-16 bg-gray-50/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
            Real-Time Community Impact
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
            Every Drop Makes A Difference
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time verified platform statistics across hospitals in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`bg-white rounded-2xl p-6 border ${item.borderColor} shadow-xs hover:shadow-md transition-shadow text-center relative overflow-hidden`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  {item.value.toLocaleString()}
                  <span className="text-red-600">{item.suffix}</span>
                </div>
                <div className="text-sm font-bold text-gray-800 mt-1">{item.label}</div>
                <div className="text-xs text-gray-400 font-bengali mt-0.5">{item.bnLabel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
