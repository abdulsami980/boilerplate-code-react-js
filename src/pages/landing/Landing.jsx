import ClickSpark from "@/components/reactbits/ClickSpark";
import { GREEN_COLOR } from "@/config";
import BenefitsSection from "./components/Benefits";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HlsVideoSection from "./components/HlsVideoSection";
import ImpactSection from "./components/ImpactSection";
import InvestorTimeline from "./components/InvestorTimeline";
import ScrollStackVision from "./components/ScrollStackVision";
import MessageSection from "./components/MessageSection";
import Footer from "./components/Footer";
import Ambassadors from "./components/Ambassadors";

function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <HlsVideoSection />
      <ImpactSection />
      <MessageSection />
      <BenefitsSection />
      <Ambassadors />
      <InvestorTimeline />
      <ScrollStackVision />
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
