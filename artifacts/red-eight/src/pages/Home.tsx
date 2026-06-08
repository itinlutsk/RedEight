import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerStrip from "@/components/TickerStrip";
import ServicesSection from "@/components/ServicesSection";
import CraftStrip from "@/components/CraftStrip";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTABand from "@/components/CTABand";
import JournalSection from "@/components/JournalSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TickerStrip />
        <ServicesSection />
        <CraftStrip />
        <ProductsSection />
        <AboutSection />
        <ProjectsSection />
        <ReviewsSection />
        <CTABand />
        <JournalSection />
      </main>
      <Footer />
    </div>
  );
}
