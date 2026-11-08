"use client";

import {
  Profile,
  Donor,
  BloodRequest,
  DonationRecord,
  ContactRequest,
  InAppNotification,
  BlogPost,
  KnowledgeArticle,
  Testimonial,
  ContactMessage,
  AdminAuditLog,
  BloodGroupType,
  RequestStatus,
} from "@/types/database";

const STORAGE_KEY_PREFIX = "redhope_";

const INITIAL_PROFILES: Profile[] = [
  {
    id: "a0000000-0000-0000-0000-000000000001",
    email: "admin@redhope.org",
    full_name: "Dr. Mahmud Hasan (Admin)",
    phone: "+8801711000001",
    role: "admin",
    avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150",
    status: "active",
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-01-10T08:00:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    email: "tanvir.ahmed@example.com",
    full_name: "Tanvir Ahmed",
    phone: "+8801812000002",
    role: "donor",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    status: "active",
    created_at: "2026-02-15T09:30:00Z",
    updated_at: "2026-02-15T09:30:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    email: "nusrat.jahan@example.com",
    full_name: "Nusrat Jahan",
    phone: "+8801913000003",
    role: "donor",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    status: "active",
    created_at: "2026-03-01T11:00:00Z",
    updated_at: "2026-03-01T11:00:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    email: "kamrul.islam@example.com",
    full_name: "Kamrul Islam",
    phone: "+8801714000004",
    role: "donor",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "active",
    created_at: "2026-03-12T14:20:00Z",
    updated_at: "2026-03-12T14:20:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    email: "sadia.afrin@example.com",
    full_name: "Sadia Afrin",
    phone: "+8801615000005",
    role: "donor",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    status: "active",
    created_at: "2026-04-05T10:15:00Z",
    updated_at: "2026-04-05T10:15:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000006",
    email: "rafiqul.bashar@example.com",
    full_name: "Rafiqul Bashar",
    phone: "+8801516000006",
    role: "donor",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "active",
    created_at: "2026-04-18T16:45:00Z",
    updated_at: "2026-04-18T16:45:00Z",
  },
  {
    id: "u0000000-0000-0000-0000-000000000007",
    email: "user.tarek@example.com",
    full_name: "Tarek Rahman",
    phone: "+8801717000007",
    role: "user",
    avatar_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
    status: "active",
    created_at: "2026-05-01T09:00:00Z",
    updated_at: "2026-05-01T09:00:00Z",
  },
];

const INITIAL_DONORS: Donor[] = [
  {
    id: "d0000000-0000-0000-0000-000000000002",
    blood_group: "O+",
    division: "dhaka",
    district: "dhaka_dist",
    upazila: "Dhanmondi",
    full_address: "House 12, Road 4, Dhanmondi, Dhaka",
    date_of_birth: "1995-04-12",
    gender: "male",
    last_donation_date: "2026-06-15",
    is_available: true,
    is_public_search: true,
    phone_public: false,
    total_donations: 8,
    emergency_contact: "+8801711223344",
    bio: "Regular voluntary blood donor and youth leader in Dhanmondi.",
    verified_status: "verified",
    created_at: "2026-02-15T09:30:00Z",
    updated_at: "2026-06-15T12:00:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    blood_group: "A+",
    division: "dhaka",
    district: "dhaka_dist",
    upazila: "Uttara",
    full_address: "Sector 7, Uttara, Dhaka",
    date_of_birth: "1998-09-20",
    gender: "female",
    last_donation_date: "2026-07-02",
    is_available: true,
    is_public_search: true,
    phone_public: true,
    total_donations: 4,
    emergency_contact: "+8801811223355",
    bio: "Always willing to donate for pediatric patients and emergency surgeries.",
    verified_status: "verified",
    created_at: "2026-03-01T11:00:00Z",
    updated_at: "2026-07-02T15:00:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    blood_group: "B+",
    division: "chattogram",
    district: "chattogram_dist",
    upazila: "Panchlaish",
    full_address: "Nasirabad Housing, Chattogram",
    date_of_birth: "1992-11-05",
    gender: "male",
    last_donation_date: "2026-05-10",
    is_available: true,
    is_public_search: true,
    phone_public: false,
    total_donations: 12,
    emergency_contact: "+8801911223366",
    bio: "Regular blood donor since university days. Quick responder in Chattogram.",
    verified_status: "verified",
    created_at: "2026-03-12T14:20:00Z",
    updated_at: "2026-05-10T11:20:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    blood_group: "AB+",
    division: "sylhet",
    district: "sylhet_dist",
    upazila: "Sylhet Sadar",
    full_address: "Zindabazar, Sylhet",
    date_of_birth: "1997-02-18",
    gender: "female",
    last_donation_date: "2026-08-01",
    is_available: true,
    is_public_search: true,
    phone_public: false,
    total_donations: 3,
    emergency_contact: "+8801611223377",
    bio: "Sylhet Medical College student volunteer and voluntary donor.",
    verified_status: "verified",
    created_at: "2026-04-05T10:15:00Z",
    updated_at: "2026-08-01T10:00:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000006",
    blood_group: "O-",
    division: "rajshahi",
    district: "rajshahi_dist",
    upazila: "Boalia / Sadar",
    full_address: "Kazihata, Rajshahi",
    date_of_birth: "1990-08-30",
    gender: "male",
    last_donation_date: "2026-04-10",
    is_available: true,
    is_public_search: true,
    phone_public: false,
    total_donations: 15,
    emergency_contact: "+8801511223388",
    bio: "Rare O- donor. Dedicated to saving lives in trauma cases.",
    verified_status: "verified",
    created_at: "2026-04-18T16:45:00Z",
    updated_at: "2026-04-10T14:00:00Z",
  },
];

