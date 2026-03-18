import { BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <BookOpen className="h-4 w-4" />
          Comunicação centralizada
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Portal do Professor
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Todas as informações, contatos, links e orientações que você precisa — em um só lugar.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
