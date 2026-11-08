"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Heart,
  Droplet,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MapPin,
  Phone,
  Power,
  Eye,
  EyeOff,
  User,
  PlusCircle,
  FileCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { redHopeStore } from "@/lib/store";
import { Donor, BloodRequest, ContactRequest, DonationRecord } from "@/types/database";
import { getDistrictNameById } from "@/lib/locations";

export default function DonorDashboardPage() {
  const { user, donorProfile, updateDonorProfile } = useAuth();

  const [donor, setDonor] = useState<Donor | null>(null);
  const [matchingRequests, setMatchingRequests] = useState<BloodRequest[]>([]);
  const [incomingContactRequests, setIncomingContactRequests] = useState<ContactRequest[]>([]);
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);

  // Toggle state
  const [isAvailable, setIsAvailable] = useState(true);
  const [isPublicSearch, setIsPublicSearch] = useState(true);
  const [phonePublic, setPhonePublic] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // New donation logging state
  const [showLogModal, setShowLogModal] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [donationDate, setDonationDate] = useState(new Date().toISOString().split("T")[0]);
  const [donationNotes, setDonationNotes] = useState("");

  useEffect(() => {
    if (user) {
      let d = donorProfile;
      if (!d) {
        d = redHopeStore.getDonorById(user.id);
      }
      if (d) {
        setDonor(d);
        setIsAvailable(d.is_available);
        setIsPublicSearch(d.is_public_search);
        setPhonePublic(d.phone_public);

        // Find matching verified urgent requests with same blood group and district
        const allRequests = redHopeStore.getBloodRequests();
        const matches = allRequests.filter(
          (r) =>
            r.blood_group === d!.blood_group &&
            r.district === d!.district &&
            (r.status === "verified" || r.status === "in_progress")
        );
        setMatchingRequests(matches);

        // Incoming contact requests
        const contacts = redHopeStore.getContactRequests().filter((c) => c.donor_id === d!.id);
        setIncomingContactRequests(contacts);

        // Donations history
        const records = redHopeStore.getDonations().filter((rec) => rec.donor_id === d!.id);
        setDonationHistory(records);
      }
    }
  }, [user, donorProfile]);

  const handleToggleAvailability = async () => {
    if (!donor) return;
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    setSavingSettings(true);
    await updateDonorProfile({ is_available: nextState });
    setSavingSettings(false);
    setStatusMsg(nextState ? "You are now marked as AVAILABLE for donation." : "You are now marked as RESTING.");
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleTogglePublicSearch = async () => {
    if (!donor) return;
    const nextState = !isPublicSearch;
    setIsPublicSearch(nextState);
    await updateDonorProfile({ is_public_search: nextState });
    setStatusMsg(nextState ? "Your profile is now visible in public search." : "Your profile is hidden from search.");
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleTogglePhonePublic = async () => {
    if (!donor) return;
    const nextState = !phonePublic;
    setPhonePublic(nextState);
    await updateDonorProfile({ phone_public: nextState });
    setStatusMsg(nextState ? "Your phone number is now publicly visible." : "Your phone is masked (contact request required).");
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleApproveContactRequest = (id: string) => {
    redHopeStore.updateContactRequestStatus(id, "approved");
    if (donor) {
      setIncomingContactRequests(redHopeStore.getContactRequests().filter((c) => c.donor_id === donor.id));
    }
    alert("Contact request approved! The requester has been notified with your contact details.");
  };

  const handleDeclineContactRequest = (id: string) => {
    redHopeStore.updateContactRequestStatus(id, "declined");
    if (donor) {
      setIncomingContactRequests(redHopeStore.getContactRequests().filter((c) => c.donor_id === donor.id));
    }
  };

  const handleLogDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donor || !hospitalName) return;

    redHopeStore.addDonation({
      donor_id: donor.id,
      patient_name: patientName || "Emergency Patient",
      blood_group: donor.blood_group,
      hospital_name: hospitalName,
      district: donor.district,
      donation_date: donationDate,
      bags_donated: 1,
      notes: donationNotes,
    });

    // Refresh history
    setDonationHistory(redHopeStore.getDonations().filter((rec) => rec.donor_id === donor.id));
    setDonor(redHopeStore.getDonorById(donor.id));
    setShowLogModal(false);
    setPatientName("");
    setHospitalName("");
    setDonationNotes("");
    setStatusMsg("Donation logged successfully! Thank you for saving a life.");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm">
            <Heart className="w-10 h-10 text-red-500 fill-red-500 mx-auto mb-3" />
            <h2 className="text-base font-bold text-gray-900">Donor Portal Sign In</h2>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Please sign in to access your donor dashboard.
            </p>
            <Link
              href="/login?redirect=/donor-dashboard"
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Log In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const districtName = donor ? getDistrictNameById(donor.district) : "";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Alert Banner */}
          {statusMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-600 text-white font-black flex flex-col items-center justify-center shadow-lg shadow-red-500/25">
                <span className="text-2xl sm:text-3xl leading-none">{donor?.blood_group || "O+"}</span>
                <span className="text-[10px] uppercase font-bold text-rose-200">Donor</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-900">{user.full_name}</h1>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 uppercase">
                    Verified Donor
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {donor?.upazila ? `${donor.upazila}, ` : ""}
                    {districtName}
                  </span>
                  <span>•</span>
                  <span>Total Donations: <strong>{donor?.total_donations || 0} Times</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Toggle Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleToggleAvailability}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all ${
                  isAvailable
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{isAvailable ? "Status: Ready to Donate" : "Status: Resting / Inactive"}</span>
              </button>

              <button
                onClick={() => setShowLogModal(true)}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Log a Donation</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Matching Requests & Contact Requests */}
            <div className="lg:col-span-8 space-y-8">
              {/* Matching Urgent Blood Requests in Donor District */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
                    <h3 className="font-bold text-gray-900 text-base">
                      Matching Emergency Requests ({matchingRequests.length})
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Matches your {donor?.blood_group} group in {districtName}
                  </span>
                </div>

                {matchingRequests.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    No urgent pending hospital requests match your blood group in {districtName} right now.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matchingRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-red-600 text-white">
                              {req.blood_group}
                            </span>
                            <h4 className="font-bold text-gray-900 text-sm">{req.patient_name}</h4>
                            <span className="text-[10px] uppercase font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                              {req.urgency}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {req.hospital_name} • {req.bags_needed} Bags Needed by {req.required_date}
                          </p>
                          {req.notes && (
                            <p className="text-xs text-gray-500 italic mt-1 line-clamp-1">
                              &ldquo;{req.notes}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href={`/blood-requests/${req.id}`}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                          >
                            Respond & Donate
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Incoming Contact Requests */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-700" />
                    <h3 className="font-bold text-gray-900 text-base">
                      Incoming Contact Requests ({incomingContactRequests.length})
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-400">Privacy-preserving inquiries</span>
                </div>

                {incomingContactRequests.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    No patient families have submitted private contact requests recently.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incomingContactRequests.map((cr) => (
                      <div
                        key={cr.id}
                        className="p-5 rounded-2xl border border-gray-100 bg-gray-50 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-gray-900 text-xs">
                              {cr.requester_name} ({cr.requester_phone})
                            </h4>
                            <p className="text-xs text-gray-600 mt-0.5">{cr.reason}</p>
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              cr.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : cr.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {cr.status}
                          </span>
                        </div>

                        {cr.status === "pending" && (
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/50">
                            <button
                              onClick={() => handleDeclineContactRequest(cr.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-200"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => handleApproveContactRequest(cr.id)}
                              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                            >
                              Share My Phone Number
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Donation History Records */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-gray-900 text-base">
                      My Donation History ({donationHistory.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowLogModal(true)}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    + Record New
                  </button>
                </div>

                {donationHistory.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    No donation logs recorded yet. Click &ldquo;Log a Donation&rdquo; to track your life-saving milestones!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {donationHistory.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-bold text-gray-900">{rec.hospital_name}</span>
                          <p className="text-gray-500 text-[11px]">
                            Patient: {rec.patient_name || "Emergency Patient"} • {rec.bags_donated} Bag
                          </p>
                          {rec.notes && <p className="text-gray-600 italic mt-0.5">&ldquo;{rec.notes}&rdquo;</p>}
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-semibold text-gray-800">{rec.donation_date}</span>
                          <span className="block text-[10px] text-emerald-600 font-bold">Verified Transfusion</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Privacy & Donor Settings */}
            <div className="lg:col-span-4 space-y-6">
              {/* Privacy Management Card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Privacy & Search Controls</span>
                </h3>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">Public Search Visibility</span>
                      <button
                        onClick={handleTogglePublicSearch}
                        className={`w-10 h-6 rounded-full transition-colors p-0.5 ${
                          isPublicSearch ? "bg-red-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            isPublicSearch ? "translate-x-4" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      When enabled, your profile appears in search results for {donor?.blood_group} in {districtName}.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">Direct Phone Display</span>
                      <button
                        onClick={handleTogglePhonePublic}
                        className={`w-10 h-6 rounded-full transition-colors p-0.5 ${
                          phonePublic ? "bg-red-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            phonePublic ? "translate-x-4" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      If disabled (recommended), patients must send a privacy contact request to obtain your phone number.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Safe Interval Card */}
              <div className="bg-rose-50/70 rounded-3xl p-6 border border-rose-100 space-y-3">
                <div className="flex items-center gap-2 text-red-700">
                  <Calendar className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Resting Interval Guidelines</h4>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Whole blood donors should maintain an interval of at least <strong>90 days (males)</strong> or <strong>120 days (females)</strong> between full donations to allow complete red blood cell regeneration.
                </p>
                <div className="text-[11px] text-gray-500 pt-2 border-t border-rose-200/50">
                  Last recorded donation: <strong>{donor?.last_donation_date || "Not logged"}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Log Donation Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Record a Blood Donation</h3>
            <p className="text-xs text-gray-500">
              Log details of your recent hospital transfusion to maintain your verified lifesaver badge.
            </p>

            <form onSubmit={handleLogDonation} className="space-y-3">
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
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Patient Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master Arian"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Donation Date *
                </label>
                <input
                  type="date"
                  required
                  value={donationDate}
                  onChange={(e) => setDonationDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Direct transfusion at OT; recovery smooth."
                  value={donationNotes}
                  onChange={(e) => setDonationNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
