import { useState, useMemo } from "react";
import { ExternalLink, BookOpen, FileText, Monitor, ClipboardList, GraduationCap, BarChart3, Presentation, Video, Briefcase, Box, PlaySquare, Dna, Library, Activity, AppWindow, Network, UserCircle, Users, Search, SortAsc } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const links = [
  { titulo: "Saber Senac", descricao: "Ambiente virtual de aprendizagem", url: "https://saber.senac.br/index.php?", icone: GraduationCap, categoria: "Sistemas" },
  { titulo: "Cachola", descricao: "Plataforma de aprendizagem", url: "https://cachola.senac.br/", icone: Monitor, categoria: "Plataformas" },
  { titulo: "Cachola - Apresentação", descricao: "Apresentação da plataforma", url: "https://cachola-aprendizagem.senac.br/clubs/join-experience/YBH7WJGP", icone: Presentation, categoria: "Vídeo" },
  { titulo: "Cachola - Tutorial", descricao: "Tutorial sobre a plataforma", url: "https://extranet.senac.br/comunicacaoemarketing/cachola/arquivos/Ativacao_usuario/Ativacao/CACHOLA-video-tutorial-navegacao.mp4", icone: Video, categoria: "Vídeo" },
  { titulo: "Espaço Docente", descricao: "Portal do professor e recursos", url: "https://espacodocente.senac.br/", icone: Users, categoria: "Sistemas" },
  { titulo: "Cubus", descricao: "Plataforma Cubus", url: "https://cubus.oitcinterfor.org/", icone: Box, categoria: "Plataformas" },
  { titulo: "Cofenplay", descricao: "Plataforma do Cofen", url: "https://cofenplay.com.br/", icone: PlaySquare, categoria: "Plataformas" },
  { titulo: "Bioatlas", descricao: "Conteúdos Digitais para Saúde (pedir login à coordenação)", url: "#", icone: Dna, categoria: "Recursos" },
  { titulo: "Biblioteca Virtual", descricao: "Para reserva: Whats 3431-6612", url: "https://plataforma.bvirtual.com.br", icone: Library, categoria: "Recursos" },
  { titulo: "SIG", descricao: "Sistema de Gestão", url: "https://cloud.plataforma.senac.br/#/login", icone: Activity, categoria: "Sistemas" },
  { titulo: "SEI", descricao: "Sistema Eletrônico de Informações", url: "https://sei.sc.senac.br/", icone: FileText, categoria: "Sistemas" },
  { titulo: "Intranet", descricao: "Portal interno do Senac", url: "https://intranet.sc.senac.br/", icone: Network, categoria: "Sistemas" },
  { titulo: "Myplace", descricao: "Portal de RH", url: "https://rh.sc.senac.br/myplace/Login?ReturnUrl=%2fmyplace%3f", icone: UserCircle, categoria: "Sistemas" }
];

const LinksSection = () => {
  const [busca, setBusca] = useState("");
  const [ordenarAZ, setOrdenarAZ] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const randomSelection = useMemo(() => {
    return [...links].sort(() => 0.5 - Math.random()).slice(0, 6);
  }, []);

  const hasSearch = busca.trim().length > 0;
  const baseList = hasSearch || mostrarTodos ? links : randomSelection;

  let linksFiltrados = baseList.filter((l) => 
    l.titulo.toLowerCase().includes(busca.toLowerCase()) || 
    l.descricao.toLowerCase().includes(busca.toLowerCase()) || 
    l.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  if (ordenarAZ) {
    linksFiltrados = [...linksFiltrados].sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  return (
    <section id="links-importantes" className="py-10 md:py-12 bg-secondary/30 scroll-mt-16">
      <div className="container max-w-5xl">
        <h2 className="text-3xl font-bold text-foreground mb-2">Links Importantes</h2>
        <p className="text-muted-foreground mb-6">Acesse rapidamente sistemas, plataformas e documentos.</p>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar link por nome ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 h-11 bg-background rounded-lg border-slate-200"
            />
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <Button 
              variant={ordenarAZ ? "secondary" : "outline"}
              onClick={() => setOrdenarAZ(!ordenarAZ)}
              className={`h-11 px-5 shadow-sm shrink-0 transition-colors ${ordenarAZ ? "bg-slate-200 text-slate-800" : ""}`}
            >
              <SortAsc className="mr-2 h-4 w-4" />
              Ordem Alfabética
            </Button>

            {!hasSearch && links.length > 6 && (
              <Button 
                variant={mostrarTodos ? "secondary" : "default"} 
                className={`h-11 px-6 rounded-xl shadow-sm transition-all font-semibold ${mostrarTodos ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                onClick={() => setMostrarTodos(!mostrarTodos)}
              >
                <AppWindow className="mr-2 h-4 w-4" />
                {mostrarTodos ? "Ocultar links" : `Ver todos os ${links.length} links`}
              </Button>
            )}
          </div>
        </div>

        {linksFiltrados.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 bg-background/50">
            <p className="text-muted-foreground">Nenhum link encontrado com esse termo.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {linksFiltrados.map((link) => (
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
        )}
      </div>
    </section>
  );
};

export default LinksSection;
