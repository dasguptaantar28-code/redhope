"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { redHopeStore } from "@/lib/store";
import { BloodRequest } from "@/types/database";
import { getDistrictNameById } from "@/lib/locations";
import { useAuth } from "@/context/AuthContext";

function BloodRequestDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [copied, setCopied] = useState(false);
  const [volunteered, setVolunteered] = useState(false);

  const requestId = params?.id as string;

  useEffect(() => {
    if (requestId) {
      const found = redHopeStore.getBloodRequestById(requestId);
      setRequest(found);
    }
  }, [requestId]);

  if (!request) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm">
            <Droplet className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-900">Request Not Found</h2>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              This blood request may have been fulfilled or removed.
            </p>
            <Link
              href="/blood-requests"
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
            >
              Back to All Requests
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const districtName = getDistrictNameById(request.district);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVolunteerToDonate = () => {
    if (!user) {
      router.push(`/login?redirect=/blood-requests/${request.id}`);
      return;
    }

    redHopeStore.addNotification({
      user_id: request.user_id,
      title: "A Volunteer Offered to Donate!",
      message: `${user.full_name} (${user.phone}) responded to your blood request for ${request.patient_name}.`,
      type: "status_update",
      link: `/blood-requests/${request.id}`,
      is_read: false,
    });

    setVolunteered(true);
  };

  const getCompatibleDonors = (recipient: string) => {
    switch (recipient) {
      case "A+":
        return ["A+", "A-", "O+", "O-"];
      case "A-":
        return ["A-", "O-"];
      case "B+":
        return ["B+", "B-", "O+", "O-"];
      case "B-":
        return ["B-", "O-"];
      case "AB+":
        return ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      case "AB-":
        return ["AB-", "A-", "B-", "O-"];
      case "O+":
        return ["O+", "O-"];
      case "O-":
        return ["O- (Only O- Negative)"];
      default:
        return [recipient];
    }
  };

  const compatibleList = getCompatibleDonors(request.blood_group);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blood-requests"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Requests</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl shadow-red-950/5 border border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-red-600 font-black flex flex-col items-center justify-center shadow-lg">
                  <span className="text-2xl sm:text-3xl leading-none">{request.blood_group}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Needed</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20">
                      {request.urgency} Priority
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Case
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
                    {request.patient_name}
                  </h1>
                  <p className="text-xs text-rose-100 mt-0.5">
                    Requires {request.bags_needed} {request.bags_needed > 1 ? "Bags" : "Bag"} of Blood
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/20 backdrop-blur-xs flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Link Copied!" : "Share Request"}</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 animate-heart-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Direct Attendant Phone</p>
                    <p className="text-xl font-black text-gray-900">{request.contact_phone}</p>
                    <p className="text-xs text-gray-600 font-medium">Contact: {request.contact_person}</p>
                  </div>
                </div>

                <a
                  href={`tel:${request.contact_phone}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 text-center transition-all"
                >
                  Call Attendant Directly
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-xs border-b border-gray-100 pb-2">
                    Hospital Details
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-400 block text-[10px]">Hospital Name</span>
                        <span className="font-bold text-gray-900 text-sm">{request.hospital_name}</span>
                        <p className="text-gray-500 mt-0.5">{request.hospital_address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-2">
                      <div className="w-4 h-4 text-red-600 shrink-0" />
                      <div>
                        <span className="text-gray-400 block text-[10px]">District & Upazila</span>
                        <span className="font-semibold text-gray-800">
                          {request.upazila ? `${request.upazila}, ` : ""}
                          {districtName} ({request.division.toUpperCase()})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-xs border-b border-gray-100 pb-2">
                    Transfusion Schedule
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-400 block text-[10px]">Required Date</span>
                        <span className="font-bold text-gray-900 text-sm">{request.required_date}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-400 block text-[10px]">Required Shift / Time</span>
                        <span className="font-semibold text-gray-800">
                          {request.required_time || "As soon as possible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {request.notes && (
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                    Clinical Notes from Attendant
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    &ldquo;{request.notes}&rdquo;
                  </p>
                </div>
              )}

              <div className="bg-rose-50/60 rounded-2xl p-4 sm:p-6 border border-rose-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-red-600" />
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Compatible Blood Donors for {request.blood_group} Patient
                  </h4>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  This patient can safely receive red blood cells from donors with the following blood groups:
                </p>
                <div className="flex flex-wrap gap-2">
                  {compatibleList.map((bg) => (
                    <span
                      key={bg}
                      className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-black text-red-600 shadow-2xs"
                    >
                      {bg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                {volunteered ? (
                  <div className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      Thank you! Your donation offer and contact details have been sent to the patient&apos;s attendant.
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="text-xs text-gray-500">
                      Are you nearby and compatible? Step forward to save this life.
                    </div>
                    <button
                      onClick={handleVolunteerToDonate}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>I Can Donate Blood For This Patient</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BloodRequestDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading request details...</div>}>
      <BloodRequestDetailContent />
    </Suspense>
  );
}