const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: "r0000000-0000-0000-0000-000000000001",
    user_id: "u0000000-0000-0000-0000-000000000007",
    patient_name: "Begum Rahima (62)",
    blood_group: "O+",
    bags_needed: 2,
    hospital_name: "Dhaka Medical College Hospital",
    hospital_address: "Secretariat Rd, Shahbagh, Dhaka",
    division: "dhaka",
    district: "dhaka_dist",
    upazila: "Shahbagh",
    required_date: "2026-11-09",
    required_time: "10:00 AM",
    contact_person: "Tarek Rahman (Son)",
    contact_phone: "+8801717000007",
    urgency: "critical",
    notes: "Urgent open-heart surgery scheduled. 2 bags required urgently. Attendants are at the OT counter.",
    status: "verified",
    verified_by: "a0000000-0000-0000-0000-000000000001",
    verified_at: "2026-11-08T06:00:00Z",
    created_at: "2026-11-08T05:30:00Z",
    updated_at: "2026-11-08T06:00:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000002",
    user_id: "u0000000-0000-0000-0000-000000000007",
    patient_name: "Master Arian (7)",
    blood_group: "A+",
    bags_needed: 1,
    hospital_name: "BSMMU (PG Hospital)",
    hospital_address: "Shahbagh, Dhaka",
    division: "dhaka",
    district: "dhaka_dist",
    upazila: "Shahbagh",
    required_date: "2026-11-10",
    required_time: "02:00 PM",
    contact_person: "Farzana Akter (Mother)",
    contact_phone: "+8801819000012",
    urgency: "urgent",
    notes: "Thalassemia regular monthly transfusion. Fresh blood required.",
    status: "verified",
    verified_by: "a0000000-0000-0000-0000-000000000001",
    verified_at: "2026-11-08T07:15:00Z",
    created_at: "2026-11-08T06:45:00Z",
    updated_at: "2026-11-08T07:15:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000003",
    user_id: "u0000000-0000-0000-0000-000000000007",
    patient_name: "Shamsul Haque (45)",
    blood_group: "B-",
    bags_needed: 2,
    hospital_name: "Chittagong Medical College Hospital",
    hospital_address: "57 K.B. Fazlul Kader Rd, Chattogram",
    division: "chattogram",
    district: "chattogram_dist",
    upazila: "Panchlaish",
    required_date: "2026-11-09",
    required_time: "09:00 AM",
    contact_person: "Belal Hossain (Brother)",
    contact_phone: "+8801912345678",
    urgency: "critical",
    notes: "Emergency highway trauma case. Rare B- negative required.",
    status: "verified",
    verified_by: "a0000000-0000-0000-0000-000000000001",
    verified_at: "2026-11-08T08:00:00Z",
    created_at: "2026-11-08T07:30:00Z",
    updated_at: "2026-11-08T08:00:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000004",
    user_id: "u0000000-0000-0000-0000-000000000007",
    patient_name: "Rubel Mia (28)",
    blood_group: "AB+",
    bags_needed: 1,
    hospital_name: "Sylhet MAG Osmani Medical College",
    hospital_address: "Medical Road, Sylhet",
    division: "sylhet",
    district: "sylhet_dist",
    upazila: "Sylhet Sadar",
    required_date: "2026-11-11",
    required_time: "11:00 AM",
    contact_person: "Rubel Family",
    contact_phone: "+8801612345678",
    urgency: "normal",
    notes: "Orthopedic surgery for leg fracture.",
    status: "pending",
    created_at: "2026-11-08T09:10:00Z",
    updated_at: "2026-11-08T09:10:00Z",
  },
];

