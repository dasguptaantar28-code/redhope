export type UserRole = "user" | "donor" | "admin";
export type BloodGroupType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type RequestStatus = "pending" | "verified" | "in_progress" | "fulfilled" | "cancelled" | "rejected";
export type RequestUrgency = "normal" | "urgent" | "critical";
export type NotificationType = "request_match" | "request_verified" | "contact_request" | "status_update" | "system";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  avatar_url?: string;
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface Donor {
  id: string; // Foreign key referencing profiles(id)
  blood_group: BloodGroupType;
  division: string;
  district: string;
  upazila: string;
  full_address?: string;
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  last_donation_date?: string;
  is_available: boolean;
  is_public_search: boolean;
  phone_public: boolean;
  total_donations: number;
  emergency_contact?: string;
  bio?: string;
  verified_status: "unverified" | "verified";
  created_at: string;
  updated_at: string;
  // Joined relation fields
  profile?: Profile;
}

export interface BloodRequest {
  id: string;
  user_id: string; // Requester
  patient_name: string;
  blood_group: BloodGroupType;
  bags_needed: number;
  hospital_name: string;
  hospital_address: string;
  division: string;
  district: string;
  upazila: string;
  required_date: string;
  required_time?: string;
  contact_person: string;
  contact_phone: string;
  urgency: RequestUrgency;
  notes?: string;
  status: RequestStatus;
  verified_by?: string;
  verified_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  // Joined relation
  requester?: Profile;
}

export interface DonationRecord {
  id: string;
  donor_id: string;
  blood_request_id?: string;
  patient_name?: string;
  blood_group: BloodGroupType;
  hospital_name: string;
  district: string;
  donation_date: string;
  bags_donated: number;
  certificate_url?: string;
  notes?: string;
  created_at: string;
}

export interface ContactRequest {
  id: string;
  requester_id: string;
  donor_id: string;
  blood_request_id?: string;
  requester_name: string;
  requester_phone: string;
  reason: string;
  message?: string;
  status: "pending" | "approved" | "declined";
  created_at: string;
}

export interface InAppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Blood Donation" | "Health Awareness" | "Donor Stories" | "Emergency Awareness" | "Community Activities";
  author_name: string;
  cover_image: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo_url?: string;
  comment: string;
  blood_group?: BloodGroupType;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  replied: boolean;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  action: string;
  target_type: "donor" | "blood_request" | "user" | "blog" | "settings";
  target_id?: string;
  details: string;
  ip_address?: string;
  created_at: string;
}
