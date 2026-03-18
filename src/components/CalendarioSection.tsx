import { Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const eventos = [
  { data: "2026-03-20", titulo: "Manutenção do sistema", tipo: "prazo" },
  { data: "2026-03-25", titulo: "Reunião pedagógica", tipo: "reuniao" },
  { data: "2026-03-28", titulo: "Prazo — notas do 1º bimestre", tipo: "prazo" },
  { data: "2026-04-02", titulo: "Feriado — Semana Santa", tipo: "feriado" },
  { data: "2026-04-06", titulo: "Conselho de classe", tipo: "reuniao" },
  { data: "2026-04-15", titulo: "Formação continuada", tipo: "evento" },
  { data: "2026-04-21", titulo: "Feriado — Tiradentes", tipo: "feriado" },
  { data: "2026-05-01", titulo: "Feriado — Dia do Trabalho", tipo: "feriado" },
];

const tipoBadge: Record<string, { label: string; className: string }> = {
  reuniao: { label: "Reunião", className: "bg-primary/10 text-primary" },
  feriado: { label: "Feriado", className: "bg-destructive/10 text-destructive" },
  prazo: { label: "Prazo", className: "bg-warning/10 text-warning" },
  evento: { label: "Evento", className: "bg-success/10 text-success" },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function formatWeekday(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", { weekday: "short" });
}

const CalendarioSection = () => {
  const sorted = [...eventos].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  const now = new Date();
  const upcoming = sorted.filter((e) => new Date(e.data + "T12:00:00") >= new Date(now.toDateString()));

  return (
    <section id="calendario" className="py-16 md:py-20">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Calendário Escolar</h2>
        </div>
        <p className="text-muted-foreground mb-8">Próximos eventos e datas importantes.</p>

        <div className="space-y-3">
          {upcoming.map((evento, index) => {
            const badge = tipoBadge[evento.tipo] || tipoBadge.evento;
            const isPast = new Date(evento.data + "T12:00:00") < now;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md ${isPast ? "opacity-60" : ""}`}
              >
                <div className="text-center min-w-[3.5rem]">
                  <div className="text-2xl font-bold text-foreground leading-none">
                    {formatDate(evento.data).split(" ")[0]}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase mt-1">
                    {formatDate(evento.data).split(" ")[2] || formatDate(evento.data).split(" ")[1]}
                  </div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{evento.titulo}</p>
                  <p className="text-xs text-muted-foreground capitalize">{formatWeekday(evento.data)}</p>
                </div>
                <Badge variant="secondary" className={badge.className}>
                  {badge.label}
                </Badge>
              </div>
            );
          })}
        </div>

        {upcoming.length === 0 && (
          <p className="text-center text-muted-foreground py-8">Nenhum evento próximo.</p>
        )}
      </div>
    </section>
  );
};

export default CalendarioSection;
