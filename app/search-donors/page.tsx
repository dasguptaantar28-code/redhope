"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  Filter,
  Droplet,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Share2,
  RotateCcw,
} from "lucide-react";
import {
  BLOOD_GROUPS,
  getDivisions,
  getDistricts,
  getUpazilas,
  getDistrictNameById,
} from "@/lib/locations";
import { redHopeStore } from "@/lib/store";
import { Donor, Profile } from "@/types/database";
import { useAuth } from "@/context/AuthContext";

function SearchDonorsContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Filters State
  const [bloodGroup, setBloodGroup] = useState<string>(searchParams.get("blood_group") || "");
  const [division, setDivision] = useState<string>(searchParams.get("division") || "");
  const [district, setDistrict] = useState<string>(searchParams.get("district") || "");
  const [upazila, setUpazila] = useState<string>(searchParams.get("upazila") || "");
  const [isAvailable, setIsAvailable] = useState<boolean>(searchParams.get("available") === "true");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Contact Request Modal State
  const [selectedDonorForContact, setSelectedDonorForContact] = useState<(Donor & { profile: Profile }) | null>(null);
  const [contactReason, setContactReason] = useState("");
  const [contactPatientName, setContactPatientName] = useState("");
  const [contactPhone, setContactPhone] = useState(user?.phone || "");
  const [contactRequesterName, setContactRequesterName] = useState(user?.full_name || "");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Donors
  const [allDonors, setAllDonors] = useState<(Donor & { profile: Profile })[]>([]);

  useEffect(() => {
    setAllDonors(redHopeStore.getDonors());
  }, []);

  const divisions = getDivisions();
  const districts = getDistricts(division || undefined);
  const upazilas = district ? getUpazilas(district) : [];

  // Filtered Donors
  const filteredDonors = useMemo(() => {
    return allDonors.filter((d) => {
      // Must be consented to appear in public search
      if (!d.is_public_search) return false;

      if (bloodGroup && d.blood_group !== bloodGroup) return false;
      if (division && d.division !== division) return false;
      if (district && d.district !== district) return false;
      if (upazila && !d.upazila.toLowerCase().includes(upazila.toLowerCase())) return false;
      if (isAvailable && !d.is_available) return false;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = d.profile.full_name.toLowerCase().includes(term);
        const matchesDistrict = d.district.toLowerCase().includes(term);
        const matchesUpazila = d.upazila.toLowerCase().includes(term);
        if (!matchesName && !matchesDistrict && !matchesUpazila) return false;
      }

      return true;
    });
  }, [allDonors, bloodGroup, division, district, upazila, isAvailable, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDonors.length / ITEMS_PER_PAGE) || 1;
  const paginatedDonors = filteredDonors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleResetFilters = () => {
    setBloodGroup("");
    setDivision("");
    setDistrict("");
    setUpazila("");
    setIsAvailable(false);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleSendContactRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonorForContact) return;

    redHopeStore.createContactRequest({
      requester_id: user?.id || "guest_" + Date.now(),
      donor_id: selectedDonorForContact.id,
      requester_name: contactRequesterName || "Anonymous Attendant",
      requester_phone: contactPhone,
      reason: `${contactPatientName ? "Patient: " + contactPatientName + " — " : ""}${contactReason}`,
    });

    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setSelectedDonorForContact(null);
      setContactReason("");
      setContactPatientName("");
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Live Bangladesh Donor Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              Search Blood Donors
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Find and connect with available blood donors across all 64 districts with strict privacy preservation.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Keyword Search */}
              <div className="grow relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by donor name, upazila, or area..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              {/* Reset button */}
              {(bloodGroup || division || district || upazila || isAvailable || searchTerm) && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-xl transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Blood group selector pills */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-700 block mb-2">Blood Group:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setBloodGroup("");
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    !bloodGroup
                      ? "bg-red-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Groups
                </button>
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => {
                      setBloodGroup(bloodGroup === bg ? "" : bg);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      bloodGroup === bg
                        ? "bg-red-600 text-white shadow-xs scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-red-600"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Cascading Location Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Division</label>
                <select
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                    setDistrict("");
                    setUpazila("");
                    setCurrentPage(1);
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                >
                  <option value="">All Divisions</option>
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.bn_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila("");
                    setCurrentPage(1);
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                >
                  <option value="">All Districts</option>
                  {districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name} ({dist.bn_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Upazila / Thana</label>
                <select
                  value={upazila}
                  onChange={(e) => {
                    setUpazila(e.target.value);
                    setCurrentPage(1);
                  }}
                  disabled={!district}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:bg-gray-50"
                >
                  <option value="">{district ? "All Upazilas" : "Select District first"}</option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer pt-4 text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => {
                      setIsAvailable(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <span>Only Available Donors</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
            <span>
              Showing <strong>{filteredDonors.length}</strong> verified voluntary blood donors
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Donor Cards Grid */}
          {filteredDonors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 max-w-lg mx-auto">
              <Droplet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">No Donors Found Matching Criteria</h3>
              <p className="text-xs text-gray-500 mt-1">
                Try widening your search location or resetting your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-red-600 rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedDonors.map((donor) => {
                const districtName = getDistrictNameById(donor.district);
                return (
                  <div
                    key={donor.id}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black flex items-center justify-center text-lg shadow-sm shadow-red-500/20">
                          {donor.blood_group}
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            donor.is_available
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {donor.is_available ? "Available" : "Resting"}
                        </span>
                      </div>

                      {/* Donor Name & Location */}
                      <h3 className="font-bold text-gray-900 text-base">{donor.profile.full_name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">
                          {donor.upazila ? `${donor.upazila}, ` : ""}
                          {districtName}
                        </span>
                      </div>

                      {/* Bio or volunteer statement */}
                      {donor.bio && (
                        <p className="text-xs text-gray-600 italic line-clamp-2 mt-3 bg-gray-50 p-2.5 rounded-xl">
                          &ldquo;{donor.bio}&rdquo;
                        </p>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mt-4 py-2.5 bg-gray-50/70 rounded-2xl text-[11px] text-center">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Donations</span>
                          <span className="font-bold text-gray-900">{donor.total_donations} Times</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Last Donated</span>
                          <span className="font-semibold text-gray-700">
                            {donor.last_donation_date || "First-time"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 mt-4 border-t border-gray-100">
                      {donor.phone_public ? (
                        <a
                          href={`tel:${donor.profile.phone}`}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call: {donor.profile.phone}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedDonorForContact(donor)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs shadow-red-500/20 transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Request Contact Info</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-red-600 text-white shadow-xs"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Privacy-Preserving Contact Request Modal */}
      {selectedDonorForContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedDonorForContact(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 font-bold flex items-center justify-center text-lg">
                {selectedDonorForContact.blood_group}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  Request Contact Details
                </h3>
                <p className="text-xs text-gray-500">
                  Donor: {selectedDonorForContact.profile.full_name}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4 bg-rose-50 p-3 rounded-2xl border border-rose-100">
              To protect lifesavers against unsolicited marketing, phone numbers are masked.
              Submitting this emergency request notifies the donor immediately via SMS / in-app alert.
            </p>

            {contactSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs text-center font-semibold">
                Contact request dispatched to {selectedDonorForContact.profile.full_name}!
                They will receive your phone number and emergency case details shortly.
              </div>
            ) : (
              <form onSubmit={handleSendContactRequest} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name (Attendant / Doctor) *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactRequesterName}
                    onChange={(e) => setContactRequesterName(e.target.value)}
                    placeholder="e.g. Dr. Alam / Rafiqul Islam"
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Patient Name & Hospital *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPatientName}
                    onChange={(e) => setContactPatientName(e.target.value)}
                    placeholder="e.g. Begum Nazma, DMCH Ward 4"
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Emergency Reason / Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={contactReason}
                    onChange={(e) => setContactReason(e.target.value)}
                    placeholder="Urgent open heart surgery requires 2 bags by tomorrow morning..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-500/25 transition-all mt-2"
                >
                  Send Urgent Contact Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function SearchDonorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading donors...</div>}>
      <SearchDonorsContent />
    </Suspense>
  );
}
