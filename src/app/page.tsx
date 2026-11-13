import { UIProvider } from "@/components/providers";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustMarquee } from "@/components/TrustMarquee";
import { Modules } from "@/components/Modules";
import { WhyGoHiv } from "@/components/WhyGoHiv";
import { PilotProgram } from "@/components/PilotProgram";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { DemoModal } from "@/components/DemoModal";
import { CommunityBand } from "@/components/CommunityBand";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";

export default function GoHIVLandingPage() {
  return (
    <UIProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <Modules />
        <WhyGoHiv />
        <CommunityBand />
        <PilotProgram />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <DemoModal />
      <BackToTop />
    </UIProvider>
  );
}
