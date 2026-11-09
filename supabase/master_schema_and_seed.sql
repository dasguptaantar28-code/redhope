-- ==============================================================================
-- REDHOPE — MASTER DATABASE SCHEMA & INITIAL DEMO SEED
-- Paste this entire file into Supabase SQL Editor and click "Run" (Ctrl+Enter)
-- ==============================================================================

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

-- 3. PROFILES TABLE
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

-- 7. CONTACT REQUESTS TABLE
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
-- INDEXES FOR MAXIMUM SPEED
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

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Public profiles can be viewed by anyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view public consenting donors" ON public.donors FOR SELECT USING (is_public_search = true OR auth.uid() = id OR public.is_admin());
CREATE POLICY "Donors can update their own donor record" ON public.donors FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can register as donors" ON public.donors FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view verified blood requests" ON public.blood_requests FOR SELECT USING (status IN ('verified', 'in_progress', 'fulfilled') OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Authenticated users can submit blood requests" ON public.blood_requests FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own unverified requests or cancel them" ON public.blood_requests FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Participants can view contact requests" ON public.contact_requests FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = donor_id OR public.is_admin());
CREATE POLICY "Users can create contact requests" ON public.contact_requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Donors can update contact request status" ON public.contact_requests FOR UPDATE USING (auth.uid() = donor_id OR public.is_admin());

CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Public can read published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read knowledge articles" ON public.knowledge_articles FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can manage knowledge articles" ON public.knowledge_articles FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT USING (is_featured = true OR public.is_admin());
CREATE POLICY "Anyone can send a contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view contact messages" ON public.contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "Only admins can view audit logs" ON public.admin_audit_logs FOR SELECT USING (public.is_admin());

-- ==============================================================================
-- INITIAL DEMO SEED DATA (BANGLADESH REALISTIC DATA)
-- ==============================================================================

-- 1. Profiles (Admins, Donors, Users)
INSERT INTO public.profiles (id, email, full_name, phone, role, avatar_url, status)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'admin@redhope.org', 'Dr. Mahmud Hasan (Admin)', '+8801711000001', 'admin', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150', 'active'),
  ('d0000000-0000-0000-0000-000000000002', 'tanvir.ahmed@example.com', 'Tanvir Ahmed', '+8801812000002', 'donor', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'active'),
  ('d0000000-0000-0000-0000-000000000003', 'nusrat.jahan@example.com', 'Nusrat Jahan', '+8801913000003', 'donor', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 'active'),
  ('d0000000-0000-0000-0000-000000000004', 'kamrul.islam@example.com', 'Kamrul Islam', '+8801714000004', 'donor', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'active'),
  ('d0000000-0000-0000-0000-000000000005', 'sadia.afrin@example.com', 'Sadia Afrin', '+8801615000005', 'donor', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'active'),
  ('d0000000-0000-0000-0000-000000000006', 'rafiqul.bashar@example.com', 'Rafiqul Bashar', '+8801516000006', 'donor', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'active'),
  ('00000000-0000-0000-0000-000000000007', 'user.tarek@example.com', 'Tarek Rahman', '+8801717000007', 'user', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150', 'active')
ON CONFLICT (id) DO NOTHING;

-- 2. Donors
INSERT INTO public.donors (id, blood_group, division, district, upazila, full_address, date_of_birth, gender, last_donation_date, is_available, is_public_search, phone_public, total_donations, emergency_contact, bio, verified_status)
VALUES
  ('d0000000-0000-0000-0000-000000000002', 'O+', 'dhaka', 'dhaka_dist', 'Dhanmondi', 'House 12, Road 4, Dhanmondi, Dhaka', '1995-04-12', 'male', '2026-06-15', true, true, false, 8, '+8801711223344', 'Regular blood donor and social volunteer in Dhaka.', 'verified'),
  ('d0000000-0000-0000-0000-000000000003', 'A+', 'dhaka', 'dhaka_dist', 'Uttara', 'Sector 7, Uttara, Dhaka', '1998-09-20', 'female', '2026-07-02', true, true, true, 4, '+8801811223355', 'Happy to donate blood for emergencies and pediatric patients.', 'verified'),
  ('d0000000-0000-0000-0000-000000000004', 'B+', 'chattogram', 'chattogram_dist', 'Panchlaish', 'Nasirabad Housing, Chattogram', '1992-11-05', 'male', '2026-05-10', true, true, false, 12, '+8801911223366', 'Universal donor mindset. Always ready during emergency hours.', 'verified'),
  ('d0000000-0000-0000-0000-000000000005', 'AB+', 'sylhet', 'sylhet_dist', 'Sylhet Sadar', 'Zindabazar, Sylhet', '1997-02-18', 'female', '2026-08-01', true, true, false, 3, '+8801611223377', 'University student donor representative.', 'verified'),
  ('d0000000-0000-0000-0000-000000000006', 'O-', 'rajshahi', 'rajshahi_dist', 'Boalia / Sadar', 'Kazihata, Rajshahi', '1990-08-30', 'male', '2026-04-10', true, true, false, 15, '+8801511223388', 'Rare O- Negative donor. Please reach out in genuine hospital emergencies.', 'verified')
ON CONFLICT (id) DO NOTHING;

-- 3. Blood Requests
INSERT INTO public.blood_requests (id, user_id, patient_name, blood_group, bags_needed, hospital_name, hospital_address, division, district, upazila, required_date, required_time, contact_person, contact_phone, urgency, notes, status, verified_by)
VALUES
  ('c0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000007', 'Begum Rahima (62)', 'O+', 2, 'Dhaka Medical College Hospital', 'Secretariat Rd, Shahbagh, Dhaka', 'dhaka', 'dhaka_dist', 'Shahbagh', CURRENT_DATE + INTERVAL '1 day', '10:00 AM', 'Tarek Rahman (Son)', '+8801717000007', 'critical', 'Urgent bypass surgery scheduled. 2 bags required urgently.', 'verified', 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000007', 'Master Arian (7)', 'A+', 1, 'BSMMU (PG Hospital)', 'Shahbagh, Dhaka', 'dhaka', 'dhaka_dist', 'Shahbagh', CURRENT_DATE + INTERVAL '2 days', '02:00 PM', 'Farzana Akter (Mother)', '+8801819000012', 'urgent', 'Thalassemia routine transfusion. Fresh blood required.', 'verified', 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000007', 'Shamsul Haque (45)', 'B-', 2, 'Chittagong Medical College Hospital', '57 K.B. Fazlul Kader Rd, Chattogram', 'chattogram', 'chattogram_dist', 'Panchlaish', CURRENT_DATE + INTERVAL '1 day', '09:00 AM', 'Belal Hossain', '+8801912345678', 'critical', 'Emergency accident trauma care. Rare B- negative required.', 'verified', 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000007', 'Rubel Mia (28)', 'AB+', 1, 'Sylhet MAG Osmani Medical College', 'Medical Road, Sylhet', 'sylhet', 'sylhet_dist', 'Sylhet Sadar', CURRENT_DATE + INTERVAL '3 days', '11:00 AM', 'Rubel Family', '+8801612345678', 'normal', 'Orthopedic bone fracture surgery.', 'pending', NULL)
ON CONFLICT (id) DO NOTHING;

-- 4. Knowledge Articles
INSERT INTO public.knowledge_articles (id, title, slug, category, summary, content, order_index, is_published)
VALUES
  ('f0000000-0000-0000-0000-000000000001', 'Who Can Donate Blood? Essential Eligibility Guidelines', 'who-can-donate-blood', 'Eligibility', 'Basic physical requirements including age, weight, and hemoglobin levels for donors in Bangladesh.', '### Who Can Donate Blood?\nIn Bangladesh and globally under WHO guidelines, blood donation is safe and life-saving. You are generally eligible if you:\n- Are between 18 and 60 years of age.\n- Weigh at least 45 kg (females) or 50 kg (males).\n- Have a hemoglobin count of at least 12.5 g/dL.\n- Pulse rate between 60 and 100 beats per minute.\n- Blood pressure is within normal ranges (Systolic 100-140, Diastolic 60-90).\n- Have not donated blood in the last 90 to 120 days.\n\n### Temporary Deferrals:\n- Cold, flu, or fever in the past 48 hours.\n- Major surgery in the past 6 months.\n- Tattoo or body piercing in the past 6 months.\n- Currently pregnant or breastfeeding.', 1, true),
  ('f0000000-0000-0000-0000-000000000002', 'Debunking Common Myths About Blood Donation in Bangladesh', 'common-blood-donation-myths', 'Myths & Facts', 'Addressing pervasive misconceptions such as physical weakness, weight gain, or infections.', '### Myth 1: Donating blood makes you physically weak\n**Fact:** The body replaces plasma within 24 to 48 hours, and red blood cells are regenerated within 4 to 8 weeks. Most healthy donors resume normal light activities immediately.\n\n### Myth 2: You can contract HIV or hepatitis while donating\n**Fact:** At licensed medical facilities and RedHope verified camps, all needles, collection bags, and sterile equipment are strictly single-use and disposed of in medical biohazard containers.\n\n### Myth 3: People with high blood pressure can never donate\n**Fact:** If your blood pressure is well controlled within acceptable limits on the day of screening, you can safely donate.', 2, true),
  ('f0000000-0000-0000-0000-000000000003', 'How to Prepare Before and After Blood Donation', 'preparation-and-aftercare', 'Health Tips', 'Nutritional guidance, hydration, and recovery steps to ensure a smooth donation experience.', '### Before Donation:\n- Drink plenty of water and natural fluids (at least 500ml extra).\n- Eat a healthy, low-fat meal 2 to 3 hours beforehand.\n- Avoid smoking 2 hours before donation.\n- Have a sound night of sleep.\n\n### After Donation:\n- Rest for 10-15 minutes in the recovery area.\n- Enjoy a sweet drink and snack provided by the clinic.\n- Keep the bandage on for 4 hours.\n- Avoid heavy weightlifting or intense physical workouts for 24 hours.', 3, true)
ON CONFLICT (id) DO NOTHING;

-- 5. Blog Posts
INSERT INTO public.blog_posts (id, title, slug, summary, content, category, author_name, cover_image, is_published)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Understanding the Blood Supply Chain in Bangladesh Hospitals', 'blood-supply-chain-bangladesh', 'How voluntary blood donations bridge the critical shortage during surgical and maternal emergencies across Bangladesh.', 'Every year, Bangladesh requires an estimated 800,000 to 1,000,000 units of safe blood. While voluntary donation has grown dramatically thanks to youth organizations and digital platforms like RedHope, replacement donors still make up a substantial share. By creating an organized, hyper-local digital network, RedHope ensures that when an emergency strikes in Dhaka, Chattogram, or remote upazilas, a verified compatible donor can be located in minutes.', 'Health Awareness', 'Dr. Mahmud Hasan', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800', true),
  ('b0000000-0000-0000-0000-000000000002', 'A Hero Without A Cape: How Rafiq Saved a 6-Year-Old Thalassemia Warrior', 'rafiq-donor-story', 'A heartfelt story of swift coordination, rare blood compatibility, and a mother’s gratitude.', 'When 6-year-old Sami required emergency O- blood at BSMMU, his family was running out of time. Through RedHope, they connected with Rafiqul Bashar, an O- negative registered donor residing in Dhaka. Within 45 minutes, Rafiq arrived at the hospital, passed screening, and completed the transfusion.', 'Donor Stories', 'RedHope Editorial Team', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Testimonials
INSERT INTO public.testimonials (id, name, role, photo_url, comment, blood_group, rating, is_featured)
VALUES
  ('b0000000-0000-0000-0000-000000000011', 'Farhana Chowdhury', 'Patient Family, Dhaka', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120', 'RedHope saved my father’s life during his emergency heart surgery at National Heart Foundation. We found two O- donors within 30 minutes!', 'O-', 5, true),
  ('b0000000-0000-0000-0000-000000000012', 'Saiful Alam', 'Regular Donor (14 Times)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120', 'The donor dashboard and privacy controls are fantastic. I only get notified when someone truly needs my blood group in my district.', 'B+', 5, true),
  ('b0000000-0000-0000-0000-000000000013', 'Dr. Anisur Rahman', 'Physician, DMCH', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120', 'As an emergency room physician, timely blood availability is the difference between life and death. RedHope is an exceptional platform for Bangladesh.', 'A+', 5, true)
ON CONFLICT (id) DO NOTHING;