const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: "dn-001",
    donor_id: "d0000000-0000-0000-0000-000000000002",
    patient_name: "Anowar Kabir",
    blood_group: "O+",
    hospital_name: "Dhaka Medical College Hospital",
    district: "dhaka_dist",
    donation_date: "2026-06-15",
    bags_donated: 1,
    notes: "Direct voluntary donation for surgery.",
    created_at: "2026-06-15T13:00:00Z",
  },
  {
    id: "dn-002",
    donor_id: "d0000000-0000-0000-0000-000000000003",
    patient_name: "Salma Khatun",
    blood_group: "A+",
    hospital_name: "Kurmitola General Hospital",
    district: "dhaka_dist",
    donation_date: "2026-07-02",
    bags_donated: 1,
    notes: "Emergency maternity delivery support.",
    created_at: "2026-07-02T16:00:00Z",
  },
  {
    id: "dn-003",
    donor_id: "d0000000-0000-0000-0000-000000000004",
    patient_name: "Habibur Rahman",
    blood_group: "B+",
    hospital_name: "Chittagong Medical College",
    district: "chattogram_dist",
    donation_date: "2026-05-10",
    bags_donated: 1,
    notes: "Trauma ward voluntary donation.",
    created_at: "2026-05-10T12:00:00Z",
  },
];

const INITIAL_NOTIFICATIONS: InAppNotification[] = [
  {
    id: "notif-001",
    user_id: "d0000000-0000-0000-0000-000000000002",
    title: "Urgent O+ Blood Needed in Dhaka!",
    message: "A verified emergency request at Dhaka Medical College Hospital matches your blood group and district.",
    type: "request_match",
    link: "/blood-requests/r0000000-0000-0000-0000-000000000001",
    is_read: false,
    created_at: "2026-11-08T06:05:00Z",
  },
  {
    id: "notif-002",
    user_id: "u0000000-0000-0000-0000-000000000007",
    title: "Blood Request Verified",
    message: "Your blood request for Begum Rahima has been verified by Dr. Mahmud Hasan.",
    type: "request_verified",
    link: "/blood-requests/r0000000-0000-0000-0000-000000000001",
    is_read: false,
    created_at: "2026-11-08T06:01:00Z",
  },
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    title: "Understanding the Blood Supply Chain in Bangladesh Hospitals",
    slug: "blood-supply-chain-bangladesh",
    summary: "How voluntary blood donations bridge the critical shortage during surgical and maternal emergencies across Bangladesh.",
    content: `Every year, Bangladesh requires an estimated 800,000 to 1,000,000 units of safe blood. While voluntary donation has grown dramatically thanks to youth organizations and digital platforms like RedHope, replacement donors still make up a substantial share.

### The Critical Need for Safe Screening
All collected blood units must undergo stringent mandatory screening for five transfusion-transmissible infections:
- HIV 1 & 2
- Hepatitis B (HBsAg)
- Hepatitis C (HCV)
- Syphilis (VDRL)
- Malaria

RedHope works tirelessly to raise civic awareness and promote repeated, voluntary, unremunerated blood donors who represent the safest cohort of donors worldwide.`,
    category: "Health Awareness",
    author_name: "Dr. Mahmud Hasan",
    cover_image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800",
    is_published: true,
    published_at: "2026-10-25T10:00:00Z",
    created_at: "2026-10-25T10:00:00Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    title: "A Hero Without A Cape: How Rafiq Saved a 6-Year-Old Thalassemia Warrior",
    slug: "rafiq-donor-story",
    summary: "A heartfelt story of swift coordination, rare blood compatibility, and a mother’s gratitude.",
    content: `When 6-year-old Sami required emergency O- blood at BSMMU, his family was running out of time. Negative blood groups account for less than 3% of Bangladesh's population.

Through RedHope's location filter, the hospital coordinator matched with Rafiqul Bashar, a registered donor in Rajshahi who was visiting Dhaka for professional work. 

Within 45 minutes, Rafiq arrived at the hospital, passed hemoglobin screening, and completed the transfusion. 

*"I believe donating blood is not just a favor; it is our fundamental humanitarian responsibility,"* Rafiq remarked with humility after the transfusion.`,
    category: "Donor Stories",
    author_name: "RedHope Editorial Team",
    cover_image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800",
    is_published: true,
    published_at: "2026-11-02T12:00:00Z",
    created_at: "2026-11-02T12:00:00Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    title: "Platelets & Plasma: Beyond Whole Blood Donations",
    slug: "platelets-and-plasma-guide",
    summary: "An introduction to apheresis and how component separation helps dengue, cancer, and burn patients.",
    content: `Many patients do not require whole blood, but rather specific components such as Platelets, Fresh Frozen Plasma (FFP), or Packed Red Blood Cells (PRBC).

During severe dengue outbreaks in Dhaka and Chattogram, platelet counts can precipitously drop below 20,000/μL, creating life-threatening internal hemorrhages. One single-donor platelet (SDP) apheresis donation can yield the equivalent of 6 to 8 random donor platelet units.`,
    category: "Emergency Awareness",
    author_name: "Dr. Anisur Rahman",
    cover_image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800",
    is_published: true,
    published_at: "2026-11-05T09:00:00Z",
    created_at: "2026-11-05T09:00:00Z",
  },
];

