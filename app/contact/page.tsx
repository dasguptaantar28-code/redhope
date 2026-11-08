"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { redHopeStore } from "@/lib/store";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      return setErrorMsg("Please fill in your name, email, and message.");
    }

    try {
      redHopeStore.submitContactMessage({
        name,
        email,
        phone,
        subject: subject || "General Inquiry",
        message,
      });

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setErrorMsg("Failed to deliver your inquiry. Please contact our phone helpline.");
    }
  };

  const faqs = [
    {
      q: "Is RedHope a blood bank or a blood testing lab?",
      a: "No. RedHope is a 100% free digital technology bridge connecting voluntary lifesavers directly with verified patients in Bangladesh hospitals. All actual cross-matching and transfusion tests are conducted at licensed hospitals.",
    },
    {
      q: "Does RedHope charge any fee or financial commission?",
      a: "Never. RedHope is strictly humanitarian and non-profit. Buying or selling blood is illegal under the Blood Transfusion Act in Bangladesh.",
    },
    {
      q: "Is my personal phone number safe if I register as a donor?",
      a: "Yes. By default, your contact phone number is masked. Requesters must submit a structured emergency contact request that you can review and approve.",
    },
    {
      q: "How can hospital authorities verify an emergency request?",
      a: "Our administrative team verifies hospital admission records and attending doctor requisition slips before broadcasting alerts.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <Navbar />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100/60 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-2">
              Contact RedHope
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Have questions, feedback, or need urgent coordination? Our team is available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-red-950/5 border border-red-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold">Message Sent Successfully!</h3>
                  <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
                    Thank you for reaching out. A RedHope support coordinator will review your message and reply via email or phone shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Asif Mahmud"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="asif@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Hospital partnership / Volunteer query"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your question, report an issue, or suggest a collaboration..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to RedHope</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Direct Info & Emergency */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                  Emergency Hotlines BD
                </span>
                <h3 className="text-xl font-bold mt-2">24/7 Lifesaver Desk</h3>
                <p className="text-xs text-rose-100 mt-1">
                  For immediate critical surgery blood shortages, call our volunteer emergency team.
                </p>

                <div className="mt-6 space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-rose-200 text-[10px]">RedHope Central Hotline</p>
                      <p className="text-base font-bold text-white">+880 1800-REDHOPE (733467)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-rose-200 text-[10px]">Official Email</p>
                      <p className="text-sm font-semibold text-white">support@redhope.org</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-rose-200 text-[10px]">Headquarters</p>
                      <p className="text-xs font-semibold text-white">
                        Shahbagh Medical Zone, Dhaka 1000, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-red-600" />
                  <span>Frequently Asked Questions</span>
                </h3>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-3.5 text-left text-xs font-bold text-gray-800 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              isOpen ? "rotate-180 text-red-600" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-3.5 pt-0 text-xs text-gray-600 leading-relaxed bg-gray-50/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
