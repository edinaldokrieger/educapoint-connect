import { useState, useMemo } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

const eventos = [
  // JANEIRO
  { data: "2026-01-01", titulo: "Feriado - Confraternização Universal", tipo: "feriado" },
  { data: "2026-01-26", titulo: "Semana Pedagógica", tipo: "reuniao" },
  { data: "2026-01-27", titulo: "Semana Pedagógica", tipo: "reuniao" },
  { data: "2026-01-28", titulo: "Semana Pedagógica", tipo: "reuniao" },
  
  // FEVEREIRO
  { data: "2026-02-16", titulo: "Recesso - Carnaval", tipo: "feriado" },
  { data: "2026-02-17", titulo: "Feriado - Carnaval", tipo: "feriado" },
  { data: "2026-02-18", titulo: "Início graduações", tipo: "evento" },
  { data: "2026-02-19", titulo: "Início matrículas em vagas remanescentes", tipo: "evento" },
  { data: "2026-02-27", titulo: "Prazo final para ajuste de matrículas", tipo: "prazo" },
  { data: "2026-02-27", titulo: "Prazo final rematrículas intempestivas", tipo: "prazo" },

  // MARÇO
  { data: "2026-03-07", titulo: "Sábado letivo", tipo: "evento" },
  { "data": "2026-03-09", titulo: "Feriado - Aniversário Joinville", tipo: "feriado" },
  { data: "2026-03-14", titulo: "Início do nivelamento", tipo: "evento" },
  { data: "2026-03-21", titulo: "Sábado Letivo", tipo: "evento" },
  { data: "2026-03-23", titulo: "Abertura de Edital para Disciplina de Libras", tipo: "evento" },

  // ABRIL
  { data: "2026-04-03", titulo: "Feriado - Paixão de Cristo", tipo: "feriado" },
  { data: "2026-04-07", titulo: "Semana de Combate ao Bullying", tipo: "evento" },
  { data: "2026-04-08", titulo: "Semana de Combate ao Bullying", tipo: "evento" },
  { data: "2026-04-09", titulo: "Semana de Combate ao Bullying", tipo: "evento" },
  { data: "2026-04-10", titulo: "Semana de Combate ao Bullying", tipo: "evento" },
  { data: "2026-04-11", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-04-20", titulo: "Recesso - Tiradentes", tipo: "feriado" },
  { data: "2026-04-21", titulo: "Feriado - Tiradentes", tipo: "feriado" },
  { data: "2026-04-25", titulo: "Sábado letivo", tipo: "evento" },

  // MAIO
  { data: "2026-05-01", titulo: "Feriado - Dia do Trabalhador", tipo: "feriado" },
  { data: "2026-05-09", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-05-25", titulo: "Semana Acadêmica", tipo: "evento" },
  { data: "2026-05-26", titulo: "Semana Acadêmica", tipo: "evento" },
  { data: "2026-05-27", titulo: "Semana Acadêmica", tipo: "evento" },
  { data: "2026-05-28", titulo: "Semana Acadêmica", tipo: "evento" },
  { data: "2026-05-29", titulo: "Semana Acadêmica", tipo: "evento" },
  { data: "2026-05-30", titulo: "Sábado letivo", tipo: "evento" },

  // JUNHO
  { data: "2026-06-04", titulo: "Feriado - Corpus Christi", tipo: "feriado" },
  { data: "2026-06-05", titulo: "Recesso - Corpus Christi", tipo: "feriado" },
  { data: "2026-06-13", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-06-26", titulo: "Requerimento de Colação de Grau 2027/1", tipo: "prazo" },
  { data: "2026-06-27", titulo: "Sábado letivo", tipo: "evento" },

  // JULHO
  { data: "2026-07-04", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-07-11", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-07-17", titulo: "Encerramento do Semestre Letivo", tipo: "evento" },
  { data: "2026-07-17", titulo: "Prazo entrega diários de classe", tipo: "prazo" },
  { data: "2026-07-20", titulo: "Recesso acadêmico graduação", tipo: "feriado" },
  { data: "2026-07-21", titulo: "Recesso acadêmico graduação", tipo: "feriado" },
  { data: "2026-07-22", titulo: "Recesso acadêmico graduação", tipo: "feriado" },
  { data: "2026-07-23", titulo: "Rematrícula / Capacitação", tipo: "reuniao" },
  { data: "2026-07-24", titulo: "Rematrícula / Capacitação", tipo: "reuniao" },
  { data: "2026-07-27", titulo: "Início 2º Semestre letivo", tipo: "evento" },
  { data: "2026-07-27", titulo: "Início matrículas em vagas remanescentes", tipo: "evento" },

  // AGOSTO
  { data: "2026-08-01", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-08-07", titulo: "Prazo final para ajuste de matrículas", tipo: "prazo" },
  { data: "2026-08-07", titulo: "Prazo final rematrículas intempestivas", tipo: "prazo" },
  { data: "2026-08-11", titulo: "Dia do Estudante", tipo: "evento" },
  { data: "2026-08-15", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-08-29", titulo: "Sábado letivo", tipo: "evento" },

  // SETEMBRO
  { data: "2026-09-07", titulo: "Feriado - Independência do Brasil", tipo: "feriado" },
  { data: "2026-09-12", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-09-22", titulo: "Semana da Educação Inclusiva", tipo: "evento" },
  { data: "2026-09-23", titulo: "Semana da Educação Inclusiva", tipo: "evento" },
  { data: "2026-09-24", titulo: "Semana da Educação Inclusiva", tipo: "evento" },
  { data: "2026-09-25", titulo: "Semana da Educação Inclusiva", tipo: "evento" },
  { data: "2026-09-26", titulo: "Sábado letivo", tipo: "evento" },

  // OUTUBRO
  { data: "2026-10-03", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-10-09", titulo: "Requerimento de Colação de Grau 2027/2", tipo: "prazo" },
  { data: "2026-10-12", titulo: "Feriado - Dia de Nossa Sra. Aparecida", tipo: "feriado" },
  { data: "2026-10-16", titulo: "Recesso - Dia do Professor", tipo: "feriado" },
  { data: "2026-10-24", titulo: "Sábado letivo", tipo: "evento" },

  // NOVEMBRO
  { data: "2026-11-02", titulo: "Feriado - Finados", tipo: "feriado" },
  { data: "2026-11-07", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-11-14", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-11-15", titulo: "Feriado - Proclamação da República", tipo: "feriado" },
  { data: "2026-11-20", titulo: "Feriado - Consciência Negra", tipo: "feriado" },
  { data: "2026-11-28", titulo: "Sábado letivo", tipo: "evento" },

  // DEZEMBRO
  { data: "2026-12-05", titulo: "Sábado letivo", tipo: "evento" },
  { data: "2026-12-11", titulo: "Encerramento do Semestre Letivo", tipo: "evento" },
  { data: "2026-12-16", titulo: "Prazo entrega diários de classe", tipo: "prazo" },
  { data: "2026-12-25", titulo: "Feriado - Natal", tipo: "feriado" },
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

const eventosDates = eventos.map(e => new Date(e.data + "T12:00:00"));

const CalendarioSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const currentMonth = useMemo(() => month || new Date(), [month]);

  const selectedEvents = useMemo(() => {
    return [...eventos].filter((e) => {
      const eventDate = new Date(e.data + "T12:00:00");
      return eventDate.getMonth() === currentMonth.getMonth() && eventDate.getFullYear() === currentMonth.getFullYear();
    }).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }, [currentMonth]);

  const monthName = currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  return (
    <section id="calendario" className="py-10 md:py-12 scroll-mt-16">
      <div className="container max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <CalendarIcon className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Calendario</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="w-full md:w-auto flex flex-col shrink-0">
            <p className="text-muted-foreground mb-6 pb-2 text-xl font-semibold">Acompanhe as datas e eventos.</p>
            <div className="flex justify-start border rounded-xl p-4 bg-card shadow-sm">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  if (d) {
                    setDate(d);
                    setMonth(d);
                  }
                }}
                month={month}
                onMonthChange={setMonth}
                locale={ptBR}
                modifiers={{ hasEvent: eventosDates }}
                modifiersClassNames={{ hasEvent: "font-bold text-primary underline decoration-primary underline-offset-4" }}
                className="rounded-md w-full"
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col min-w-0">
            <h3 className="text-xl font-semibold mb-6 capitalize border-b pb-2">
              Eventos de {monthName}
            </h3>
            
            <div className="space-y-3">
              {selectedEvents.map((evento, index) => {
                const badge = tipoBadge[evento.tipo] || tipoBadge.evento;
                const isPast = new Date(evento.data + "T12:00:00") < new Date();

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

              {selectedEvents.length === 0 && (
                <div className="py-12 text-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">Nenhum evento agendado para este mês.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarioSection;
