"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  Filter,
  AlertCircle,
  Share2,
} from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { BloodRequest } from "@/types/database";
import { BLOOD_GROUPS, getDivisions, getDistrictNameById } from "@/lib/locations";

export default function BloodRequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");

  useEffect(() => {
    setRequests(redHopeStore.getBloodRequests());
  }, []);

  const divisions = getDivisions();

  // Public visitors see verified and in_progress requests
  const filtered = requests.filter((r) => {
    if (r.status === "rejected" || r.status === "cancelled") return false;
    if (bloodGroupFilter && r.blood_group !== bloodGroupFilter) return false;
    if (divisionFilter && r.division !== divisionFilter) return false;
    if (urgencyFilter && r.urgency !== urgencyFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
                Active Hospital Emergencies
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
                Blood Donation Requests
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Verified cases requiring compassionate donors across Bangladesh.
              </p>
            </div>

            <Link
              href="/blood-requests/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-500/25 transition-all self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Blood Request</span>
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Blood group pills */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-700 mr-2">Blood Group:</span>
                <button
                  onClick={() => setBloodGroupFilter("")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    !bloodGroupFilter
                      ? "bg-red-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBloodGroupFilter(bloodGroupFilter === bg ? "" : bg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      bloodGroupFilter === bg
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-red-600"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              {/* Division selector */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Divisions</option>
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>

                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Urgency</option>
                  <option value="critical">Critical</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of requests */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 max-w-md mx-auto">
              <Droplet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">No Blood Requests Found</h3>
              <p className="text-xs text-gray-500 mt-1">
                There are no active requests matching your selected filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((req) => {
                const districtName = getDistrictNameById(req.district);
                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                            <span className="text-xl leading-none">{req.blood_group}</span>
                            <span className="text-[10px] uppercase font-bold text-rose-200">
                              Needed
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-base">
                              {req.patient_name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-0.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span className="capitalize">{req.status} Request</span>
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

                      {/* Details Box */}
                      <div className="space-y-2 text-xs text-gray-600 bg-gray-50/80 p-3.5 rounded-2xl mb-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-gray-900">{req.hospital_name}</p>
                            <p className="text-gray-500">
                              {req.upazila ? `${req.upazila}, ` : ""}
                              {districtName}
                            </p>
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
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
