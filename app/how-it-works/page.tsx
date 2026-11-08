import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  UserPlus,
  CheckCircle,
  Search,
  PhoneCall,
  HeartHandshake,
  ShieldCheck,
  Droplet,
  Clock,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "How It Works — RedHope | Donate Blood • Save Lives",
  description: "Understand the end-to-end blood donation and donor matching process on RedHope.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Register as a Voluntary Donor",
      bnTitle: "রক্তদাতা হিসেবে নিবন্ধন",
      desc: "Create your free lifesaver account in under a minute with your blood group, division, and district.",
      details: [
        "100% Free with zero registration charges.",
        "Choose whether you want your phone number public or kept private.",
        "Set your last donation date to track your recovery window.",
      ],
      icon: UserPlus,
    },
    {
      num: "02",
      title: "Receive Hyper-Local Emergency Alerts",
      bnTitle: "জরুরি নোটিফিকেশন গ্রহণ",
      desc: "When a verified patient in your district needs your exact blood group, our platform alerts you.",
      details: [
        "In-app notifications and SMS matching.",
        "Zero unsolicited spam calls.",
        "Option to toggle availability when busy or recovering.",
      ],
      icon: Clock,
    },
    {
      num: "03",
      title: "Pre-Donation Hospital Screening",
      bnTitle: "হাসপাতালে প্রাথমিক স্বাস্থ্য পরীক্ষা",
      desc: "Meet the patient attendant at the licensed healthcare facility for quick medical screening.",
      details: [
        "Weight check (minimum 45-50 kg).",
        "Hemoglobin check (minimum 12.5 g/dL).",
        "Blood pressure and pulse verification by clinical staff.",
      ],
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Safe 10-Minute Blood Donation",
      bnTitle: "নিরাপদ রক্তদান",
      desc: "Sit comfortably while single-use sterile medical equipment collects approximately 350-450 ml of whole blood.",
      details: [
        "Brand-new sterile needle and blood collection bag.",
        "Completely safe with zero risk of infection.",
        "Complimentary recovery juice and cookies.",
      ],
      icon: Droplet,
    },
    {
      num: "05",
      title: "Life Saved & History Logged",
      bnTitle: "জীবন বাঁচানোর আনন্দ",
      desc: "Log your donation in your RedHope donor dashboard and celebrate your contribution to humanity.",
      details: [
        "Your body restores plasma fluid within 24 to 48 hours.",
        "One unit can save up to 3 separate patient lives.",
        "Automatic reminder after 90 to 120 days for your next eligible donation.",
      ],
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/60">
      <Navbar />

      <main className="grow py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Complete Transparency
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mt-3">
              How RedHope Works
            </h1>
            <p className="text-base text-gray-600 mt-4 leading-relaxed">
              From the moment a patient files an urgent request to the moment a lifesaver donates, our structured workflow protects clinical safety, patient integrity, and donor privacy.
            </p>
          </div>

          {/* Detailed Step Cards */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="grow space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full uppercase">
                        Step {s.num}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>

                    <div className="pt-2 space-y-1.5">
                      {s.details.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-16 text-center bg-red-600 text-white rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Join Bangladesh&apos;s Lifesavers?</h3>
            <p className="text-rose-100 text-sm mt-2 max-w-xl mx-auto">
              Registration is fast, secure, and completely non-profit. Your donation can save someone&apos;s loved one.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/become-a-donor"
                className="px-8 py-3.5 rounded-full bg-white text-red-600 font-bold text-sm shadow-md hover:bg-rose-50 transition-colors"
              >
                Become a Donor Now
              </Link>
              <Link
                href="/eligibility"
                className="px-8 py-3.5 rounded-full bg-red-700 hover:bg-red-800 text-white font-semibold text-sm transition-colors border border-red-500"
              >
                Take Eligibility Quiz
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
