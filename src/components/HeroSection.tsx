import { BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-4 pb-6">
      <div className="container text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3 text-2xl md:text-3xl font-bold text-primary mb-2">
          <BookOpen className="h-8 w-8" />
          Comunicação centralizada
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Todas as informações, contatos, links e orientações que você precisa — em um só lugar.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
