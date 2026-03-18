import { Bell, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const avisos = [
  {
    titulo: "Reunião pedagógica extraordinária",
    data: "2026-03-25",
    conteudo: "Haverá reunião pedagógica no dia 25/03 às 14h no auditório principal. Pauta: planejamento do 2º bimestre. Presença obrigatória.",
    novo: true,
  },
  {
    titulo: "Prazo para entrega de notas do 1º bimestre",
    data: "2026-03-28",
    conteudo: "As notas do 1º bimestre devem ser lançadas no sistema até 28/03. Após essa data, o sistema será bloqueado para edição.",
    novo: true,
  },
  {
    titulo: "Manutenção no sistema de notas",
    data: "2026-03-20",
    conteudo: "O sistema ficará indisponível no sábado (20/03) das 8h às 12h para manutenção programada. Planeje seus lançamentos com antecedência.",
    novo: false,
  },
  {
    titulo: "Inscrições para formação continuada",
    data: "2026-03-15",
    conteudo: "Estão abertas as inscrições para o curso de Metodologias Ativas. As vagas são limitadas a 30 participantes. Inscreva-se pelo formulário enviado por e-mail.",
    novo: false,
  },
  {
    titulo: "Novo protocolo de segurança",
    data: "2026-03-10",
    conteudo: "A partir de 10/03, todos os visitantes devem se identificar na portaria e usar crachá. Professores devem orientar alunos a não abrir portas externas para desconhecidos.",
    novo: false,
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function isRecent(dateStr: string) {
  const diff = Date.now() - new Date(dateStr + "T12:00:00").getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

const AvisosSection = () => {
  const sorted = [...avisos].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <section id="avisos" className="py-16 md:py-20 bg-secondary/30">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Avisos</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Comunicados e informações temporárias para o corpo docente.
        </p>

        <div className="space-y-4">
          {sorted.map((aviso, index) => (
            <Card
              key={index}
              className={`transition-shadow hover:shadow-md ${aviso.novo || isRecent(aviso.data) ? "border-primary/30" : ""}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{aviso.titulo}</h3>
                  {(aviso.novo || isRecent(aviso.data)) && (
                    <Badge className="bg-primary text-primary-foreground shrink-0">Novo</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(aviso.data)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{aviso.conteudo}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvisosSection;
