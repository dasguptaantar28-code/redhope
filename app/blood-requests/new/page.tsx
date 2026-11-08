"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  Building,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import {
  BLOOD_GROUPS,
  getDivisions,
  getDistricts,
  getUpazilas,
  BloodGroup,
} from "@/lib/locations";
import { redHopeStore } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import { RequestUrgency } from "@/types/database";

export default function NewBloodRequestPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | "">("");
  const [bagsNeeded, setBagsNeeded] = useState(1);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [requiredTime, setRequiredTime] = useState("");
  const [contactPerson, setContactPerson] = useState(user?.full_name || "");
  const [contactPhone, setContactPhone] = useState(user?.phone || "");
  const [urgency, setUrgency] = useState<RequestUrgency>("urgent");
  const [notes, setNotes] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const divisions = getDivisions();
  const districts = getDistricts(division || undefined);
  const upazilas = district ? getUpazilas(district) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!patientName.trim()) return setErrorMsg("Patient name is required.");
    if (!bloodGroup) return setErrorMsg("Please select the required blood group.");
    if (!hospitalName.trim()) return setErrorMsg("Hospital name is required.");
    if (!division) return setErrorMsg("Please select division.");
    if (!district) return setErrorMsg("Please select district.");
    if (!requiredDate) return setErrorMsg("Required date is needed.");
    if (!contactPerson.trim()) return setErrorMsg("Contact person name is required.");
    if (!contactPhone.trim() || contactPhone.length < 11) return setErrorMsg("Valid contact phone number is required.");

    setIsSubmitting(true);

    try {
      const newReq = redHopeStore.createBloodRequest({
        user_id: user?.id || "guest_requester",
        patient_name: patientName,
        blood_group: bloodGroup as any,
        bags_needed: Number(bagsNeeded) || 1,
        hospital_name: hospitalName,
        hospital_address: hospitalAddress || `${upazila || district}, Bangladesh`,
        division,
        district,
        upazila: upazila || "Sadar",
        required_date: requiredDate,
        required_time: requiredTime || "Urgent",
        contact_person: contactPerson,
        contact_phone: contactPhone,
        urgency,
        notes,
      });

      setSuccessMsg("Blood request submitted! It has been routed to our verification queue.");
      setTimeout(() => {
        router.push(`/blood-requests/${newReq.id}`);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit blood request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Hospital Emergency Broadcast
            </span>
            <h1 className="text-3xl font-black text-gray-900 mt-2">
              Post an Emergency Blood Request
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Broadcast your patient&apos;s need to registered lifesavers in your district.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-red-950/5 border border-red-100 p-6 sm:p-10">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient and Blood Need */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Patient Name / Age / Ward *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Begum Rabeya (45), CCU Ward"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Number of Blood Bags Needed *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={bagsNeeded}
                    onChange={(e) => setBagsNeeded(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Blood group pills */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Blood Group Required * (প্রয়োজনীয় রক্তের গ্রুপ)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {BLOOD_GROUPS.map((bg) => (
                    <button
                      type="button"
                      key={bg}
                      onClick={() => setBloodGroup(bg)}
                      className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        bloodGroup === bg
                          ? "bg-red-600 border-red-600 text-white shadow-xs scale-105"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-red-300"
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Emergency Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["normal", "urgent", "critical"] as RequestUrgency[]).map((u) => (
                    <button
                      type="button"
                      key={u}
                      onClick={() => setUrgency(u)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase transition-all border-2 ${
                        urgency === u
                          ? u === "critical"
                            ? "bg-red-600 border-red-600 text-white"
                            : u === "urgent"
                            ? "bg-amber-500 border-amber-500 text-white"
                            : "bg-blue-600 border-blue-600 text-white"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hospital Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaka Medical College Hospital"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Hospital Address / Floor / Cabin
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3rd Floor, Post-Operative OT counter"
                    value={hospitalAddress}
                    onChange={(e) => setHospitalAddress(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Location Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Division *
                  </label>
                  <select
                    required
                    value={division}
                    onChange={(e) => {
                      setDivision(e.target.value);
                      setDistrict("");
                      setUpazila("");
                    }}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  >
                    <option value="">Select Division</option>
                    {divisions.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    District *
                  </label>
                  <select
                    required
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setUpazila("");
                    }}
                    disabled={!division}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:bg-gray-100"
                  >
                    <option value="">Select District</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Upazila / Area
                  </label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    disabled={!district}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:bg-gray-100"
                  >
                    <option value="">{district ? "Select Upazila" : "Select District first"}</option>
                    {upazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Required Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Required Time (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM / Morning Shift"
                    value={requiredTime}
                    onChange={(e) => setRequiredTime(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Person Name * (Attendant / Relative)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahfuzur Rahman (Brother)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Phone Number * (24/7 Reachable)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Clinical Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Additional Clinical Notes / Diagnosis
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Road accident trauma care; patient has Hb 7.2; blood requisition slip has been signed by doctor."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              {/* Notice */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Anti-Scam Verification:</strong> All submitted blood requests are reviewed by RedHope administrators. Fake or commercial blood requests are strictly prohibited and will be reported to law enforcement.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-500/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Broadcasting Emergency..." : "Submit Emergency Blood Request"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
