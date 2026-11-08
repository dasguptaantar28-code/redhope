"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Quote, Heart } from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { Testimonial } from "@/types/database";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(redHopeStore.getTestimonials());
  }, []);

  return (
    <section className="py-20 bg-rose-50/40 border-t border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-2xs">
            Voices of Hope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
            Real Stories of Lives Saved
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Hear from grateful patient families, regular lifesavers, and hospital physicians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-rose-100 absolute top-6 right-6 -z-0" />

              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-red-100 shrink-0">
                  {t.photo_url ? (
                    <Image src={t.photo_url} alt={t.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-red-600">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                  {t.blood_group && (
                    <span className="inline-block mt-0.5 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.2 rounded-full">
                      Blood Group: {t.blood_group}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
