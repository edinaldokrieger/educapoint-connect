import { useState, useMemo } from "react";
import { Search, Filter, ClipboardList, FileText, MonitorSmartphone, MessageSquare, Clock, AlertTriangle, Package, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const orientacoesInfo = [
  {
    titulo: "Lançamento de Notas e Frequência",
    categoria: "PROCEDIMENTOS ACADÊMICOS",
    conteudo: "Acesse o Sistema de Notas pelo link na seção 'Links Importantes'. Faça login com suas credenciais institucionais. Navegue até a turma desejada, selecione a disciplina e insira as notas. Lembre-se de salvar antes de sair. O prazo para lançamento é até o 5º dia útil após o fim do bimestre.",
    icone: ClipboardList,
    corTema: "text-blue-600",
    bgTema: "bg-blue-50 border-blue-100",
  },
  {
    titulo: "Planejamento de Aulas",
    categoria: "PROCEDIMENTOS ACADÊMICOS",
    conteudo: "Os planos de aula devem ser entregues semanalmente à coordenação via sistema acadêmico.",
    icone: FileText,
    corTema: "text-blue-600",
    bgTema: "bg-blue-50 border-blue-100",
  },
  {
    titulo: "Uso dos Laboratórios e Espaços Especiais",
    categoria: "INFRAESTRUTURA",
    conteudo: "O agendamento deve ser feito com 48h de antecedência na secretaria. Cada professor pode reservar até 2 horários por semana. É obrigatório acompanhar os alunos durante todo o período. Ao final, certifique-se de que todos os equipamentos foram desligados corretamente.",
    icone: MonitorSmartphone,
    corTema: "text-emerald-600",
    bgTema: "bg-emerald-50 border-emerald-100",
  },
  {
    titulo: "Comunicação com Pais e Responsáveis",
    categoria: "COMUNICAÇÃO",
    conteudo: "Toda comunicação oficial com os pais deve passar pela coordenação ou ser registrada no sistema acadêmico do aluno.",
    icone: MessageSquare,
    corTema: "text-purple-600",
    bgTema: "bg-purple-50 border-purple-100",
  },
  {
    titulo: "Horário de Planejamento (HP)",
    categoria: "PROCEDIMENTOS ACADÊMICOS",
    conteudo: "O cumprimento do HP é obrigatório e deve ser realizado nas dependências da escola, no espaço docente.",
    icone: Clock,
    corTema: "text-blue-600",
    bgTema: "bg-blue-50 border-blue-100",
  },
  {
    titulo: "Protocolo de Ocorrências Disciplinares",
    categoria: "ORIENTAÇÃO",
    conteudo: "As ocorrências devem ser registradas em formulário próprio e encaminhadas à orientação escolar no mesmo dia do ocorrido.",
    icone: AlertTriangle,
    corTema: "text-orange-500",
    bgTema: "bg-orange-50 border-orange-100",
  },
  {
    titulo: "Solicitação de Materiais e Equipamentos",
    categoria: "INFRAESTRUTURA",
    conteudo: "Preencha o formulário de solicitação disponível na secretaria ou no link do Google Forms. As solicitações devem ser feitas até a segunda-feira da semana anterior à necessidade. A coordenação avaliará e retornará em até 2 dias úteis.",
    icone: Package,
    corTema: "text-emerald-600",
    bgTema: "bg-emerald-50 border-emerald-100",
  },
  {
    titulo: "Formação Continuada",
    categoria: "DESENVOLVIMENTO PROFISSIONAL",
    conteudo: "A instituição oferece ciclos de formação obrigatórios a cada semestre escolar, conforme calendário administrativo.",
    icone: Award,
    corTema: "text-rose-600",
    bgTema: "bg-rose-50 border-rose-100",
  }
];

const categoriasUnicas = ["Todas", ...Array.from(new Set(orientacoesInfo.map(o => o.categoria))).sort((a, b) => a.localeCompare(b))];

const OrientacoesSection = () => {
  const [busca, setBusca] = useState("");
  const [categoriaSel, setCategoriaSel] = useState("Todas");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filtrados = useMemo(() => {
    return orientacoesInfo.filter((item) => {
      const matchBusca = item.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                         item.conteudo.toLowerCase().includes(busca.toLowerCase());
      const matchCategoria = categoriaSel === "Todas" || item.categoria === categoriaSel;
      return matchBusca && matchCategoria;
    }).sort((a, b) => a.titulo.localeCompare(b.titulo));
  }, [busca, categoriaSel]);

  const handleToggleExpandAll = () => {
    if (openItems.length > 0) {
      setOpenItems([]);
    } else {
      setOpenItems(filtrados.map((_, i) => `item-${i}`));
    }
  };

  return (
    <section id="procedimentos" className="py-10 md:py-16 bg-background relative scroll-mt-16">
      <div className="container max-w-4xl">
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold text-[#0B1527] tracking-tight">Procedimentos</h2>
          <p className="text-base font-medium text-muted-foreground mt-1">
            Seção destinada às orientações gerais, procedimentos operacionais, bem como às regras e normas que regem a instituição.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input
              placeholder="Buscar orientações..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                if (e.target.value) {
                  setOpenItems(filtrados.map((_, i) => `item-${i}`));
                }
              }}
              className="pl-10 h-10 border-blue-200 focus-visible:ring-blue-500 rounded-lg shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={categoriaSel}
              onChange={(e) => setCategoriaSel(e.target.value)}
              className="h-10 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shrink-0 max-w-[200px]"
            >
              {categoriasUnicas.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm font-medium text-blue-600 mb-2 px-1">
          <span className="text-muted-foreground">{filtrados.length} procedimentos</span>
          <button 
            onClick={handleToggleExpandAll} 
            className="hover:underline transition-all"
          >
            {openItems.length > 0 ? "Recolher tudo" : "Expandir tudo"}
          </button>
        </div>

        <Accordion 
          type="multiple" 
          value={openItems} 
          onValueChange={setOpenItems}
          className="space-y-4"
        >
          {filtrados.map((item, index) => {
            const Icon = item.icone;

            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200 bg-white rounded-xl shadow-sm px-5 py-2 hover:border-slate-300 transition-all [&[data-state=open]]:border-blue-200"
              >
                <AccordionTrigger className="hover:no-underline py-2">
                  <div className="flex items-center gap-4 text-left w-full pr-4">
                    <div className={`p-2.5 rounded-lg border shrink-0 ${item.bgTema} ${item.corTema}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-[#0B1527] text-base leading-tight">{item.titulo}</span>
                      <span className={`text-[11px] font-bold tracking-wider uppercase ${item.corTema}`}>
                        {item.categoria}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-[3.8rem] pt-1">
                  {item.conteudo}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {filtrados.length === 0 && (
          <div className="text-center py-16 border rounded-xl border-dashed bg-slate-50 mt-4">
            <p className="text-muted-foreground text-lg">Nenhuma orientação encontrada.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrientacoesSection;
