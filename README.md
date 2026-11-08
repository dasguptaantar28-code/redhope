# RedHope — Complete Blood Donation & Donor Management Platform
> **Donate Blood • Save Lives | রক্ত দিন, জীবন বাঁচান**

RedHope is a production-grade, humanitarian blood donation web application built for Bangladesh. It connects voluntary blood donors with patients in emergency need across all 8 divisions and 64 districts with strict donor privacy safeguards, administrative verification, and real-time hospital feeds.

---

## 🚀 Key Features

1. **Brand Identity & Split-Layout Homepage**
   - Official RedHope logo with blood-drop cross and cupped hand.
   - Hero split design inspired by DonateBloodBD with "A Small Act, A Big Impact", live counter pills, and Bengali motivational banner.
   - Real-time community statistics (Registered Donors, Blood Donations, Active Requests, Lives Helped).
   - 5-step life-saving journey guide, instant cascading search widget, urgent requests carousel, featured donors, and testimonials.

2. **Complete Bangladesh Geographic Hierarchy**
   - All 8 Divisions: Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Rangpur, Mymensingh.
   - All 64 Districts mapped to their respective divisions.
   - Key Upazilas/Thanas mapped to districts with cascading dropdowns.

3. **Donor Registration & Privacy Shield**
   - Detailed registration: Blood Group (A+, A-, B+, B-, AB+, AB-, O+, O-), Division, District, Upazila, Last Donation Date.
   - Privacy Controls: Donors can keep their phone numbers masked so requesters must submit a structured emergency contact request.
   - Search Visibility: One-click toggle to show/hide profile from public search results.
   - Resting interval tracking (90-120 days).

4. **Advanced Donor Search Engine (`/search-donors`)**
   - Multi-criteria filtering by Blood Group, Division, District, Upazila, and Availability.
   - Instant search with pagination and empty states.
   - In-app "Request Contact Details" modal for masked numbers.

5. **Hospital Blood Request Management (`/blood-requests`)**
   - Post blood requests with patient details, bags needed, hospital name & address, required date/time, and clinical notes.
   - Administrative anti-scam verification queue.
   - Public broadcast of verified requests with "I Want to Donate for This Patient" volunteer trigger and WhatsApp/social sharing.

6. **Triple-Role Dashboards**
   - **User Dashboard (`/dashboard`)**: Track submitted requests, outgoing donor contact requests, and profile settings.
   - **Donor Dashboard (`/donor-dashboard`)**: Live toggle for donation availability, incoming contact requests, matching hospital emergencies in donor's district, and donation milestone logger.
   - **Admin Command Center (`/admin`)**: Real-time KPI analytics, verification queue with Approve/Reject modal, donor directory with suspend/activate toggle, full request manager, article manager, contact inbox, and audit logs.

7. **Educational CMS & Interactive Tools**
   - **Eligibility Checker (`/eligibility`)**: 5-question interactive clinical quiz ("Can I Donate Blood Today?").
   - **Knowledge Base (`/knowledge-base`)**: Evidence-based medical guides on eligibility, myths debunked, diet, and preparation.
   - **Blog (`/blog`)**: Real donor hero stories and hospital awareness articles.
   - **Contact & 24/7 Helplines (`/contact`)**: Inquiries submission and emergency hotline numbers.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion.
- **Backend & Database**: Supabase PostgreSQL with Row Level Security (RLS).
- **Authentication**: Supabase Auth (Email/Password, protected routes, role-based access).
- **State & Resilience**: Dual-mode data architecture with direct Supabase client + persistent fallback store with preloaded Bangladesh records for instant evaluation.

---

## 🗄️ Supabase Setup & Database Migration

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **New Project**, choose an organization, give your project a name (e.g. `redhope`), set a secure database password, and choose your region (e.g. `Singapore (ap-southeast-1)`).

### Step 2: Run Database Migration & Seed
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Open the file `supabase/migrations/20261108_initial_schema.sql` from this project.
3. Paste its contents into the SQL Editor and click **Run**. This will create all 11 tables (`profiles`, `donors`, `blood_requests`, `donations`, `contact_requests`, `notifications`, `blog_posts`, `knowledge_articles`, `testimonials`, `contact_messages`, `admin_audit_logs`), enum types, indexes, and Row Level Security (RLS) policies.
4. Next, open `supabase/seed.sql`, paste it into the SQL Editor, and click **Run** to load realistic Bangladesh demo donors, hospitals, and requests.

### Step 3: Configure Environment Variables
1. In your Supabase Dashboard, go to **Project Settings** -> **API**.
2. Copy your **Project URL** and **anon public key**.
3. Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## ⚡ Instant Demo Evaluation

On the Login page (`/login`), you will find **1-Click Demo Evaluation** buttons:
- **Admin Demo**: Access the Admin Command Center as Dr. Mahmud Hasan.
- **Donor Demo**: Access the Donor Dashboard as Tanvir Ahmed (O+).
- **User Demo**: Access the User Dashboard as Tarek Rahman.

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`
5. Click **Deploy**. Your RedHope blood donation platform will be live!

---

**RedHope — Donate Blood • Save Lives**  
*রক্ত দিন, জীবন বাঁচান।*
