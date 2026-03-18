import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Contatos", href: "#contatos" },
  { label: "Links", href: "#links" },
  { label: "Orientações", href: "#orientacoes" },
  { label: "Avisos", href: "#avisos" },
  { label: "Calendário", href: "#calendario" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-primary font-semibold text-lg">
          <GraduationCap className="h-6 w-6" />
          <span className="hidden sm:inline">Portal do Professor</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all border-t bg-card",
          mobileOpen ? "max-h-80" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container flex flex-col py-2 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
