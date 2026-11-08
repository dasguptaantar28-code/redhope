"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Heart,
  Search,
  Bell,
  User,
  LogOut,
  ShieldAlert,
  Droplet,
  FileText,
  LifeBuoy,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { redHopeStore } from "@/lib/store";
import { InAppNotification } from "@/types/database";

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);

  useEffect(() => {
    const list = redHopeStore.getNotifications(user?.id);
    setNotifications(list);
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAsRead = (id: string) => {
    redHopeStore.markNotificationAsRead(id);
    setNotifications(redHopeStore.getNotifications(user?.id));
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Be a Donor", href: "/become-a-donor" },
    { label: "Search Donors", href: "/search-donors" },
    { label: "All Donors", href: "/donors" },
    { label: "Blood Requests", href: "/blood-requests" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-40 sm:w-48 h-12 flex items-center">
              <Image
                src="/images/logo.png"
                alt="RedHope - Donate Blood • Save Lives"
                fill
                className="object-contain object-left group-hover:scale-102 transition-transform duration-200"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "text-red-600 bg-red-50 font-semibold"
                      : "text-gray-700 hover:text-red-600 hover:bg-rose-50/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons & Profile */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Urgent Request CTA */}
            <Link
              href="/blood-requests/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-full transition-all"
            >
              <Droplet className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              Request Blood
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setUserDropdownOpen(false);
                }}
                className="relative p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          if (user) redHopeStore.markAllNotificationsAsRead(user.id);
                          setNotifications(redHopeStore.getNotifications(user?.id));
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-500">No notifications yet.</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleMarkAsRead(n.id)}
                          className={`p-3 text-left hover:bg-rose-50/50 cursor-pointer transition-colors ${
                            !n.is_read ? "bg-red-50/30" : ""
                          }`}
                        >
                          <Link href={n.link || "#"} onClick={() => setNotifOpen(false)}>
                            <p className="text-xs font-semibold text-gray-900">{n.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              {new Date(n.created_at).toLocaleDateString()}
                            </span>
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 pl-2.5 bg-gray-50 hover:bg-red-50 border border-gray-200 rounded-full transition-all"
                >
                  <span className="text-xs font-medium text-gray-800 max-w-[100px] truncate">
                    {user.full_name}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : role === "donor"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {role}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.full_name.charAt(0)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.full_name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-purple-700 hover:bg-purple-50 font-medium"
                      >
                        <ShieldAlert className="w-4 h-4 text-purple-600" />
                        Admin Dashboard
                      </Link>
                    )}

                    {role === "donor" && (
                      <Link
                        href="/donor-dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-700 hover:bg-red-50 font-medium"
                      >
                        <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                        Donor Dashboard
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      User Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-medium border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/become-a-donor"
                  className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Join as Donor
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            <Link
              href="/blood-requests/new"
              className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full"
            >
              Request Blood
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-medium ${
                  isActive
                    ? "text-red-600 bg-red-50 font-semibold"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-gray-100 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2 bg-gray-50 rounded-xl mb-2">
                  <p className="text-sm font-semibold text-gray-900">{user.full_name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                {role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-purple-700 font-semibold rounded-xl bg-purple-50"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {role === "donor" && (
                  <Link
                    href="/donor-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-red-700 font-semibold rounded-xl bg-red-50"
                  >
                    Donor Dashboard
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                >
                  User Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 font-medium rounded-xl hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/become-a-donor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700"
                >
                  Join as Donor
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
