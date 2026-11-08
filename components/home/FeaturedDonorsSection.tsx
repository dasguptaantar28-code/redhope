"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Droplet,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { Donor, Profile } from "@/types/database";
import { getDistrictNameById } from "@/lib/locations";

export default function FeaturedDonorsSection() {
  const [donors, setDonors] = useState<(Donor & { profile: Profile })[]>([]);

  useEffect(() => {
    const list = redHopeStore.getDonors();
    // Only donors who consented to appear in public search results and are active
    const publicDonors = list.filter((d) => d.is_public_search);
    setDonors(publicDonors.slice(0, 4));
  }, []);

  return (
    <section className="py-20 bg-gray-50/60 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Voluntary Lifesavers
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
              Featured Blood Donors
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Active verified donors ready to respond to hospital emergencies.
            </p>
          </div>

          <Link
            href="/search-donors"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-gray-800 border border-gray-200 hover:border-red-300 hover:text-red-600 shadow-xs transition-all"
          >
            <span>Search All Donors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donors.map((donor) => {
            const districtName = getDistrictNameById(donor.district);
            return (
              <div
                key={donor.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between text-center relative group"
              >
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      donor.is_available
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        donor.is_available ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    {donor.is_available ? "Available" : "Resting"}
                  </span>
                </div>

                <div>
                  {/* Avatar */}
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full p-1 border-2 border-red-500/20 group-hover:border-red-500 transition-colors">
                    {donor.profile.avatar_url ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={donor.profile.avatar_url}
                          alt={donor.profile.full_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-red-100 text-red-600 font-black text-xl flex items-center justify-center">
                        {donor.profile.full_name.charAt(0)}
                      </div>
                    )}

                    {/* Blood Group Badge attached to avatar */}
                    <div className="absolute -bottom-1 -right-1 bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded-full border-2 border-white shadow-xs">
                      {donor.blood_group}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-base">{donor.profile.full_name}</h3>

                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>
                      {donor.upazila ? `${donor.upazila}, ` : ""}
                      {districtName}
                    </span>
                  </div>

                  {/* Donor Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-4 py-3 bg-gray-50 rounded-2xl text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                        Donations
                      </span>
                      <span className="font-black text-gray-900 text-sm">
                        {donor.total_donations} Times
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                        Last Donated
                      </span>
                      <span className="font-medium text-gray-700 text-xs">
                        {donor.last_donation_date || "First-timer"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <Link
                    href={`/search-donors?donor_id=${donor.id}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-red-600 bg-rose-50 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
