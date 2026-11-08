"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Phone, Mail, MapPin, Shield, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-48 h-12 bg-white/10 p-1.5 rounded-xl backdrop-blur-xs">
                <Image
                  src="/images/logo.png"
                  alt="RedHope"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              RedHope is Bangladesh&apos;s digital humanitarian platform connecting voluntary blood
              donors directly with patients in emergency need across all 8 divisions and 64 districts.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-950/40 border border-rose-900/60 p-2.5 rounded-xl max-w-sm">
              <Shield className="w-4 h-4 text-red-500 shrink-0" />
              <span>100% Non-Profit • Free to use for every citizen of Bangladesh.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search-donors" className="hover:text-red-400 transition-colors">
                  Find Blood Donors
                </Link>
              </li>
              <li>
                <Link href="/become-a-donor" className="hover:text-red-400 transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link href="/blood-requests" className="hover:text-red-400 transition-colors">
                  Emergency Requests
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-red-400 transition-colors">
                  How RedHope Works
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-red-400 transition-colors">
                  Eligibility Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/knowledge-base" className="hover:text-red-400 transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-400 transition-colors">
                  Articles & Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400 transition-colors">
                  Terms & Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helpline BD */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Emergency Hotlines
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">RedHope 24/7 Helpline</p>
                  <p className="text-gray-400">+880 1800-REDHOPE (733467)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">National Emergency Service</p>
                  <p className="text-gray-400">999 (Ambulance & Police)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Central Operations</p>
                  <p className="text-gray-400">Shahbagh / Dhanmondi, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span>RedHope — রক্ত দিন, জীবন বাঁচান।</span>
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 inline" />
            <span>for humanitarian life-saving in Bangladesh.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-gray-400">
              Support
            </Link>
            <span>© 2026 RedHope. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