const INITIAL_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "k0000000-0000-0000-0000-000000000001",
    title: "Who Can Donate Blood? Essential Eligibility Guidelines",
    slug: "who-can-donate-blood",
    category: "Eligibility",
    summary: "Basic physical requirements including age, weight, and hemoglobin levels for donors in Bangladesh.",
    content: `### Who Can Donate Blood?
In Bangladesh and globally under WHO guidelines, blood donation is safe and life-saving. You are generally eligible if you:
- Are between 18 and 60 years of age.
- Weigh at least 45 kg (females) or 50 kg (males).
- Have a hemoglobin count of at least 12.5 g/dL.
- Pulse rate between 60 and 100 beats per minute.
- Blood pressure is within normal ranges (Systolic 100-140, Diastolic 60-90).
- Have not donated blood in the last 90 to 120 days.

### Temporary Deferrals:
- Cold, flu, or fever in the past 48 hours.
- Major surgery in the past 6 months.
- Tattoo or body piercing in the past 6 months.
- Currently pregnant or breastfeeding.`,
    order_index: 1,
    is_published: true,
    created_at: "2026-10-15T08:00:00Z",
  },
  {
    id: "k0000000-0000-0000-0000-000000000002",
    title: "Debunking Common Myths About Blood Donation in Bangladesh",
    slug: "common-blood-donation-myths",
    category: "Myths & Facts",
    summary: "Addressing pervasive misconceptions such as physical weakness, weight gain, or infections.",
    content: `### Myth 1: Donating blood makes you physically weak
**Fact:** The body replaces fluid (plasma) within 24 to 48 hours, and red blood cells are regenerated within 4 to 8 weeks. Most healthy donors resume normal light activities immediately.

### Myth 2: You can contract HIV or hepatitis while donating
**Fact:** At licensed medical facilities and RedHope verified camps, all needles, collection bags, and sterile equipment are strictly single-use and disposed of in medical biohazard containers.

### Myth 3: People with high blood pressure can never donate
**Fact:** If your blood pressure is well controlled within acceptable limits on the day of screening, you can safely donate.`,
    order_index: 2,
    is_published: true,
    created_at: "2026-10-16T08:00:00Z",
  },
  {
    id: "k0000000-0000-0000-0000-000000000003",
    title: "How to Prepare Before and After Blood Donation",
    slug: "preparation-and-aftercare",
    category: "Health Tips",
    summary: "Nutritional guidance, hydration, and recovery steps to ensure a smooth donation experience.",
    content: `### Before Donation:
- Drink plenty of water and natural fluids (at least 500ml extra).
- Eat a healthy, low-fat meal 2 to 3 hours beforehand.
- Avoid smoking 2 hours before donation.
- Have a sound night of sleep.

### After Donation:
- Rest for 10-15 minutes in the recovery area.
- Enjoy a sweet drink and snack provided by the clinic.
- Keep the bandage on for 4 hours.
- Avoid heavy weightlifting or intense physical workouts for 24 hours.`,
    order_index: 3,
    is_published: true,
    created_at: "2026-10-17T08:00:00Z",
  },
  {
    id: "k0000000-0000-0000-0000-000000000004",
    title: "Blood Group Compatibility: The Science of Giving and Receiving",
    slug: "blood-group-compatibility",
    category: "Blood Science",
    summary: "Understand ABO and Rh blood types, universal donors (O-), and universal recipients (AB+).",
    content: `Blood types are determined by the presence or absence of certain antigens (A and B) and the Rh protein (+ or -).

### Compatibility Matrix:
- **O- Negative**: Can donate red blood cells to ANY blood group (Universal Donor).
- **O+ Positive**: Can donate to O+, A+, B+, AB+.
- **A+ Positive**: Can donate to A+, AB+. Can receive from A+, A-, O+, O-.
- **B+ Positive**: Can donate to B+, AB+. Can receive from B+, B-, O+, O-.
- **AB+ Positive**: Can receive red blood cells from ANY blood group (Universal Recipient).`,
    order_index: 4,
    is_published: true,
    created_at: "2026-10-18T08:00:00Z",
  },
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t0000000-0000-0000-0000-000000000001",
    name: "Farhana Chowdhury",
    role: "Patient Family, Dhaka",
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
    comment: "RedHope saved my father’s life during his emergency heart surgery at National Heart Foundation. We found two O- donors within 30 minutes!",
    blood_group: "O-",
    rating: 5,
    is_featured: true,
    created_at: "2026-09-12T10:00:00Z",
  },
  {
    id: "t0000000-0000-0000-0000-000000000002",
    name: "Saiful Alam",
    role: "Regular Donor (14 Times)",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    comment: "The donor dashboard and privacy controls are fantastic. I only get notified when someone truly needs my blood group in my district.",
    blood_group: "B+",
    rating: 5,
    is_featured: true,
    created_at: "2026-09-20T14:00:00Z",
  },
  {
    id: "t0000000-0000-0000-0000-000000000003",
    name: "Dr. Anisur Rahman",
    role: "Physician, DMCH",
    photo_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120",
    comment: "As an emergency room physician, timely blood availability is the difference between life and death. RedHope is an exceptional platform for Bangladesh.",
    blood_group: "A+",
    rating: 5,
    is_featured: true,
    created_at: "2026-10-01T11:00:00Z",
  },
];

