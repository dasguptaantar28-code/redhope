"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Plus,
} from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { BloodRequest } from "@/types/database";

export default function UrgentRequestsSection() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    // Only display verified and in_progress requests publicly on the homepage
    const all = redHopeStore.getBloodRequests();
    const verified = all.filter((r) => r.status === "verified" || r.status === "in_progress");
    setRequests(verified.slice(0, 4));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-3.5 h-3.5" /> Emergency Hospital Feed
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Urgent Blood Requests
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Verified patient cases across Bangladesh waiting for lifesavers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blood-requests/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-50 text-red-600 border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              <Plus className="w-4 h-4" /> Post a Blood Request
            </Link>
            <Link
              href="/blood-requests"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
            >
              <span>View All Requests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <Droplet className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">No urgent pending requests at this moment.</p>
            <p className="text-xs text-gray-400 mt-1">All verified hospital emergencies have been fulfilled.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Blood Group & Urgency */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                        <span className="text-xl leading-none">{req.blood_group}</span>
                        <span className="text-[10px] uppercase font-bold text-rose-200">Needed</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{req.patient_name}</h3>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Admin Verified</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        req.urgency === "critical"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : req.urgency === "urgent"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {req.urgency}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs text-gray-600 bg-gray-50/70 p-3.5 rounded-2xl mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">{req.hospital_name}</p>
                        <p className="text-gray-500">{req.hospital_address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{req.required_date}</span>
                      </div>
                      <div className="font-bold text-red-600">
                        {req.bags_needed} {req.bags_needed > 1 ? "Bags" : "Bag"} Needed
                      </div>
                    </div>
                  </div>

                  {req.notes && (
                    <p className="text-xs text-gray-500 italic line-clamp-2 mb-4">
                      &ldquo;{req.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blood-requests/${req.id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 transition-all"
                  >
                    <span>View Details & Help</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
