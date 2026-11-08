"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User,
  Droplet,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Settings,
  Bell,
  Heart,
  ShieldCheck,
  Phone,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { redHopeStore } from "@/lib/store";
import { BloodRequest, ContactRequest } from "@/types/database";

export default function UserDashboardPage() {
  const { user, role, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "contacts" | "profile">("overview");

  const [myRequests, setMyRequests] = useState<BloodRequest[]>([]);
  const [myContactRequests, setMyContactRequests] = useState<ContactRequest[]>([]);

  // Profile edit
  const [editName, setEditName] = useState(user?.full_name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    if (user) {
      setEditName(user.full_name);
      setEditPhone(user.phone);

      const allReqs = redHopeStore.getBloodRequests();
      setMyRequests(allReqs.filter((r) => r.user_id === user.id));

      const allContacts = redHopeStore.getContactRequests();
      setMyContactRequests(allContacts.filter((c) => c.requester_id === user.id));
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("");
    const ok = await updateProfile({ full_name: editName, phone: editPhone });
    if (ok) {
      setProfileMsg("Profile updated successfully!");
      setTimeout(() => setProfileMsg(""), 2000);
    }
  };

  const handleCancelRequest = (id: string) => {
    if (confirm("Are you sure you want to cancel this blood request?")) {
      redHopeStore.updateBloodRequestStatus(id, "cancelled");
      setMyRequests(redHopeStore.getBloodRequests().filter((r) => r.user_id === user?.id));
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm">
            <User className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h2 className="text-base font-bold text-gray-900">Sign In Required</h2>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Please sign in to view your RedHope user dashboard.
            </p>
            <Link
              href="/login?redirect=/dashboard"
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-red-500/20">
                {user.full_name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-900">{user.full_name}</h1>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{user.email} • {user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/blood-requests/new"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Post Blood Request</span>
              </Link>
              {role === "donor" && (
                <Link
                  href="/donor-dashboard"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 text-red-600 border border-rose-200 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-red-600" />
                  <span>Donor Dashboard</span>
                </Link>
              )}
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-3 space-y-2">
              <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-xs space-y-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-colors ${
                    activeTab === "overview"
                      ? "bg-red-600 text-white shadow-xs shadow-red-500/20"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Droplet className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("requests")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-left transition-colors ${
                    activeTab === "requests"
                      ? "bg-red-600 text-white shadow-xs shadow-red-500/20"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" />
                    <span>My Blood Requests</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                    {myRequests.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("contacts")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-left transition-colors ${
                    activeTab === "contacts"
                      ? "bg-red-600 text-white shadow-xs shadow-red-500/20"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    <span>Contact Requests</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                    {myContactRequests.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-colors ${
                    activeTab === "profile"
                      ? "bg-red-600 text-white shadow-xs shadow-red-500/20"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Profile & Settings</span>
                </button>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 space-y-6">
              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        My Total Requests
                      </span>
                      <span className="text-3xl font-black text-gray-900 mt-1 block">
                        {myRequests.length}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Hospital emergency cases posted
                      </span>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Verified & Active
                      </span>
                      <span className="text-3xl font-black text-emerald-600 mt-1 block">
                        {myRequests.filter((r) => r.status === "verified" || r.status === "in_progress").length}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Live on hospital broadcast
                      </span>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Fulfilled Emergencies
                      </span>
                      <span className="text-3xl font-black text-red-600 mt-1 block">
                        {myRequests.filter((r) => r.status === "fulfilled").length}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Blood successfully collected
                      </span>
                    </div>
                  </div>

                  {/* Recent Requests list */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 text-sm">Recent Submitted Requests</h3>
                      <button
                        onClick={() => setActiveTab("requests")}
                        className="text-xs text-red-600 font-bold hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    {myRequests.length === 0 ? (
                      <div className="py-8 text-center text-xs text-gray-500 border border-dashed border-gray-200 rounded-2xl">
                        You have not posted any blood requests yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {myRequests.slice(0, 3).map((req) => (
                          <div
                            key={req.id}
                            className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                                {req.blood_group}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-xs">{req.patient_name}</h4>
                                <p className="text-[11px] text-gray-500">{req.hospital_name} • {req.bags_needed} Bags</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                  req.status === "verified"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : req.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {req.status}
                              </span>
                              <Link
                                href={`/blood-requests/${req.id}`}
                                className="px-3 py-1 bg-white border border-gray-200 text-gray-700 hover:text-red-600 text-[11px] font-bold rounded-lg"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: All Blood Requests */}
              {activeTab === "requests" && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-base">My Blood Requests</h3>
                    <Link
                      href="/blood-requests/new"
                      className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold"
                    >
                      + New Request
                    </Link>
                  </div>

                  {myRequests.length === 0 ? (
                    <div className="py-12 text-center text-xs text-gray-500">
                      No blood requests created yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-bold flex items-center justify-center text-base">
                                {req.blood_group}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-sm">{req.patient_name}</h4>
                                <p className="text-xs text-gray-500">
                                  {req.hospital_name} — {req.hospital_address}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                                req.status === "verified"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : req.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {req.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
                            <div>
                              <span className="text-gray-400 block text-[10px]">Required Date</span>
                              <span className="font-semibold">{req.required_date}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[10px]">Quantity</span>
                              <span className="font-semibold">{req.bags_needed} Bags</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[10px]">Attendant Phone</span>
                              <span className="font-semibold">{req.contact_phone}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[10px]">Urgency</span>
                              <span className="font-semibold uppercase text-red-600">{req.urgency}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <Link
                              href={`/blood-requests/${req.id}`}
                              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                            >
                              View Public Page
                            </Link>
                            {req.status !== "fulfilled" && req.status !== "cancelled" && (
                              <button
                                onClick={() => handleCancelRequest(req.id)}
                                className="px-4 py-1.5 bg-rose-50 hover:bg-rose-100 text-red-600 text-xs font-bold rounded-xl"
                              >
                                Cancel Request
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Outgoing Contact Requests */}
              {activeTab === "contacts" && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
                  <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                    My Outgoing Donor Contact Requests
                  </h3>
                  {myContactRequests.length === 0 ? (
                    <div className="py-12 text-center text-xs text-gray-500">
                      You have not sent any private contact requests to donors yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myContactRequests.map((cr) => (
                        <div
                          key={cr.id}
                          className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-xs font-bold text-gray-900">{cr.reason}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Submitted: {new Date(cr.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                              cr.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : cr.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {cr.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Profile Settings */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-6">
                  <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                    Account Information & Profile
                  </h3>

                  {profileMsg && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-semibold">
                      {profileMsg}
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address (Read-only)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-100 text-xs text-gray-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
