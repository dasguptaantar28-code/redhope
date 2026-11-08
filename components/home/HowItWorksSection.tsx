import React from "react";
import Link from "next/link";
import { UserPlus, UserCheck, Search, PhoneCall, HeartHandshake, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Register as a Donor",
      bnTitle: "রক্তদাতা হিসেবে নিবন্ধন করুন",
      description: "Sign up in 60 seconds with your blood group, division, and district.",
      icon: UserPlus,
    },
    {
      num: "02",
      title: "Complete Your Profile",
      bnTitle: "প্রোফাইল সম্পূর্ণ করুন",
      description: "Set your last donation date and choose your privacy & search visibility preferences.",
      icon: UserCheck,
    },
    {
      num: "03",
      title: "Search for Blood Donors",
      bnTitle: "রক্তদাতা খুঁজুন",
      description: "Patients search by blood group and hyper-local district/upazila.",
      icon: Search,
    },
    {
      num: "04",
      title: "Contact Available Donor",
      bnTitle: "যোগাযোগ করুন",
      description: "Connect safely through our privacy-aware contact request system.",
      icon: PhoneCall,
    },
    {
      num: "05",
      title: "Help Save a Life",
      bnTitle: "জীবন বাঁচান",
      description: "Transfuse safe blood at the hospital and log your heroic contribution.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Transparent & Simple
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
            How RedHope Works
          </h2>
          <p className="text-base text-gray-600 mt-2">
            A seamless 5-step bridge between voluntary lifesavers and hospital patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-rose-50/40 rounded-3xl p-6 border border-rose-100 hover:border-red-300 hover:bg-white hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-red-200 group-hover:text-red-600 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white text-red-600 shadow-xs flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-bengali mt-0.5">{step.bnTitle}</p>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-rose-100/60">
                  <span className="text-[11px] font-semibold text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Step {idx + 1} of 5 <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
          >
            Learn more about medical requirements and hospital protocols <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
