import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContatosSection from "@/components/ContatosSection";
import LinksSection from "@/components/LinksSection";
import OrientacoesSection from "@/components/OrientacoesSection";
import AvisosSection from "@/components/AvisosSection";
import CalendarioSection from "@/components/CalendarioSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ContatosSection />
        <LinksSection />
        <OrientacoesSection />
        <AvisosSection />
        <CalendarioSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
