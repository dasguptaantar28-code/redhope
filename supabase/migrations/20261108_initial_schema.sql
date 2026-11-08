-- REDHOPE DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Production-Ready Schema with Row Level Security (RLS)

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'donor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE blood_group_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status_type AS ENUM ('pending', 'verified', 'in_progress', 'fulfilled', 'cancelled', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE urgency_type AS ENUM ('normal', 'urgent', 'critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Mirrors Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    role user_role DEFAULT 'user'::user_role NOT NULL,
    avatar_url TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger to sync new Supabase Auth users automatically into public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'user'::user_role)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. DONORS TABLE (Detailed donor attributes & privacy settings)
CREATE TABLE IF NOT EXISTS public.donors (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    blood_group blood_group_type NOT NULL,
    division TEXT NOT NULL,
    district TEXT NOT NULL,
    upazila TEXT NOT NULL,
    full_address TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE NOT NULL,
    is_public_search BOOLEAN DEFAULT TRUE NOT NULL,
    phone_public BOOLEAN DEFAULT FALSE NOT NULL,
    total_donations INTEGER DEFAULT 0 NOT NULL CHECK (total_donations >= 0),
    emergency_contact TEXT,
    bio TEXT,
    verified_status TEXT DEFAULT 'unverified' CHECK (verified_status IN ('unverified', 'verified')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. BLOOD REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.blood_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    blood_group blood_group_type NOT NULL,
    bags_needed INTEGER DEFAULT 1 NOT NULL CHECK (bags_needed > 0),
    hospital_name TEXT NOT NULL,
    hospital_address TEXT NOT NULL,
    division TEXT NOT NULL,
    district TEXT NOT NULL,
    upazila TEXT NOT NULL,
    required_date DATE NOT NULL,
    required_time TEXT,
    contact_person TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    urgency urgency_type DEFAULT 'urgent' NOT NULL,
    notes TEXT,
    status request_status_type DEFAULT 'pending' NOT NULL,
    verified_by UUID REFERENCES public.profiles(id),
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. DONATIONS HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES public.donors(id) ON DELETE CASCADE NOT NULL,
    blood_request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
    patient_name TEXT,
    blood_group blood_group_type NOT NULL,
    hospital_name TEXT NOT NULL,
    district TEXT NOT NULL,
    donation_date DATE NOT NULL,
    bags_donated INTEGER DEFAULT 1 NOT NULL,
    certificate_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. CONTACT REQUESTS TABLE (Privacy-Preserving Contact Flow)
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    donor_id UUID REFERENCES public.donors(id) ON DELETE CASCADE NOT NULL,
    blood_request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
    requester_name TEXT NOT NULL,
    requester_phone TEXT NOT NULL,
    reason TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. IN-APP NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('request_match', 'request_verified', 'contact_request', 'status_update', 'system')),
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Blood Donation', 'Health Awareness', 'Donor Stories', 'Emergency Awareness', 'Community Activities')),
    author_name TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. KNOWLEDGE ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.knowledge_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT,
    comment TEXT NOT NULL,
    blood_group blood_group_type,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    replied BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. ADMIN AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    admin_name TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    details TEXT NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==========================================
-- INDEXES FOR MAXIMUM SEARCH & QUERY SPEED
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_donors_search ON public.donors (blood_group, division, district, is_available, is_public_search);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.blood_requests (status, blood_group, division, district);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications (user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_knowledge_slug ON public.knowledge_articles (slug);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function to check if caller is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Public can read basic profile, user can edit own, admin has full access
CREATE POLICY "Public profiles can be viewed by anyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Donors: Public search can only view donors who consented (is_public_search = true)
CREATE POLICY "Anyone can view public consenting donors"
ON public.donors FOR SELECT
USING (is_public_search = true OR auth.uid() = id OR public.is_admin());

CREATE POLICY "Donors can update their own donor record"
ON public.donors FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can register as donors"
ON public.donors FOR INSERT
WITH CHECK (auth.uid() = id);

-- Blood Requests: Anyone can view verified/fulfilled requests; Users can view their own; Admins see all
CREATE POLICY "Public can view verified blood requests"
ON public.blood_requests FOR SELECT
USING (status IN ('verified', 'in_progress', 'fulfilled') OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Authenticated users can submit blood requests"
ON public.blood_requests FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own unverified requests or cancel them"
ON public.blood_requests FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin());

-- Contact Requests: Requester and Donor can access
CREATE POLICY "Participants can view contact requests"
ON public.contact_requests FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = donor_id OR public.is_admin());

CREATE POLICY "Users can create contact requests"
ON public.contact_requests FOR INSERT
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Donors can update contact request status"
ON public.contact_requests FOR UPDATE
USING (auth.uid() = donor_id OR public.is_admin());

-- Notifications: Only target user can read/update
CREATE POLICY "Users view own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

-- Blog & Knowledge Articles & Testimonials: Public readable, admin writable
CREATE POLICY "Public can read published blog posts"
ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read knowledge articles"
ON public.knowledge_articles FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admins can manage knowledge articles"
ON public.knowledge_articles FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read testimonials"
ON public.testimonials FOR SELECT USING (is_featured = true OR public.is_admin());

-- Contact Messages: Anyone can insert, only admins can view
CREATE POLICY "Anyone can send a contact message"
ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
ON public.contact_messages FOR SELECT USING (public.is_admin());

-- Admin Audit Logs: Only admins can view
CREATE POLICY "Only admins can view audit logs"
ON public.admin_audit_logs FOR SELECT USING (public.is_admin());
