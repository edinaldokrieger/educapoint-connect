import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span>Portal do Professor © {new Date().getFullYear()}</span>
        </div>
        <p>Desenvolvido para centralizar a comunicação escolar.</p>
      </div>
    </footer>
  );
};

export default Footer;
