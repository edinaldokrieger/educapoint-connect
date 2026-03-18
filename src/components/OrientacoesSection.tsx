import { FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const orientacoes = [
  {
    titulo: "Como lançar notas no sistema",
    conteudo:
      "Acesse o Sistema de Notas pelo link na seção 'Links Importantes'. Faça login com suas credenciais institucionais. Navegue até a turma desejada, selecione a disciplina e insira as notas. Lembre-se de salvar antes de sair. O prazo para lançamento é até o 5º dia útil após o fim do bimestre.",
  },
  {
    titulo: "Regras de uso do laboratório de informática",
    conteudo:
      "O agendamento deve ser feito com 48h de antecedência na secretaria. Cada professor pode reservar até 2 horários por semana. É obrigatório acompanhar os alunos durante todo o período. Ao final, certifique-se de que todos os computadores foram desligados corretamente.",
  },
  {
    titulo: "Procedimento para solicitação de materiais",
    conteudo:
      "Preencha o formulário de solicitação disponível na secretaria ou no link do Google Forms. As solicitações devem ser feitas até a segunda-feira da semana anterior à necessidade. A coordenação avaliará e retornará em até 2 dias úteis.",
  },
  {
    titulo: "Normas para atividades extracurriculares",
    conteudo:
      "Toda atividade fora da sala de aula deve ser comunicada à coordenação com 1 semana de antecedência. É necessário preencher o termo de autorização para os responsáveis dos alunos. O transporte, quando necessário, deve ser solicitado junto à secretaria.",
  },
  {
    titulo: "Política de uso do e-mail institucional",
    conteudo:
      "O e-mail institucional deve ser usado exclusivamente para comunicação profissional. Evite enviar mensagens em massa sem aprovação prévia da direção. Responda e-mails da coordenação e direção em até 24h úteis. Em caso de problemas técnicos, contate o setor de Tecnologia.",
  },
];

const OrientacoesSection = () => {
  return (
    <section id="orientacoes" className="py-16 md:py-20">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Orientações</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Regras, procedimentos e normas permanentes da instituição.
        </p>

        <Accordion type="multiple" className="space-y-2">
          {orientacoes.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline text-left">
                <span className="font-medium text-foreground">{item.titulo}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.conteudo}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default OrientacoesSection;