const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: "log-001",
    admin_id: "a0000000-0000-0000-0000-000000000001",
    admin_name: "Dr. Mahmud Hasan",
    action: "VERIFY_BLOOD_REQUEST",
    target_type: "blood_request",
    target_id: "r0000000-0000-0000-0000-000000000001",
    details: "Verified patient Begum Rahima at DMCH after contacting attending ward physician.",
    created_at: "2026-11-08T06:00:00Z",
  },
  {
    id: "log-002",
    admin_id: "a0000000-0000-0000-0000-000000000001",
    admin_name: "Dr. Mahmud Hasan",
    action: "VERIFY_BLOOD_REQUEST",
    target_type: "blood_request",
    target_id: "r0000000-0000-0000-0000-000000000002",
    details: "Verified thalassemia request for Master Arian at BSMMU.",
    created_at: "2026-11-08T07:15:00Z",
  },
];

class RedHopeStore {
  private getStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  // --- Profiles & Donors ---
  getProfiles(): Profile[] {
    return this.getStorage<Profile[]>("profiles", INITIAL_PROFILES);
  }

  getDonors(): (Donor & { profile: Profile })[] {
    const donors = this.getStorage<Donor[]>("donors", INITIAL_DONORS);
    const profiles = this.getProfiles();
    return donors.map((d) => {
      const prof = profiles.find((p) => p.id === d.id) || {
        id: d.id,
        email: "donor@redhope.org",
        full_name: "Volunteer Donor",
        phone: "+8801700000000",
        role: "donor",
        status: "active",
        created_at: d.created_at,
        updated_at: d.updated_at,
      };
      return { ...d, profile: prof };
    });
  }

  getDonorById(id: string): (Donor & { profile: Profile }) | null {
    const donors = this.getDonors();
    return donors.find((d) => d.id === id) || null;
  }

  registerDonor(
    profileData: Omit<Profile, "id" | "created_at" | "updated_at" | "status">,
    donorData: Omit<Donor, "id" | "created_at" | "updated_at" | "total_donations" | "verified_status">
  ): Donor & { profile: Profile } {
    const id = "d_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    const newProfile: Profile = {
      id,
      ...profileData,
      role: "donor",
      status: "active",
      created_at: now,
      updated_at: now,
    };

