"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Heart,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
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

export default function BecomeADonorPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Form State
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | "">("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isPublicSearch, setIsPublicSearch] = useState(true);
  const [phonePublic, setPhonePublic] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [bio, setBio] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  // Status
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const divisions = getDivisions();
  const districts = getDistricts(division || undefined);
  const upazilas = district ? getUpazilas(district) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validations
    if (!fullName.trim()) return setErrorMsg("Full name is required.");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setErrorMsg("Valid email address is required.");
    if (!phone.trim() || phone.length < 11) return setErrorMsg("Valid Bangladeshi phone number (e.g. 017XXXXXXXX) is required.");
    if (!user) {
      if (!password || password.length < 6) return setErrorMsg("Password must be at least 6 characters.");
      if (password !== confirmPassword) return setErrorMsg("Passwords do not match.");
    }
    if (!bloodGroup) return setErrorMsg("Please select your blood group.");
    if (!division) return setErrorMsg("Please select your division.");
    if (!district) return setErrorMsg("Please select your district.");
    if (!upazila) return setErrorMsg("Please select your upazila/thana.");
    if (!consentChecked) return setErrorMsg("Please agree to the voluntary blood donor terms & consent.");

    // Check duplicate email
    const existing = redHopeStore.getProfiles().find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (existing && !user) {
      return setErrorMsg("An account with this email already exists. Please log in first.");
    }

    setIsSubmitting(true);

    try {
      const newDonor = redHopeStore.registerDonor(
        {
          email,
          full_name: fullName,
          phone,
          role: "donor",
          avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
        },
        {
          blood_group: bloodGroup as any,
          division,
          district,
          upazila,
          full_address: fullAddress,
          date_of_birth: dateOfBirth,
          gender,
          last_donation_date: lastDonationDate || undefined,
          is_available: isAvailable,
          is_public_search: isPublicSearch,
          phone_public: phonePublic,
          emergency_contact: emergencyContact,
          bio,
        }
      );

      // Save user session
      localStorage.setItem("redhope_current_user", JSON.stringify(newDonor.profile));

      setSuccessMsg("Congratulations! You have successfully registered as a RedHope Blood Donor.");
      setTimeout(() => {
        router.push("/donor-dashboard");
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to complete donor registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/60">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-red-600" />
              <span>Join the Lifesaver Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Become a Blood Donor
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              রক্তদাতা হিসেবে নিবন্ধন করুন — আপনার এক ব্যাগ রক্ত বাঁচাতে পারে তিনটি প্রাণ।
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-xl shadow-red-950/5 border border-red-100 p-6 sm:p-10">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal & Account Information */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <User className="w-4 h-4 text-red-600" />
                  <span>1. Personal & Account Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number * (01XXXXXXXXX)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+88017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                  </div>

                  {!user && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Password *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="At least 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Re-type password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Step 2: Blood Donation Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Droplet className="w-4 h-4 text-red-600" />
                  <span>2. Blood Donation Details</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Blood Group * (রক্তের গ্রুপ)
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {BLOOD_GROUPS.map((bg) => {
                      const isSelected = bloodGroup === bg;
                      return (
                        <button
                          type="button"
                          key={bg}
                          onClick={() => setBloodGroup(bg)}
                          className={`py-2.5 rounded-xl font-bold text-sm border-2 transition-all ${
                            isSelected
                              ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-500/20"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:border-red-300"
                          }`}
                        >
                          {bg}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden bg-white"
                    >
                      <option value="male">Male (পুরুষ)</option>
                      <option value="female">Female (মহিলা)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Donation Date (সর্বশেষ রক্তদানের তারিখ)
                    </label>
                    <input
                      type="date"
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Leave empty if you are a first-time donor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Location Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>3. Geographic Location (Bangladesh)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Division * (বিভাগ)
                    </label>
                    <select
                      required
                      value={division}
                      onChange={(e) => {
                        setDivision(e.target.value);
                        setDistrict("");
                        setUpazila("");
                      }}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden bg-white"
                    >
                      <option value="">Select Division</option>
                      {divisions.map((div) => (
                        <option key={div.id} value={div.id}>
                          {div.name} ({div.bn_name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      District * (জেলা)
                    </label>
                    <select
                      required
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setUpazila("");
                      }}
                      disabled={!division}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden bg-white disabled:bg-gray-100"
                    >
                      <option value="">Select District</option>
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.bn_name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Upazila / Thana * (উপজেলা / থানা)
                    </label>
                    <select
                      required
                      value={upazila}
                      onChange={(e) => setUpazila(e.target.value)}
                      disabled={!district}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden bg-white disabled:bg-gray-100"
                    >
                      <option value="">Select Upazila</option>
                      {upazilas.map((u) => (
                        <option key={u.id} value={u.name}>
                          {u.name} ({u.bn_name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address / Area Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. House 24, Road 7, Dhanmondi, Dhaka"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Step 4: Privacy & Visibility Controls */}
              <div className="space-y-4 bg-rose-50/50 p-6 rounded-3xl border border-rose-100">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  <span>4. Privacy & Availability Controls</span>
                </h3>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-800">
                        Available for Emergency Donation
                      </span>
                      <p className="text-[11px] text-gray-500">
                        Check this if you are currently fit and ready to donate if an emergency occurs.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPublicSearch}
                      onChange={(e) => setIsPublicSearch(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-800">
                        Appear in Public Donor Search
                      </span>
                      <p className="text-[11px] text-gray-500">
                        Allow patients and hospital attendees to discover your profile in search results.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={phonePublic}
                      onChange={(e) => setPhonePublic(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-800">
                        Make Phone Number Publicly Visible
                      </span>
                      <p className="text-[11px] text-gray-500">
                        If unchecked (recommended), requesters must submit a privacy contact request to reach you.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 mt-0.5"
                  />
                  <span className="text-xs text-gray-600">
                    I certify that I am at least 18 years old, physically fit, and willing to donate blood voluntarily without any financial transaction. I agree to the{" "}
                    <Link href="/terms" className="text-red-600 underline font-semibold">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-red-600 underline font-semibold">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-500/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Creating Your Lifesaver Profile..." : "Register as a RedHope Blood Donor"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
