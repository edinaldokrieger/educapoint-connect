import { useState } from "react";
import { Mail, Phone, Search, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const contatos = [
  { nome: "Maria Silva", cargo: "Diretora", setor: "Direção", telefone: "(11) 99999-0001", email: "maria.silva@escola.edu.br" },
  { nome: "João Santos", cargo: "Coordenador Pedagógico", setor: "Coordenação", telefone: "(11) 99999-0002", email: "joao.santos@escola.edu.br" },
  { nome: "Ana Oliveira", cargo: "Secretária Escolar", setor: "Secretaria", telefone: "(11) 99999-0003", email: "ana.oliveira@escola.edu.br" },
  { nome: "Carlos Lima", cargo: "Coord. de Tecnologia", setor: "Tecnologia", telefone: "(11) 99999-0004", email: "carlos.lima@escola.edu.br" },
  { nome: "Fernanda Costa", cargo: "Orientadora Educacional", setor: "Coordenação", telefone: "(11) 99999-0005", email: "fernanda.costa@escola.edu.br" },
  { nome: "Roberto Mendes", cargo: "Coord. Financeiro", setor: "Financeiro", telefone: "(11) 99999-0006", email: "roberto.mendes@escola.edu.br" },
];

const sectorColors: Record<string, string> = {
  Direção: "bg-primary/10 text-primary",
  Coordenação: "bg-accent/10 text-accent",
  Secretaria: "bg-warning/10 text-warning",
  Tecnologia: "bg-success/10 text-success",
  Financeiro: "bg-destructive/10 text-destructive",
};

const ContatosSection = () => {
  const [busca, setBusca] = useState("");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const filtrados = contatos.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cargo.toLowerCase().includes(busca.toLowerCase()) ||
      c.setor.toLowerCase().includes(busca.toLowerCase())
  );

  const copiarEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section id="contatos" className="py-16 md:py-20">
      <div className="container max-w-5xl">
        <h2 className="text-3xl font-bold text-foreground mb-2">Lista de Contatos</h2>
        <p className="text-muted-foreground mb-8">Encontre rapidamente o contato de que precisa.</p>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, cargo ou setor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((contato) => (
            <Card key={contato.email} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{contato.nome}</h3>
                    <p className="text-sm text-muted-foreground">{contato.cargo}</p>
                  </div>
                  <Badge variant="secondary" className={sectorColors[contato.setor] || ""}>
                    {contato.setor}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <a href={`tel:${contato.telefone}`} className="hover:text-primary transition-colors">
                      {contato.telefone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <a href={`mailto:${contato.email}`} className="hover:text-primary transition-colors truncate">
                      {contato.email}
                    </a>
                    <button
                      onClick={() => copiarEmail(contato.email)}
                      className="ml-auto p-1 rounded hover:bg-secondary transition-colors shrink-0"
                      title="Copiar e-mail"
                    >
                      {copiedEmail === contato.email ? (
                        <Check className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="text-center text-muted-foreground py-8">Nenhum contato encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default ContatosSection;
