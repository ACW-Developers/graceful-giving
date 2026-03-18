import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ImpactGrid from "@/components/ImpactGrid";
import DonationForm from "@/components/DonationForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ImpactGrid />
      <DonationForm />
      <Footer />
    </div>
  );
};

export default Index;
