import IMAGES from "@/assets/images";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { GREEN_COLOR } from "@/config";
import Ambassadors from "./components/Ambassadors";
import BenefitsSection from "./components/Benefits";
import BusinessHubSection from "./components/BusinessHubSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HlsVideoSection from "./components/HlsVideoSection";
import ImpactSection from "./components/ImpactSection";
import InvestorTimeline from "./components/InvestorTimeline";
import MessageSection from "./components/MessageSection";
import ScrollStackVision from "./components/ScrollStackVision";
import PortfolioGallerySection from "./components/PortfolioGallerySection";
import CookieConsent from "./components/CookieConsent";

function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <HlsVideoSection />
      <ImpactSection />
      <MessageSection />
      <BenefitsSection />
      <InvestorTimeline />
      <PortfolioGallerySection />
      <Ambassadors />
      <BusinessHubSection />
      <ScrollStackVision />
      <CookieConsent />
      <Footer />
    </>
  );
}

export default function Landing() {
  return (
    <ClickSpark
      sparkColor={GREEN_COLOR}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={600}
    >
      <LandingPage />
    </ClickSpark>
  );
}
