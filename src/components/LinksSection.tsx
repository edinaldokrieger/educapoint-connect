import { ExternalLink, BookOpen, FileText, Monitor, ClipboardList, GraduationCap, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  { titulo: "Sistema de Notas", descricao: "Lançar e consultar notas dos alunos", url: "#", icone: ClipboardList, categoria: "Sistemas" },
  { titulo: "Google Classroom", descricao: "Plataforma de ensino online", url: "#", icone: Monitor, categoria: "Plataformas" },
  { titulo: "Biblioteca Digital", descricao: "Acervo de livros e materiais", url: "#", icone: BookOpen, categoria: "Recursos" },
  { titulo: "Formulário de Ocorrências", descricao: "Registrar ocorrências disciplinares", url: "#", icone: FileText, categoria: "Documentos" },
  { titulo: "Portal do Aluno", descricao: "Acesso ao portal do estudante", url: "#", icone: GraduationCap, categoria: "Sistemas" },
  { titulo: "Relatórios", descricao: "Gerar e baixar relatórios pedagógicos", url: "#", icone: BarChart3, categoria: "Documentos" },
];

const LinksSection = () => {
  return (
    <section id="links" className="py-16 md:py-20 bg-secondary/30">
      <div className="container max-w-5xl">
        <h2 className="text-3xl font-bold text-foreground mb-2">Links Importantes</h2>
        <p className="text-muted-foreground mb-8">Acesse rapidamente sistemas, plataformas e documentos.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <a key={link.titulo} href={link.url} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <link.icone className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.titulo}
                        </h3>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{link.descricao}</p>
                      <span className="inline-block text-xs text-muted-foreground mt-2 bg-secondary rounded-full px-2 py-0.5">
                        {link.categoria}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
