"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Droplet, Filter } from "lucide-react";
import {
  BLOOD_GROUPS,
  getDivisions,
  getDistricts,
  getUpazilas,
} from "@/lib/locations";

export default function QuickSearchSection() {
  const router = useRouter();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);

  const divisions = getDivisions();
  const districts = getDistricts(selectedDivision || undefined);
  const upazilas = selectedDistrict ? getUpazilas(selectedDistrict) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup) params.set("blood_group", selectedBloodGroup);
    if (selectedDivision) params.set("division", selectedDivision);
    if (selectedDistrict) params.set("district", selectedDistrict);
    if (selectedUpazila) params.set("upazila", selectedUpazila);
    if (onlyAvailable) params.set("available", "true");

    router.push(`/search-donors?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-red-950/5 border border-red-100 p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-2xl pointer-events-none -z-0" />

          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" /> Instant Donor Finder
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                Find Compatible Blood Donors in Bangladesh
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Filter through verified voluntary lifesavers across all 64 districts.
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Blood group selector pills */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Select Blood Group / রক্তের গ্রুপ নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
                  {BLOOD_GROUPS.map((bg) => {
                    const isSelected = selectedBloodGroup === bg;
                    return (
                      <button
                        type="button"
                        key={bg}
                        onClick={() => setSelectedBloodGroup(isSelected ? "" : bg)}
                        className={`py-3 px-2 rounded-2xl font-black text-sm transition-all flex flex-col items-center justify-center border-2 ${
                          isSelected
                            ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-500/30 scale-105"
                            : "bg-gray-50 border-gray-100 text-gray-800 hover:border-red-200 hover:bg-rose-50/50"
                        }`}
                      >
                        <Droplet
                          className={`w-4 h-4 mb-1 ${
                            isSelected ? "fill-white text-white" : "text-red-500"
                          }`}
                        />
                        <span>{bg}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Cascading Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Division */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Division / বিভাগ
                  </label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedDistrict("");
                      setSelectedUpazila("");
                    }}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Divisions (সকল বিভাগ)</option>
                    {divisions.map((div) => (
                      <option key={div.id} value={div.id}>
                        {div.name} ({div.bn_name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    District / জেলা
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedUpazila("");
                    }}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Districts (সকল জেলা)</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.bn_name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Upazila / Thana / থানা
                  </label>
                  <select
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    disabled={!selectedDistrict}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">
                      {selectedDistrict ? "All Upazilas (সকল থানা)" : "Select District first"}
                    </option>
                    {upazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name} ({u.bn_name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bottom Search Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={(e) => setOnlyAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <span>Show only immediately available donors (সক্রিয় রক্তদাতা)</span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Donors</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
