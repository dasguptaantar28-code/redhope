import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import MotivationalBanner from "@/components/home/MotivationalBanner";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import QuickSearchSection from "@/components/home/QuickSearchSection";
import UrgentRequestsSection from "@/components/home/UrgentRequestsSection";
import FeaturedDonorsSection from "@/components/home/FeaturedDonorsSection";
import WhyDonateSection from "@/components/home/WhyDonateSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import KnowledgeSection from "@/components/home/KnowledgeSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        {/* Hero Section */}
        <Hero />

        {/* Motivational Banner */}
        <MotivationalBanner />

        {/* Section A: Statistics */}
        <StatsSection />

        {/* Section B: How RedHope Works */}
        <HowItWorksSection />

        {/* Section C: Search Blood Donors Quick Form */}
        <QuickSearchSection />

        {/* Section D: Urgent Blood Requests */}
        <UrgentRequestsSection />

        {/* Section E: Featured Donors */}
        <FeaturedDonorsSection />

        {/* Section F: Why Donate Blood */}
        <WhyDonateSection />

        {/* Section G: Testimonials */}
        <TestimonialsSection />

        {/* Section H: Knowledge Base */}
        <KnowledgeSection />

        {/* Section I: Call to Action */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
