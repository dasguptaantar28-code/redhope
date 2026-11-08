"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Heart,
  Scale,
  Calendar,
  Activity,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function EligibilityPage() {
  // Interactive Quiz state
  const [q1, setQ1] = useState<boolean | null>(null); // Age 18-60
  const [q2, setQ2] = useState<boolean | null>(null); // Weight >= 45kg
  const [q3, setQ3] = useState<boolean | null>(null); // 90+ days since last donation
  const [q4, setQ4] = useState<boolean | null>(null); // Any fever / cold / antibiotic in last 48h (false is good)
  const [q5, setQ5] = useState<boolean | null>(null); // Tattoo or major surgery in last 6 months (false is good)

  const isQuizComplete = q1 !== null && q2 !== null && q3 !== null && q4 !== null && q5 !== null;
  const isEligible = q1 === true && q2 === true && q3 === true && q4 === false && q5 === false;

  const handleResetQuiz = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
    setQ4(null);
    setQ5(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Clinical Guidelines
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              Blood Donation Eligibility
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Check if you are physically and medically eligible to donate blood safely in Bangladesh.
            </p>
          </div>

          {/* Interactive Quiz Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-red-950/5 border border-red-100 p-6 sm:p-10 mb-12">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Quick Eligibility Check Quiz
                  </h2>
                  <p className="text-xs text-gray-500">
                    Answer 5 quick questions to see if you can donate blood today.
                  </p>
                </div>
              </div>

              {isQuizComplete && (
                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-red-600 font-semibold flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {/* Q1 */}
              <div className="p-4 rounded-2xl bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-800">
                  1. Are you between 18 and 60 years old?
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQ1(true)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q1 === true
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setQ1(false)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q1 === false
                        ? "bg-gray-800 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Q2 */}
              <div className="p-4 rounded-2xl bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-800">
                  2. Do you weigh at least 45 kg (females) or 50 kg (males)?
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQ2(true)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q2 === true
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setQ2(false)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q2 === false
                        ? "bg-gray-800 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Q3 */}
              <div className="p-4 rounded-2xl bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-800">
                  3. Has it been at least 90 days (3 months) since your last whole blood donation (or first time)?
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQ3(true)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q3 === true
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setQ3(false)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q3 === false
                        ? "bg-gray-800 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Q4 */}
              <div className="p-4 rounded-2xl bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-800">
                  4. Have you had a fever, cough, flu, or taken antibiotics in the last 48 hours?
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQ4(true)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q4 === true
                        ? "bg-gray-800 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setQ4(false)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q4 === false
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Q5 */}
              <div className="p-4 rounded-2xl bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-800">
                  5. Have you had a tattoo, body piercing, or major surgery in the last 6 months?
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQ5(true)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q5 === true
                        ? "bg-gray-800 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setQ5(false)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      q5 === false
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Result Display */}
            {isQuizComplete && (
              <div
                className={`mt-6 p-6 rounded-2xl border text-center animate-in fade-in duration-200 ${
                  isEligible
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                {isEligible ? (
                  <div>
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <h3 className="text-base font-bold text-emerald-900">
                      You Appear Physically Eligible to Donate Blood Today!
                    </h3>
                    <p className="text-xs text-emerald-700 max-w-md mx-auto mt-1 mb-4">
                      Based on standard WHO and Bangladesh Directorate General of Health Services (DGHS) guidelines, you meet the pre-screening criteria.
                    </p>
                    <Link
                      href="/become-a-donor"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
                    >
                      <span>Join as a Voluntary Donor</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                    <h3 className="text-base font-bold text-amber-900">
                      Temporary Deferral Advised
                    </h3>
                    <p className="text-xs text-amber-800 max-w-md mx-auto mt-1">
                      Based on your responses, you may currently be within a temporary deferral period (e.g. recent illness, medication, weight, or interval). Please allow time for full recovery before donating.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Standard Clinical Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Basic Requirements</h3>
              <ul className="space-y-2 text-xs text-gray-600 mt-3">
                <li>• Age: 18 – 60 years</li>
                <li>• Weight: Min 45 kg (Female), 50 kg (Male)</li>
                <li>• Pulse: 60 – 100 beats/min</li>
                <li>• Hemoglobin: Min 12.5 g/dL</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Donation Frequency</h3>
              <ul className="space-y-2 text-xs text-gray-600 mt-3">
                <li>• Males: Every 3 months (90 days)</li>
                <li>• Females: Every 4 months (120 days)</li>
                <li>• Platelets (Apheresis): Every 14 days</li>
                <li>• Plasma: Every 28 days</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Temporary Deferrals</h3>
              <ul className="space-y-2 text-xs text-gray-600 mt-3">
                <li>• Cold, Flu, Fever: Wait 48 hours</li>
                <li>• Antibiotic treatment: Wait 7 days</li>
                <li>• Dental extraction: Wait 72 hours</li>
                <li>• Tattoo or Piercing: Wait 6 months</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
