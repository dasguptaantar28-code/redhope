import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Lock, Heart, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — RedHope | Donor Data Protection",
  description: "RedHope's strict privacy policy, donor phone masking, and data protection practices in Bangladesh.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-gray-100 space-y-8">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Trust & Security
              </span>
              <h1 className="text-3xl font-black text-gray-900 mt-3">
                RedHope Privacy Policy & Donor Protection
              </h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: November 2026</p>
            </div>

            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-900 text-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Our Core Promise:</strong> We never sell, rent, or commercialize donor or patient data. Phone numbers are masked by default to protect lifesavers against unsolicited marketing or harassment.
                </span>
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">1. Information We Collect</h2>
                <p>
                  To connect patients with compatible donors, we collect voluntary personal and clinical details:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Full name, verified email address, and Bangladeshi contact phone number.</li>
                  <li>Blood group (ABO and Rh factor), date of birth, and biological gender.</li>
                  <li>Geographic location (Division, District, Upazila / Thana).</li>
                  <li>Last donation date for calculating medical safety intervals.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">2. Privacy-Preserving Contact Requests</h2>
                <p>
                  Unless a donor explicitly chooses to make their phone number public, their phone remains private. Patient attendants must submit a structured contact request detailing hospital name, patient condition, and urgency. Donors can approve or decline requests at their discretion.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">3. Search Visibility Controls</h2>
                <p>
                  Donors can toggle their availability (&ldquo;Ready to Donate&rdquo; vs &ldquo;Resting&rdquo;) or opt out of public search listings entirely from their Donor Dashboard at any time.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">4. Database & Row Level Security (RLS)</h2>
                <p>
                  RedHope utilizes PostgreSQL with Supabase Row Level Security. Data access policies ensure users can only modify their own profile, and only verified platform administrators have auditing capabilities.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
