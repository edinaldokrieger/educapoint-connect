import { useState } from "react";
import { AlertTriangle, Info, Calendar, Clock, User, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const avisos = [
  {
    tipo: "Urgente",
    titulo: "Reunião Pedagógica — Planejamento do 2º Bimestre",
    conteudo: "Convidamos todos os professores para a reunião de planejamento do 2º bimestre, que acontecerá no auditório. Pauta: revisão dos planos de aula, alinhamento curricular e definição das atividades interdisciplinares. Presença obrigatória.",
    dataStr: "19 de março de 2026",
    remetente: "Coordenação Pedagógica",
    tema: {
      icone: AlertTriangle,
      corBase: "text-red-500",
      bgIcone: "bg-red-50",
      bgBadge: "bg-red-50 text-red-600 border-red-100",
      borderHover: "hover:border-red-300",
    }
  },
  {
    tipo: "Informativo",
    titulo: "Novo Sistema de Lançamento de Notas",
    conteudo: "Informamos que o sistema de lançamento de notas foi atualizado. O novo sistema está disponível no portal acadêmico. Em caso de dúvidas, procurar o setor de TI. O prazo para lançamento das notas do 1º bimestre é 28/03.",
    dataStr: "17 de março de 2026",
    remetente: "Secretaria Acadêmica",
    tema: {
      icone: Info,
      corBase: "text-blue-500",
      bgIcone: "bg-blue-50",
      bgBadge: "bg-blue-50 text-blue-600 border-blue-100",
      borderHover: "hover:border-blue-300",
    }
  },
  {
    tipo: "Evento",
    titulo: "Semana da Educação — Inscrições Abertas",
    conteudo: "Estão abertas as inscrições para a Semana da Educação 2026, que acontecerá de 07 a 11 de abril. Os professores interessados em apresentar workshops ou palestras devem entrar em contato com a coordenação até 25/03.",
    dataStr: "16 de março de 2026",
    remetente: "Direção Escolar",
    tema: {
      icone: Calendar,
      corBase: "text-purple-500",
      bgIcone: "bg-purple-50",
      bgBadge: "bg-purple-50 text-purple-600 border-purple-100",
      borderHover: "hover:border-purple-300",
    }
  },
  {
    tipo: "Informativo",
    titulo: "Manutenção nos Laboratórios de Informática",
    conteudo: "Os laboratórios de informática passarão por manutenção nos dias 22 e 23 de março. Durante esse período, as aulas que utilizam esses espaços devem ser remanejadas. Favor consultar a disponibilidade das salas alternativas.",
    dataStr: "15 de março de 2026",
    remetente: "Setor de TI",
    tema: {
      icone: Info,
      corBase: "text-blue-500",
      bgIcone: "bg-blue-50",
      bgBadge: "bg-blue-50 text-blue-600 border-blue-100",
      borderHover: "border-blue-400 shadow-sm",
    }
  },
  {
    tipo: "Urgente",
    titulo: "Entrega dos Diários de Classe",
    conteudo: "Relembramos que o prazo final para entrega dos diários de classe referentes ao 1º bimestre é dia 31/03. Os diários devem ser entregues na secretaria devidamente preenchidos e assinados.",
    dataStr: "14 de março de 2026",
    remetente: "Secretaria Acadêmica",
    tema: {
      icone: AlertTriangle,
      corBase: "text-red-500",
      bgIcone: "bg-red-50",
      bgBadge: "bg-red-50 text-red-600 border-red-100",
      borderHover: "hover:border-red-300",
    }
  },
  {
    tipo: "Evento",
    titulo: "Feira de Ciências — Chamada para Mentores",
    conteudo: "A Feira de Ciências 2026 está em fase de planejamento. Precisamos de professores mentores para orientar os projetos dos alunos. Os interessados devem se inscrever até 01/04 na sala da coordenação.",
    dataStr: "13 de março de 2026",
    remetente: "Coordenação de Projetos",
    tema: {
      icone: Calendar,
      corBase: "text-purple-500",
      bgIcone: "bg-purple-50",
      bgBadge: "bg-purple-50 text-purple-600 border-purple-100",
      borderHover: "hover:border-purple-300",
    }
  }
];

const avisosToRender = avisos.map(a => ({
  ...a,
  tipo: a.tipo === "Urgente" ? "Importante" : a.tipo,
  tema: a.tema.borderHover ? a.tema : { ...a.tema, borderHover: a.tema.corBase.replace("text", "hover:border") }
})).sort((a, b) => {
  const aImp = a.tipo === "Importante" || a.tipo === "Urgente";
  const bImp = b.tipo === "Importante" || b.tipo === "Urgente";
  if (aImp && !bImp) return -1;
  if (!aImp && bImp) return 1;
  return 0;
});

const AvisosSection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleAviso = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="avisos" className="py-10 md:py-16 bg-[#FAFAFC] scroll-mt-16">
      <div className="container max-w-4xl">
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold text-[#0B1527] tracking-tight">Avisos</h2>
          <p className="text-base font-medium text-muted-foreground mt-1">
            Comunicados e informações úteis para o corpo docente.
          </p>
        </div>

        <div className="space-y-4">
          {avisosToRender.map((aviso, index) => {
            const Icone = aviso.tema.icone;
            const isExpanded = expandedItems.includes(index);
            
            return (
              <Card
                key={index}
                className={`transition-all border-slate-200 bg-white rounded-xl shadow-sm ${aviso.tema.borderHover || ""}`}
              >
                <CardContent className="p-0 flex items-stretch">
                  <div className="p-4 flex items-start justify-center">
                    <div className={`p-2.5 rounded-full ${aviso.tema.bgIcone} ${aviso.tema.corBase}`}>
                      <Icone className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="py-4 pr-5 pb-5 flex-1 flex flex-col justify-start">
                    <div className="mb-1.5 flex items-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border ${aviso.tema.bgBadge}`}>
                        {aviso.tipo}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 
                        className="text-lg font-bold text-[#111827] leading-snug cursor-pointer hover:underline flex-1"
                        onClick={() => toggleAviso(index)}
                      >
                        {aviso.titulo}
                      </h3>
                      <button 
                        onClick={() => toggleAviso(index)}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 mt-1 shrink-0 transition-colors"
                      >
                        {isExpanded ? (
                          <>Recolher <ChevronUp className="h-4 w-4" /></>
                        ) : (
                          <>Ler mais <ChevronDown className="h-4 w-4" /></>
                        )}
                      </button>
                    </div>
                    
                    <div className="w-full relative group">
                      {isExpanded && (
                        <p className="text-[#4B5563] text-sm font-medium leading-relaxed pl-0.5 transition-all duration-300 mb-4">
                          {aviso.conteudo}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground font-medium pl-0.5 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {aviso.dataStr}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {aviso.remetente}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AvisosSection;
