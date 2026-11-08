"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Profile, Donor, UserRole } from "@/types/database";
import { redHopeStore } from "@/lib/store";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthContextType {
  user: Profile | null;
  donorProfile: Donor | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    pass: string,
    fullName: string,
    phone: string,
    role?: UserRole
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;
  updateDonorProfile: (data: Partial<Donor>) => Promise<boolean>;
  demoLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [donorProfile, setDonorProfile] = useState<Donor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("redhope_current_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as Profile;
        setUser(parsed);
        if (parsed.role === "donor") {
          const d = redHopeStore.getDonorById(parsed.id);
          if (d) setDonorProfile(d);
        }
      } else {
        // Default to guest
        setUser(null);
      }
    } catch (e) {
      console.error("Auth init error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _pass: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: _pass,
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const profiles = redHopeStore.getProfiles();
          const matched = profiles.find((p) => p.email === email) || {
            id: data.user.id,
            email: data.user.email || email,
            full_name: data.user.user_metadata?.full_name || "RedHope User",
            phone: "+8801700000000",
            role: "user" as UserRole,
            status: "active" as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(matched);
          localStorage.setItem("redhope_current_user", JSON.stringify(matched));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local store authentication
      const profiles = redHopeStore.getProfiles();
      const matched = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());

      if (!matched) {
        setIsLoading(false);
        return { success: false, error: "No account found with this email. Please register first." };
      }

      if (matched.status === "suspended") {
        setIsLoading(false);
        return { success: false, error: "This account has been suspended by administration." };
      }

      setUser(matched);
      localStorage.setItem("redhope_current_user", JSON.stringify(matched));

      if (matched.role === "donor") {
        const d = redHopeStore.getDonorById(matched.id);
        if (d) setDonorProfile(d);
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || "Failed to log in." };
    }
  };

  const register = async (
    email: string,
    _pass: string,
    fullName: string,
    phone: string,
    role: UserRole = "user"
  ) => {
    setIsLoading(true);
    try {
      const profiles = redHopeStore.getProfiles();
      const existing = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setIsLoading(false);
        return { success: false, error: "An account with this email already exists." };
      }

      const id = "usr_" + Date.now().toString(36);
      const newProfile: Profile = {
        id,
        email,
        full_name: fullName,
        phone,
        role,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      profiles.push(newProfile);
      localStorage.setItem("redhope_profiles", JSON.stringify(profiles));

      setUser(newProfile);
      localStorage.setItem("redhope_current_user", JSON.stringify(newProfile));

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || "Failed to register." };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setDonorProfile(null);
    localStorage.removeItem("redhope_current_user");
  };

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;
    const ok = redHopeStore.updateProfile(user.id, data);
    if (ok) {
      const updated = { ...user, ...data, updated_at: new Date().toISOString() };
      setUser(updated);
      localStorage.setItem("redhope_current_user", JSON.stringify(updated));
    }
    return ok;
  };

  const updateDonorProfile = async (data: Partial<Donor>): Promise<boolean> => {
    if (!user || !donorProfile) return false;
    const ok = redHopeStore.updateDonor(donorProfile.id, data);
    if (ok) {
      const updated = { ...donorProfile, ...data, updated_at: new Date().toISOString() };
      setDonorProfile(updated);
    }
    return ok;
  };

  // Instant 1-click demo login for reviewing Admin, Donor, or User roles
  const demoLogin = (role: UserRole) => {
    const profiles = redHopeStore.getProfiles();
    let target = profiles.find((p) => p.role === role);
    if (!target) {
      target = profiles[0];
    }
    setUser(target);
    localStorage.setItem("redhope_current_user", JSON.stringify(target));

    if (target.role === "donor") {
      const d = redHopeStore.getDonorById(target.id);
      if (d) setDonorProfile(d);
    } else {
      setDonorProfile(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        donorProfile,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        updateDonorProfile,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
