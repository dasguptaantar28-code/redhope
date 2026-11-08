import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-4 h-4 fill-white animate-heart-pulse" />
          <span>Save a Life Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
          Your Blood Can Give Someone <br />
          <span className="text-rose-200">Another Chance at Life.</span>
        </h2>

        <p className="text-base sm:text-xl text-rose-100 max-w-2xl mx-auto leading-relaxed">
          Join thousands of compassionate donors across Bangladesh who stand ready to answer the call of humanity. Registration takes less than 60 seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/become-a-donor"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-red-600 bg-white hover:bg-rose-50 shadow-2xl hover:shadow-white/20 transform hover:-translate-y-0.5 transition-all"
          >
            <Heart className="w-5 h-5 fill-red-600" />
            <span>Become a Donor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Helpline</span>
          </Link>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-rose-200">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Controlled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-rose-200" />
            <span>Non-Profit Community</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Bangladesh Red Crescent Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
