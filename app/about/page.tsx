import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Heart,
  ShieldCheck,
  Users,
  Target,
  Award,
  ArrowRight,
  Droplet,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us — RedHope | Donate Blood • Save Lives",
  description: "Learn about RedHope's mission to make blood donation accessible, swift, and transparent across Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        {/* Header Hero */}
        <section className="bg-radial from-rose-50 via-white to-white py-16 sm:py-24 border-b border-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Heart className="w-3.5 h-3.5 fill-red-600" />
              <span>Humanitarian Mission</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Bridging the Blood Gap Across <span className="text-red-600">Bangladesh</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
              RedHope was founded with a single, urgent purpose: to ensure no patient in Bangladesh loses their life simply because compatible blood could not be found in time.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                  Our Identity
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Trustworthy, Humanitarian & Clinically Conscious
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Every year, thousands of patients in Dhaka, Chattogram, Sylhet, and remote upazilas struggle to locate blood bags during obstetric emergencies, major surgeries, and thalassemia transfusions.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  RedHope combines modern cloud technology with deep empathy. We provide strict privacy safeguards so donors can volunteer safely without fear of spam, while empowering patients and families with fast, verified access to lifesavers.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">
                      100% Free and non-commercial for every citizen
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">
                      Privacy-preserving contact requests for donors
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">
                      Administrative verification for urgent hospital cases
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic card */}
              <div className="relative bg-gradient-to-br from-rose-500 to-red-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Droplet className="w-8 h-8 fill-white text-white" />
                  </div>
                  <h3 className="text-2xl font-black">
                    &ldquo;রক্ত দিন, জীবন বাঁচান&rdquo;
                  </h3>
                  <p className="text-rose-100 text-sm leading-relaxed">
                    We believe voluntary blood donation is not just a favor; it is a fundamental humanitarian duty. By uniting citizens across all 64 districts of Bangladesh, we are building a nation where safe blood is always within reach.
                  </p>
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-rose-200">
                    <span>RedHope Central Directorate</span>
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50/70 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
                Guiding Principles
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                Our Core Humanitarian Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Absolute Trust & Privacy</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  We never publish personal phone numbers without explicit consent. Donors can manage their public visibility with a single toggle.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Hyper-Local Speed</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  When an emergency occurs, seconds count. Our structured division, district, and upazila data matches donors within proximity of the hospital.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Clinical Integrity</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  RedHope works alongside certified healthcare facilities, promoting responsible screening, donor rest cycles, and strict medical ethics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Advisory Disclaimer */}
        <section className="py-12 bg-rose-50 border-t border-rose-200/60">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider">
              Medical Advisory & Screening Notice
            </h4>
            <p className="text-xs text-red-700/80 mt-2 leading-relaxed">
              RedHope is a technology coordination platform and not a licensed clinical blood bank or testing laboratory. All blood must undergo official transfusion transmissible infection (TTI) testing and cross-matching by certified medical personnel at the receiving healthcare institution prior to transfusion.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
