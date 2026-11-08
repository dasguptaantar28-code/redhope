"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldAlert,
  Users,
  Droplets,
  HeartPulse,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  Trash2,
  Edit,
  Search,
  Plus,
  FileText,
  MessageSquare,
  History,
  Activity,
  Filter,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { redHopeStore } from "@/lib/store";
import {
  Profile,
  Donor,
  BloodRequest,
  AdminAuditLog,
  ContactMessage,
  BlogPost,
  RequestStatus,
} from "@/types/database";
import { BLOOD_GROUPS, getDistrictNameById } from "@/lib/locations";

export default function AdminDashboardPage() {
  const { user, role, demoLogin } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "verify" | "donors" | "requests" | "blog" | "messages" | "audit"
  >("overview");

  // Data states
  const [donors, setDonors] = useState<(Donor & { profile: Profile })[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Search & filter states
  const [donorSearch, setDonorSearch] = useState("");
  const [donorBloodGroupFilter, setDonorBloodGroupFilter] = useState("");
  const [requestStatusFilter, setRequestStatusFilter] = useState("");

  // Rejection modal
  const [rejectModalReq, setRejectModalReq] = useState<BloodRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Refresh data
  const refreshData = () => {
    setDonors(redHopeStore.getDonors());
    setRequests(redHopeStore.getBloodRequests());
    setMessages(redHopeStore.getContactMessages());
    setAuditLogs(redHopeStore.getAuditLogs());
    setBlogPosts(redHopeStore.getBlogPosts());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Verification actions
  const handleVerifyRequest = (req: BloodRequest) => {
    redHopeStore.updateBloodRequestStatus(
      req.id,
      "verified",
      user?.id || "admin_system",
      user?.full_name || "Dr. Mahmud Hasan"
    );
    refreshData();
  };

  const handleOpenRejectModal = (req: BloodRequest) => {
    setRejectModalReq(req);
    setRejectReason("");
  };

  const handleConfirmReject = () => {
    if (!rejectModalReq) return;
    redHopeStore.updateBloodRequestStatus(
      rejectModalReq.id,
      "rejected",
      user?.id || "admin_system",
      user?.full_name || "Dr. Mahmud Hasan",
      rejectReason || "Verification failed: Hospital records could not be verified."
    );
    setRejectModalReq(null);
    refreshData();
  };

  const handleUpdateStatus = (reqId: string, status: RequestStatus) => {
    redHopeStore.updateBloodRequestStatus(
      reqId,
      status,
      user?.id || "admin_system",
      user?.full_name || "Dr. Mahmud Hasan"
    );
    refreshData();
  };

  const handleToggleDonorStatus = (donorId: string, currentStatus: "active" | "suspended") => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    redHopeStore.updateProfile(donorId, { status: nextStatus });
    redHopeStore.addAuditLog({
      admin_id: user?.id || "admin",
      admin_name: user?.full_name || "Admin",
      action: "DONOR_STATUS_TOGGLE",
      target_type: "donor",
      target_id: donorId,
      details: `Changed donor status to ${nextStatus}`,
    });
    refreshData();
  };

  const pendingRequests = useMemo(
    () => requests.filter((r) => r.status === "pending"),
    [requests]
  );

  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      if (donorBloodGroupFilter && d.blood_group !== donorBloodGroupFilter) return false;
      if (donorSearch) {
        const q = donorSearch.toLowerCase();
        return (
          d.profile.full_name.toLowerCase().includes(q) ||
          d.profile.phone.includes(q) ||
          d.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [donors, donorBloodGroupFilter, donorSearch]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (requestStatusFilter && r.status !== requestStatusFilter) return false;
      return true;
    });
  }, [requests, requestStatusFilter]);

  // If not authenticated as Admin, provide 1-click admin login
  if (!user || role !== "admin") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-purple-100">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 mx-auto mb-4 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Admin Authorization Required</h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Only authorized RedHope administrators can access the command center and verify hospital blood requests.
            </p>
            <button
              onClick={() => {
                demoLogin("admin");
                refreshData();
              }}
              className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              Log In as Central Admin (Dr. Mahmud Hasan)
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Analytics computation
  const totalDonors = donors.length;
  const totalRequests = requests.length;
  const fulfilledCount = requests.filter((r) => r.status === "fulfilled").length;
  const pendingCount = pendingRequests.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center shadow-md">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Admin Command Center</h1>
                <p className="text-xs text-gray-500">
                  Welcome, <strong>{user.full_name}</strong> • RedHope Central Directorate
                </p>
              </div>
            </div>

            {pendingCount > 0 && (
              <div className="px-4 py-2 rounded-2xl bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{pendingCount} Pending Blood Requests Require Verification</span>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-100 shadow-xs">
            {[
              { id: "overview", label: "Overview & Analytics", icon: Activity },
              {
                id: "verify",
                label: `Verify Requests (${pendingCount})`,
                icon: HeartPulse,
                badge: pendingCount,
              },
              { id: "donors", label: "Manage Donors", icon: Users },
              { id: "requests", label: "All Blood Requests", icon: Droplets },
              { id: "blog", label: "Manage Articles", icon: FileText },
              { id: "messages", label: `Inquiries (${messages.length})`, icon: MessageSquare },
              { id: "audit", label: "Audit Logs", icon: History },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-purple-700 text-white shadow-xs"
                      : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Donors</span>
                  <span className="text-3xl font-black text-gray-900 mt-1 block">{totalDonors}</span>
                  <span className="text-xs text-gray-500 mt-1 block">Active across Bangladesh</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Pending Verification</span>
                  <span className="text-3xl font-black text-amber-600 mt-1 block">{pendingCount}</span>
                  <span className="text-xs text-gray-500 mt-1 block">Hospital requests waiting</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Requests</span>
                  <span className="text-3xl font-black text-blue-600 mt-1 block">{totalRequests}</span>
                  <span className="text-xs text-gray-500 mt-1 block">Lifetime broadcasted</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Fulfilled Transfusions</span>
                  <span className="text-3xl font-black text-emerald-600 mt-1 block">{fulfilledCount}</span>
                  <span className="text-xs text-gray-500 mt-1 block">Patients safely treated</span>
                </div>
              </div>

              {/* Blood group distribution grid */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <h3 className="font-bold text-gray-900 text-base mb-4">
                  Blood Group Distribution (Registered Donors)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {BLOOD_GROUPS.map((bg) => {
                    const count = donors.filter((d) => d.blood_group === bg).length;
                    return (
                      <div key={bg} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                        <span className="text-lg font-black text-red-600">{bg}</span>
                        <span className="block text-2xl font-extrabold text-gray-900 mt-1">{count}</span>
                        <span className="text-[10px] text-gray-400 uppercase">Donors</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFY REQUESTS */}
          {activeTab === "verify" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Hospital Request Verification Queue</h3>
                <p className="text-xs text-gray-500">
                  Review new blood requests submitted by attendants before they are broadcasted to donors.
                </p>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-bold text-gray-800">Queue Clean!</p>
                  <p>All emergency blood requests have been reviewed and verified.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-6 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-black flex items-center justify-center text-xl">
                            {req.blood_group}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-base">{req.patient_name}</h4>
                            <p className="text-xs text-gray-600">
                              {req.hospital_name} — {req.hospital_address} ({req.district})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenRejectModal(req)}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-xl transition-colors"
                          >
                            Reject Request
                          </button>
                          <button
                            onClick={() => handleVerifyRequest(req)}
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                          >
                            Approve & Broadcast
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white p-3.5 rounded-xl border border-gray-100">
                        <div>
                          <span className="text-gray-400 text-[10px] block">Attendant</span>
                          <span className="font-bold text-gray-800">{req.contact_person}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 text-[10px] block">Phone</span>
                          <span className="font-bold text-gray-800">{req.contact_phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 text-[10px] block">Bags Needed</span>
                          <span className="font-bold text-red-600">{req.bags_needed} Bags</span>
                        </div>
                        <div>
                          <span className="text-gray-400 text-[10px] block">Required Date</span>
                          <span className="font-bold text-gray-800">{req.required_date}</span>
                        </div>
                      </div>

                      {req.notes && (
                        <p className="text-xs text-gray-600 italic bg-white p-3 rounded-xl border border-gray-100">
                          &ldquo;{req.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MANAGE DONORS */}
          {activeTab === "donors" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Registered Donors Directory</h3>
                  <p className="text-xs text-gray-500">Manage donor profiles, view verification, or suspend accounts.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search donor..."
                      value={donorSearch}
                      onChange={(e) => setDonorSearch(e.target.value)}
                      className="h-9 pl-9 pr-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                    />
                  </div>

                  <select
                    value={donorBloodGroupFilter}
                    onChange={(e) => setDonorBloodGroupFilter(e.target.value)}
                    className="h-9 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  >
                    <option value="">All Groups</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Donors Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Donor Name</th>
                      <th className="p-3">Blood Group</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Donations</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDonors.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50/60">
                        <td className="p-3 font-semibold text-gray-900">{d.profile.full_name}</td>
                        <td className="p-3">
                          <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                            {d.blood_group}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{getDistrictNameById(d.district)}</td>
                        <td className="p-3 text-gray-600">{d.profile.phone}</td>
                        <td className="p-3 font-bold text-gray-900">{d.total_donations}</td>
                        <td className="p-3">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              d.profile.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {d.profile.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleDonorStatus(d.id, d.profile.status)}
                            className="text-xs font-semibold text-purple-700 hover:underline"
                          >
                            {d.profile.status === "active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ALL BLOOD REQUESTS */}
          {activeTab === "requests" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">All Blood Requests</h3>
                <select
                  value={requestStatusFilter}
                  onChange={(e) => setRequestStatusFilter(e.target.value)}
                  className="h-9 px-3 rounded-xl border border-gray-200 text-xs"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="in_progress">In Progress</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Patient</th>
                      <th className="p-3">Group</th>
                      <th className="p-3">Hospital</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-xl">Change Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50/60">
                        <td className="p-3 font-semibold text-gray-900">{req.patient_name}</td>
                        <td className="p-3 font-bold text-red-600">{req.blood_group}</td>
                        <td className="p-3 text-gray-600">{req.hospital_name}</td>
                        <td className="p-3 text-gray-600">{req.required_date}</td>
                        <td className="p-3">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              req.status === "verified"
                                ? "bg-emerald-100 text-emerald-800"
                                : req.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : req.status === "fulfilled"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateStatus(req.id, e.target.value as any)}
                            className="h-8 px-2 rounded-lg border border-gray-200 text-xs bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="in_progress">In Progress</option>
                            <option value="fulfilled">Fulfilled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BLOG */}
          {activeTab === "blog" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Manage Published Articles</h3>
                <Link
                  href="/blog"
                  className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold"
                >
                  View Public Blog
                </Link>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl bg-gray-50 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{post.title}</h4>
                      <p className="text-xs text-gray-500">
                        Category: {post.category} • Author: {post.author_name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        redHopeStore.deleteBlogPost(post.id);
                        refreshData();
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT INQUIRIES */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Contact Form Inquiries</h3>
              {messages.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-xs">{m.name} ({m.email})</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(m.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-red-600">{m.subject}</p>
                      <p className="text-xs text-gray-700">{m.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: AUDIT LOGS */}
          {activeTab === "audit" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Security & Administrative Audit Logs</h3>
              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-gray-50 text-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="font-bold text-purple-700 uppercase">{log.action}</span>
                      <span className="text-gray-500 ml-2">by {log.admin_name}</span>
                      <p className="text-gray-700 mt-0.5">{log.details}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Reject Modal */}
      {rejectModalReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Reject Blood Request</h3>
            <p className="text-xs text-gray-500">
              State the reason for rejecting request #{rejectModalReq.id} ({rejectModalReq.patient_name}).
            </p>
            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Unverified hospital case / Unable to contact attendant..."
              className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectModalReq(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 bg-red-600 text-white text-xs font-bold rounded-xl"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