    const newDonor: Donor = {
      id,
      ...donorData,
      total_donations: 0,
      verified_status: "verified",
      created_at: now,
      updated_at: now,
    };

    const profiles = this.getProfiles();
    profiles.push(newProfile);
    this.setStorage("profiles", profiles);

    const donors = this.getStorage<Donor[]>("donors", INITIAL_DONORS);
    donors.push(newDonor);
    this.setStorage("donors", donors);

    return { ...newDonor, profile: newProfile };
  }

  updateDonor(id: string, updates: Partial<Donor>): boolean {
    const donors = this.getStorage<Donor[]>("donors", INITIAL_DONORS);
    const idx = donors.findIndex((d) => d.id === id);
    if (idx === -1) return false;

    donors[idx] = {
      ...donors[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.setStorage("donors", donors);
    return true;
  }

  updateProfile(id: string, updates: Partial<Profile>): boolean {
    const profiles = this.getProfiles();
    const idx = profiles.findIndex((p) => p.id === id);
    if (idx === -1) return false;

    profiles[idx] = {
      ...profiles[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.setStorage("profiles", profiles);
    return true;
  }

  // --- Blood Requests ---
  getBloodRequests(): BloodRequest[] {
    return this.getStorage<BloodRequest[]>("blood_requests", INITIAL_BLOOD_REQUESTS);
  }

  getBloodRequestById(id: string): BloodRequest | null {
    const requests = this.getBloodRequests();
    return requests.find((r) => r.id === id) || null;
  }

  createBloodRequest(
    data: Omit<BloodRequest, "id" | "status" | "created_at" | "updated_at">
  ): BloodRequest {
    const id = "req_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    const newReq: BloodRequest = {
      id,
      ...data,
      status: "pending", // Starts as pending verification
      created_at: now,
      updated_at: now,
    };

    const requests = this.getBloodRequests();
    requests.unshift(newReq);
    this.setStorage("blood_requests", requests);

    // Notify Admins
    this.addNotification({
      user_id: "a0000000-0000-0000-0000-000000000001",
      title: "New Blood Request Submitted",
      message: `Blood request for ${data.patient_name} (${data.blood_group}) at ${data.hospital_name} requires verification.`,
      type: "system",
      link: `/admin`,
      is_read: false,
    });

    return newReq;
  }

  updateBloodRequestStatus(
    id: string,
    status: RequestStatus,
    adminId?: string,
    adminName?: string,
    rejectionReason?: string
  ): boolean {
    const requests = this.getBloodRequests();
    const idx = requests.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    const req = requests[idx];
    const now = new Date().toISOString();

    req.status = status;
    req.updated_at = now;
    if (adminId) req.verified_by = adminId;
    if (status === "verified") req.verified_at = now;
    if (status === "rejected" && rejectionReason) req.rejection_reason = rejectionReason;

    requests[idx] = req;
    this.setStorage("blood_requests", requests);

    // Log admin audit
    if (adminId && adminName) {
      this.addAuditLog({
        admin_id: adminId,
        admin_name: adminName,
        action: `REQUEST_${status.toUpperCase()}`,
        target_type: "blood_request",
        target_id: id,
        details: `Updated request for ${req.patient_name} (${req.blood_group}) to status: ${status}. ${rejectionReason ? "Reason: " + rejectionReason : ""}`,
      });
    }

    // If verified, notify matching donors in that district
    if (status === "verified") {
      const donors = this.getDonors().filter(
        (d) => d.blood_group === req.blood_group && d.district === req.district && d.is_available
      );

      donors.forEach((d) => {
        this.addNotification({
          user_id: d.id,
          title: `URGENT: ${req.blood_group} Blood Needed in ${d.district}`,
          message: `Verified patient ${req.patient_name} at ${req.hospital_name} urgently needs your blood group!`,
          type: "request_match",
          link: `/blood-requests/${req.id}`,
          is_read: false,
        });
      });

      // Notify the requester
      if (req.user_id) {
        this.addNotification({
          user_id: req.user_id,
          title: "Your Blood Request is Verified!",
          message: `Your request for ${req.patient_name} is now publicly broadcasted to compatible donors.`,
          type: "request_verified",
          link: `/blood-requests/${req.id}`,
          is_read: false,
        });
      }
    }

    return true;
  }

  // --- Donations History ---
  getDonations(): DonationRecord[] {
    return this.getStorage<DonationRecord[]>("donations", INITIAL_DONATIONS);
  }

  addDonation(record: Omit<DonationRecord, "id" | "created_at">): DonationRecord {
    const id = "dn_" + Date.now().toString(36);
    const newRecord: DonationRecord = {
      id,
      ...record,
      created_at: new Date().toISOString(),
    };

    const donations = this.getDonations();
    donations.unshift(newRecord);
    this.setStorage("donations", donations);

    // Increment donor total_donations
    const donors = this.getStorage<Donor[]>("donors", INITIAL_DONORS);
    const donorIdx = donors.findIndex((d) => d.id === record.donor_id);
    if (donorIdx !== -1) {
      donors[donorIdx].total_donations += record.bags_donated || 1;
      donors[donorIdx].last_donation_date = record.donation_date;
      this.setStorage("donors", donors);
    }

    return newRecord;
  }

  // --- Contact Requests ---
  getContactRequests(): ContactRequest[] {
    return this.getStorage<ContactRequest[]>("contact_requests", []);
  }

  createContactRequest(
    data: Omit<ContactRequest, "id" | "status" | "created_at">
  ): ContactRequest {
    const id = "cr_" + Date.now().toString(36);
    const newReq: ContactRequest = {
      id,
      ...data,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const requests = this.getContactRequests();
    requests.unshift(newReq);
    this.setStorage("contact_requests", requests);

    // Notify the donor
    this.addNotification({
      user_id: data.donor_id,
      title: "New Donor Contact Request",
      message: `${data.requester_name} has requested your direct contact details: "${data.reason}".`,
      type: "contact_request",
      link: `/donor-dashboard`,
      is_read: false,
    });

    return newReq;
  }

  updateContactRequestStatus(id: string, status: "approved" | "declined"): boolean {
    const requests = this.getContactRequests();
    const idx = requests.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    requests[idx].status = status;
    this.setStorage("contact_requests", requests);

    // Notify requester
    const cr = requests[idx];
    this.addNotification({
      user_id: cr.requester_id,
      title: `Contact Request ${status === "approved" ? "Approved!" : "Declined"}`,
      message: `Your contact request has been ${status} by the donor.`,
      type: "status_update",
      link: `/dashboard`,
      is_read: false,
    });

    return true;
  }

  // --- Notifications ---
  getNotifications(userId?: string): InAppNotification[] {
    const notifs = this.getStorage<InAppNotification[]>("notifications", INITIAL_NOTIFICATIONS);
    if (!userId) return notifs;
    return notifs.filter((n) => n.user_id === userId);
  }

  addNotification(notif: Omit<InAppNotification, "id" | "created_at">): InAppNotification {
    const id = "nt_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const newNotif: InAppNotification = {
      id,
      ...notif,
      created_at: new Date().toISOString(),
    };
    const notifs = this.getStorage<InAppNotification[]>("notifications", INITIAL_NOTIFICATIONS);
    notifs.unshift(newNotif);
    this.setStorage("notifications", notifs);
    return newNotif;
  }

  markNotificationAsRead(id: string): void {
    const notifs = this.getStorage<InAppNotification[]>("notifications", INITIAL_NOTIFICATIONS);
    const idx = notifs.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notifs[idx].is_read = true;
      this.setStorage("notifications", notifs);
    }
  }

  markAllNotificationsAsRead(userId: string): void {
    const notifs = this.getStorage<InAppNotification[]>("notifications", INITIAL_NOTIFICATIONS);
    notifs.forEach((n) => {
      if (n.user_id === userId) n.is_read = true;
    });
    this.setStorage("notifications", notifs);
  }

  // --- Blog & Knowledge ---
  getBlogPosts(): BlogPost[] {
    return this.getStorage<BlogPost[]>("blog_posts", INITIAL_BLOG_POSTS);
  }

  getBlogPostBySlug(slug: string): BlogPost | null {
    return this.getBlogPosts().find((p) => p.slug === slug) || null;
  }

  createBlogPost(post: Omit<BlogPost, "id" | "created_at">): BlogPost {
    const id = "bp_" + Date.now().toString(36);
    const newPost: BlogPost = {
      id,
      ...post,
      created_at: new Date().toISOString(),
    };
    const posts = this.getBlogPosts();
    posts.unshift(newPost);
    this.setStorage("blog_posts", posts);
    return newPost;
  }

  deleteBlogPost(id: string): boolean {
    const posts = this.getBlogPosts().filter((p) => p.id !== id);
    this.setStorage("blog_posts", posts);
    return true;
  }

  getKnowledgeArticles(): KnowledgeArticle[] {
    return this.getStorage<KnowledgeArticle[]>("knowledge_articles", INITIAL_KNOWLEDGE_ARTICLES);
  }

  getKnowledgeArticleBySlug(slug: string): KnowledgeArticle | null {
    return this.getKnowledgeArticles().find((a) => a.slug === slug) || null;
  }

  // --- Testimonials ---
  getTestimonials(): Testimonial[] {
    return this.getStorage<Testimonial[]>("testimonials", INITIAL_TESTIMONIALS);
  }

  addTestimonial(t: Omit<Testimonial, "id" | "created_at">): Testimonial {
    const id = "tm_" + Date.now().toString(36);
    const newTestimonial: Testimonial = {
      id,
      ...t,
      created_at: new Date().toISOString(),
    };
    const list = this.getTestimonials();
    list.unshift(newTestimonial);
    this.setStorage("testimonials", list);
    return newTestimonial;
  }

  // --- Contact Inquiries ---
  getContactMessages(): ContactMessage[] {
    return this.getStorage<ContactMessage[]>("contact_messages", []);
  }

  submitContactMessage(msg: Omit<ContactMessage, "id" | "is_read" | "replied" | "created_at">): ContactMessage {
    const id = "cm_" + Date.now().toString(36);
    const newMsg: ContactMessage = {
      id,
      ...msg,
      is_read: false,
      replied: false,
      created_at: new Date().toISOString(),
    };
    const list = this.getContactMessages();
    list.unshift(newMsg);
    this.setStorage("contact_messages", list);
    return newMsg;
  }

  // --- Admin Audit Logs ---
  getAuditLogs(): AdminAuditLog[] {
    return this.getStorage<AdminAuditLog[]>("admin_audit_logs", INITIAL_AUDIT_LOGS);
  }

  addAuditLog(log: Omit<AdminAuditLog, "id" | "created_at">): AdminAuditLog {
    const id = "log_" + Date.now().toString(36);
    const newLog: AdminAuditLog = {
      id,
      ...log,
      created_at: new Date().toISOString(),
    };
    const logs = this.getAuditLogs();
    logs.unshift(newLog);
    this.setStorage("admin_audit_logs", logs);
    return newLog;
  }

  // --- Dynamic Platform Statistics ---
  getPlatformStats() {
    const donors = this.getDonors();
    const requests = this.getBloodRequests();
    const donations = this.getDonations();

    const totalDonors = donors.length;
    // Calculate total donations from donations records + reported donor history
    const recordedDonationBags = donations.reduce((sum, d) => sum + (d.bags_donated || 1), 0);
    const reportedHistory = donors.reduce((sum, d) => sum + (d.total_donations || 0), 0);
    const totalDonations = Math.max(recordedDonationBags + reportedHistory, 148);

    const activeRequests = requests.filter((r) => r.status === "verified" || r.status === "in_progress").length;
    const livesHelped = Math.max(totalDonations * 3, 440); // 1 blood bag can save up to 3 lives

    return {
      totalDonors,
      totalDonations,
      activeRequests,
      livesHelped,
    };
  }

  // Search filter
  searchDonors(filters: {
    blood_group?: string;
    division?: string;
    district?: string;
    upazila?: string;
    is_available?: boolean;
    searchTerm?: string;
  }): (Donor & { profile: Profile })[] {
    let list = this.getDonors().filter((d) => d.is_public_search);

    if (filters.blood_group && filters.blood_group !== "all") {
      list = list.filter((d) => d.blood_group === filters.blood_group);
    }
    if (filters.division && filters.division !== "all") {
      list = list.filter((d) => d.division === filters.division);
    }
    if (filters.district && filters.district !== "all") {
      list = list.filter((d) => d.district === filters.district);
    }
    if (filters.upazila && filters.upazila !== "all") {
      list = list.filter((d) => d.upazila.toLowerCase().includes(filters.upazila!.toLowerCase()));
    }
    if (filters.is_available !== undefined) {
      list = list.filter((d) => d.is_available === filters.is_available);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      list = list.filter(
        (d) =>
          d.profile.full_name.toLowerCase().includes(term) ||
          d.upazila.toLowerCase().includes(term) ||
          d.district.toLowerCase().includes(term)
      );
    }

    return list;
  }
}

export const redHopeStore = new RedHopeStore();
