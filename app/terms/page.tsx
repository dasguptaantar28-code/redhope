import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, ShieldCheck, Heart } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Medical Disclaimer — RedHope",
  description: "Terms of use, humanitarian non-commercial pledge, and medical disclaimers for RedHope.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-gray-100 space-y-8">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Legal & Safety
              </span>
              <h1 className="text-3xl font-black text-gray-900 mt-3">
                Terms of Service & Medical Disclaimer
              </h1>
              <p className="text-xs text-gray-400 mt-1">Effective: November 2026</p>
            </div>

            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Non-Commercial Policy:</strong> Blood donation on RedHope is 100% voluntary. Buying or selling blood is illegal under the Safe Blood Transfusion Act, 2002 of Bangladesh. Any attempt to solicit money will result in immediate permanent account termination and referral to Bangladesh Police.
                </span>
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">1. Nature of the Platform</h2>
                <p>
                  RedHope is a humanitarian digital matching platform. We are not a licensed blood bank, medical clinic, or blood testing laboratory. We facilitate communication between voluntary donors and patient families.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">2. Mandatory Clinical Screening</h2>
                <p>
                  Before any transfusion occurs, the receiving hospital or licensed healthcare facility must perform mandatory screening for transfusion-transmissible infections (HIV, Hepatitis B, Hepatitis C, Syphilis, Malaria) and cross-matching. RedHope assumes no liability for hospital-level clinical procedures.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">3. Accurate Reporting</h2>
                <p>
                  Users who submit blood requests agree that all patient records, hospital names, and doctor requisition slips are authentic. Submitting fictitious requests creates life-threatening delays for genuine patients and will be prosecuted under cyber laws.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">4. Donor Safety</h2>
                <p>
                  Donors must adhere to medical safety guidelines, ensure they are well-hydrated, have eaten before donation, and respect the 90-120 day rest window between donations.
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
