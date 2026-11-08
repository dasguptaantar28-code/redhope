import React from "react";
import { Heart, Users, Shield, Award, Check } from "lucide-react";

export default function WhyDonateSection() {
  const cards = [
    {
      title: "Save Lives",
      bnTitle: "জীবন বাঁচান",
      description:
        "A single bag of whole blood can be separated into red cells, plasma, and platelets to save up to three lives in emergency surgery, child delivery, or trauma.",
      icon: Heart,
      color: "bg-red-500",
      lightColor: "bg-red-50 text-red-600",
    },
    {
      title: "Help Others",
      bnTitle: "অন্যের পাশে দাঁড়ান",
      description:
        "Give families hope during their darkest hours. Your 15 minutes in a donor chair can gift decades of memories to a recovering parent or child.",
      icon: Users,
      color: "bg-rose-500",
      lightColor: "bg-rose-50 text-rose-600",
    },
    {
      title: "Support Your Community",
      bnTitle: "সমাজের কল্যাণ করুন",
      description:
        "Strengthen Bangladesh’s healthcare resilience. A reliable voluntary blood pool ensures hospitals are never paralyzed during natural disasters or major accidents.",
      icon: Shield,
      color: "bg-red-600",
      lightColor: "bg-red-50 text-red-700",
    },
    {
      title: "Become a Hero",
      bnTitle: "একজন প্রকৃত হিরো হোন",
      description:
        "You don't need a cape to be a real-world lifesaver. Regular blood donors enjoy revitalized cardiovascular health and the deep spiritual fulfillment of giving life.",
      icon: Award,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Humanitarian Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
            Why Donate Blood With RedHope?
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Blood cannot be manufactured in a laboratory. It can only come as a voluntary gift from one generous human to another.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-red-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${c.lightColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-red-500 font-bengali font-semibold mt-0.5">
                    {c.bnTitle}
                  </p>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Clinically Safe & Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
