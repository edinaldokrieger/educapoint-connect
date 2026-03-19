import { useState, useMemo } from "react";
import { Mail, Search, Copy, Check, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const getSectorColor = (sector: string) => {
  if (!sector) return "bg-slate-100 text-slate-700 border-slate-200";
  const colors = [
    "bg-red-50 text-red-600 border-red-100",
    "bg-orange-50 text-orange-600 border-orange-100",
    "bg-amber-50 text-amber-600 border-amber-100",
    "bg-green-50 text-green-600 border-green-100",
    "bg-emerald-50 text-emerald-600 border-emerald-100",
    "bg-teal-50 text-teal-600 border-teal-100",
    "bg-cyan-50 text-cyan-600 border-cyan-100",
    "bg-blue-50 text-blue-600 border-blue-100",
    "bg-indigo-50 text-indigo-600 border-indigo-100",
    "bg-violet-50 text-violet-600 border-violet-100",
    "bg-purple-50 text-purple-600 border-purple-100",
    "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
    "bg-pink-50 text-pink-600 border-pink-100",
    "bg-rose-50 text-rose-600 border-rose-100",
  ];
  let hash = 0;
  for (let i = 0; i < sector.length; i++) {
    hash = sector.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const professores = [
  { nome: "Adriana Celli Silva Machado", email: "adriana.machado@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Técnico", foto: "" },
  { nome: "Adriana Sledschlag", email: "adriana.sledschlag@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Alain Louzeiro Mota", email: "alain.mota@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Alessandra Klahold Rosa", email: "alessandra.rosa@prof.sc.senac.br", area: "Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Alexandre do Prado Pereira", email: "alexandre.pereira@prof.sc.senac.br", area: "Informática", subarea: "FIC", foto: "" },
  { nome: "Ana Camila Limberger Cidral", email: "ana.limberger@prof.sc.senac.br", area: "Saúde", subarea: "Radiologia", foto: "" },
  { nome: "Anderson Santos da Cruz", email: "anderson.cruz@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Andrea Luciana David", email: "andrea.david@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Anny Letícia Chaves Pasternak", email: "anny.pasternak@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Beatris Branco Rossatto", email: "beatris.rossatto@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Bruna Kohls", email: "bruna.kohls@prof.sc.senac.br", area: "Gestão e Negócios", subarea: "Ensino Médio", foto: "" },
  { nome: "Bruno Diego Baraúna", email: "bruno.barauna@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Carla Osmarina Albano Lanza", email: "carla.lanza@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Carlos Gustavo Reis Ferro", email: "carlos.ferro@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Carolina de Oliveira Castelen", email: "carolina.castelen@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Charlene Ruzanowsky Meier", email: "charlene.meier@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Cláudia Pimentel do Prado", email: "claudia.prado@prof.sc.senac.br", area: "Informática", subarea: "TI", foto: "" },
  { nome: "Cláudia Regina Trentini", email: "claudia.trentini@prof.sc.senac.br", area: "Gestão", subarea: "Superior", foto: "" },
  { nome: "Cláudia Werlich", email: "claudia.werlich@prof.sc.senac.br", area: "Informática", subarea: "EMI/Superior", foto: "" },
  { nome: "Cristienne Magalhães Pereira Pavez", email: "cristienne.pavez@prof.sc.senac.br", area: "Design", subarea: "Superior", foto: "" },
  { nome: "Daniel André Lopes", email: "daniel.lopes@prof.sc.senac.br", area: "Turismo e Hospitalidade", subarea: "Superior", foto: "" },
  { nome: "Daniela Bolz Arruda", email: "daniela.bolz@prof.sc.senac.br", area: "Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Diogo Bortolini", email: "diogo.bortolini@prof.sc.senac.br", area: "Informática", subarea: "Superior", foto: "" },
  { nome: "Driele Ayres da Silveira", email: "driele.silveira@prof.sc.senac.br", area: "Saúde", subarea: "Radiologia", foto: "" },
  { nome: "Edson Vaz Lopes", email: "edson.lopes@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Eduardo Silveira", email: "eduardo.silveira@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Elenita Leonida Padilha", email: "elenita.padilha@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Eliane Roseli Hammes", email: "eliane.hammes@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Eliane Vieira de Carvalho Gariani", email: "eliane.gariani@prof.sc.senac.br", area: "Gestão", subarea: "Técnico/Superior", foto: "" },
  { nome: "Elias Barboza Lacerda", email: "elias.lacerda@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Elisiane Teixeira Twardowski", email: "elisiane.twardowski@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Ellen Flávia Weis Leite", email: "ellen.leite@prof.sc.senac.br", area: "Design", subarea: "Superior", foto: "" },
  { nome: "Evelize Hotelmann Bachmann", email: "evelize.bachmann@prof.sc.senac.br", area: "Gestão", subarea: "Técnico/Superior", foto: "" },
  { nome: "Fabricio de Castro Alves", email: "fabricio.alves@prof.sc.senac.br", area: "Turismo e Hospitalidade", subarea: "Técnico", foto: "" },
  { nome: "Fernanda Bianchini Carvalho", email: "fernanda.carvalho@prof.sc.senac.br", area: "Turismo e Hospitalidade", subarea: "", foto: "" },
  { nome: "Fernanda Raulino", email: "fernanda.raulino@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Francine Aparecida Ludka", email: "francine.ludka@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Francini Maria Schoepping", email: "francini@sc.senac.br", area: "Turismo e Hospitalidade", subarea: "Superior", foto: "" },
  { nome: "Gabriel Caixeta Silva", email: "gabriel.silva@prof.sc.senac.br", area: "Informática", subarea: "EMI/Superior", foto: "" },
  { nome: "Gabriela Resende Yamamoto", email: "gabriela.yamamoto@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Gislaine dos Santos", email: "gislaine.santos@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Graziella Rejane Dall'Inha", email: "graziella.dallinha@prof.sc.senac.br", area: "Gestão", subarea: "Superior", foto: "" },
  { nome: "Helena Bosse Mendes de Souza", email: "helena.souza@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "EMI", foto: "" },
  { nome: "Henrique Hang", email: "henrique.hang@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Jackson Machado", email: "jackson.machado@prof.sc.senac.br", area: "Informática", subarea: "Superior", foto: "" },
  { nome: "Jean Davi Prainer", email: "jean.prainer@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Juliana Cassé da Silva", email: "juliana.silva@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Juliana de Ornellas Strapazzon", email: "juliana.strapazzon@prof.sc.senac.br", area: "Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Juliana Karina Bartsch", email: "juliana.bartsch@prof.sc.senac.br", area: "Turismo e Hospitalidade", subarea: "", foto: "" },
  { nome: "Kátia Priscila Mendes de Araújo", email: "katia.mendes@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Layara Baltokoski Peccin", email: "layara.peccin@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "EMI", foto: "" },
  { nome: "Letícia de Castro", email: "leticia.castro@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Levi Correa Tancredo", email: "levi.tancredo@prof.sc.senac.br", area: "Informática", subarea: "Superior", foto: "" },
  { nome: "Lidiana Fachinette da Silva Manchope", email: "lidiana.manchope@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Lucas Roberto Soares Lopes", email: "lucas.lopes@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "EMI", foto: "" },
  { nome: "Lucélio Budal Arins", email: "lucelio.arins@prof.sc.senac.br", area: "Gestão", subarea: "EMI/Técnico/Superior", foto: "" },
  { nome: "Luis Eduardo Peres Pedroso", email: "luis.pedroso@prof.sc.senac.br", area: "Informática", subarea: "Técnico", foto: "" },
  { nome: "Luiz Fabiano Vianna", email: "luiz.vianna@prof.sc.senac.br", area: "Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Luiz Fernando de Souza", email: "luiz.souza@prof.sc.senac.br", area: "Gestão", subarea: "", foto: "" },
  { nome: "Maiara Rita Andrade Ortiz de Lemos", email: "maiara.lemos@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Marcelo Lisboa Pereira", email: "marcelo.pereira@prof.sc.senac.br", area: "Gestão e Negócios", subarea: "Ensino Médio", foto: "" },
  { nome: "Marcelo Petri", email: "marcelo.petri@prof.sc.senac.br", area: "Informática", subarea: "Técnico/Superior", foto: "" },
  { nome: "Maria Eliane Vasconcelos dos Santos", email: "maria.santos@prof.sc.senac.br", area: "Ambiente e Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Mary Lucia Alberti Levinski", email: "mary.levinski@prof.sc.senac.br", area: "Saúde", subarea: "Radiologia", foto: "" },
  { nome: "Mayara Patricia Coelho de Mattos", email: "mayara.mattos@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Melrulim Camilo Lourenzetti", email: "melrulim.lourenzetti@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Técnico", foto: "" },
  { nome: "Mylena Fernanda Ribeiro", email: "mylena.ribeiro@prof.sc.senac.br", area: "Ambiente e Saúde", subarea: "Ensino Médio", foto: "" },
  { nome: "Nara Lúcia Rosa", email: "nara.rosa@prof.sc.senac.br", area: "Gestão", subarea: "Técnico/Aprendizagem", foto: "" },
  { nome: "Nathália Coelho Cremasco França", email: "nathalia.cremasco@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Nicole Schulka", email: "nicole.schulka@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Nilce Cledi Possebon de Freitas", email: "nilce.freitas@prof.sc.senac.br", area: "Gestão", subarea: "Técnico/Aprendizagem", foto: "" },
  { nome: "Pamela Paola Leonardo", email: "pamela.leonardo@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Patricia Colombi Zappelini Coral", email: "patricia.coral@prof.sc.senac.br", area: "Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Paulo Eduardo de Souza", email: "paulo.souza@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Renan Ponick", email: "renan.ponick@prof.sc.senac.br", area: "Informática", subarea: "Técnico", foto: "" },
  { nome: "Rodrigo Carneiro Bergler", email: "rodrigo.bergler@prof.sc.senac.br", area: "Turismo e Hospitalidade", subarea: "Superior", foto: "" },
  { nome: "Ronaldo Bitencourt", email: "ronaldo.bitencourt@prof.sc.senac.br", area: "Gestão", subarea: "Ensino Médio", foto: "" },
  { nome: "Rosemeri de Paula e Silva Dobrihopf", email: "rosemeri.dobrihopf@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Saimon da Silva Nazário", email: "saimon.silva@prof.sc.senac.br", area: "Ambiente e Saúde", subarea: "Enfermagem", foto: "" },
  { nome: "Sandra Helena de Mello Tonet", email: "sandra.tonet@prof.sc.senac.br", area: "Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Sandro Daumiro da Silva", email: "sandro.silva@prof.sc.senac.br", area: "Gestão", subarea: "Técnico", foto: "" },
  { nome: "Sarah Cristina Teixeira Silva", email: "sarah.silva@prof.sc.senac.br", area: "Saúde", subarea: "Farmácia", foto: "" },
  { nome: "Sergio Ricardo Bachmann", email: "sergio.bachmann@prof.sc.senac.br", area: "Design", subarea: "Superior", foto: "" },
  { nome: "Sônia Nazaré Alves", email: "sonia.alves@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Superior", foto: "" },
  { nome: "Vagner Jadim da Cruz", email: "vagner.cruz@prof.sc.senac.br", area: "Informação e Comunicação", subarea: "Ensino Médio", foto: "" },
  { nome: "Valcimar Baglioli", email: "valcimar.baglioli@prof.sc.senac.br", area: "Informática", subarea: "FIC", foto: "" },
  { nome: "Vanderlei Schadeck", email: "vanderlei.schadeck@prof.sc.senac.br", area: "Gestão", subarea: "Superior", foto: "" },
  { nome: "Vicente D'Onofrio", email: "vicente.donofrio@prof.sc.senac.br", area: "Informática", subarea: "Ensino Médio", foto: "" },
  { nome: "Adaílton Cerqueira dos Santos", email: "adailton.santos@sc.senac.br", area: "Auxiliar de Operações", subarea: "Manutenção", foto: "" },
  { nome: "Adriana Letycia Lima do Carmo", email: "adriana.carmo@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NE", foto: "" },
  { nome: "Adriana Rodrigues da Silva", email: "adriana.rodrigues@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Alessandra Fernandes Szczepanski", email: "alessandra.fernandes@sc.senac.br", area: "Psicóloga", subarea: "NE", foto: "" },
  { nome: "Aline Lou Wirtz (afastada)", email: "aline.wirtz@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NAF", foto: "" },
  { nome: "Aline Machado dos Santos", email: "aline.santos@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Allan Corrêa Campos", email: "allan.campos@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NRM", foto: "" },
  { nome: "Ana Clarice Luiz", email: "ana.luiz@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Anderson Pedro Laurindo", email: "anderson.laurindo@sc.senac.br", area: "Analista Educacional", subarea: "NE", foto: "" },
  { nome: "Bruna Fernanda Rieper", email: "bruna.rieper@sc.senac.br", area: "Analista Educacional", subarea: "NE", foto: "" },
  { nome: "Bruna Pereira da Silva Marques", email: "bruna.marques@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "Marketing", foto: "" },
  { nome: "Carlos Bruno Pereira de Oliveira", email: "carlos.oliveira@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "TI", foto: "" },
  { nome: "Claudia Regina Andrade", email: "claudia@sc.senac.br", area: "Gestora de Núcleo", subarea: "NE", foto: "" },
  { nome: "Daniela de Tofol Dias Damaceno", email: "daniela.damaceno@sc.senac.br", area: "Gestora de Núcleo", subarea: "NRM", foto: "" },
  { nome: "Djhonattan Stein", email: "djhonattan.stein@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Edinaldo Krieger", email: "edinaldo.krieger@sc.senac.br", area: "Analista Educacional", subarea: "Informática", foto: "" },
  { nome: "Edjane Almeida Macêdo", email: "edjane.macedo@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Eliane Pereira de Oliveira", email: "eliane.oliveira@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Elisabete Ferreira Martins dos Santos", email: "elisabete.santos@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NE", foto: "" },
  { nome: "Eliza Karolina Schneider", email: "karolina.schneider@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Emanuel Cardoso de Aguiar Floriano", email: "emanuel.floriano@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NAF", foto: "" },
  { nome: "Erika de Paula Lemos de Oliveira", email: "erika.oliveira@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Eronilda Matias", email: "eronilda.matias@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Esolete da Silva (afastada)", email: "esolete.silva@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Jean Paulo Pontes", email: "jean.pontes@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "Biblioteca", foto: "" },
  { nome: "Karla Caroline Barbosa Carvalho", email: "karla.carvalho@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Katiana Iara Koerich Viana", email: "katiana@sc.senac.br", area: "Analista Educacional", subarea: "Saúde", foto: "" },
  { nome: "Kelly Santos de Jesus Cerqueira", email: "kelly.jesus@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Kerolin Sterfani Moreira", email: "kerolin.moreira@sc.senac.br", area: "Tradutora/Intérprete de Libras", subarea: "NE", foto: "" },
  { nome: "Laysa Cevinscki Steinhorst", email: "laysa.steinhorst@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NE", foto: "" },
  { nome: "Leonardo Maders", email: "leonardo.maders@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NE", foto: "" },
  { nome: "Liliane Baron dos Santos", email: "liliane.santos@sc.senac.br", area: "Analista Educacional", subarea: "NE", foto: "" },
  { nome: "Marciza da Silva Timm", email: "marciza.timm@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NAF", foto: "" },
  { nome: "Mari Lúcia de Borba", email: "mari.borba@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Maria Carolina Soares Mazzi Baldan", email: "maria.baldan@sc.senac.br", area: "Agente de Negócios", subarea: "NRM", foto: "" },
  { nome: "Mariana de Souza Elisio", email: "mariana.souza@sc.senac.br", area: "Analista Educacional", subarea: "NE", foto: "" },
  { nome: "Najara Silva de Oliveira", email: "najara.oliveira@sc.senac.br", area: "Analista de Suporte à Gestão", subarea: "NAF", foto: "" },
  { nome: "Nerilda Tereza Morais", email: "nerilda.morais@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NAF", foto: "" },
  { nome: "Ronaldo Ribeiro", email: "ronaldo@sc.senac.br", area: "Diretor", subarea: "DIRETOR", foto: "" },
  { nome: "Rosane Mittanck", email: "rosane.mittanck@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "Biblioteca", foto: "" },
  { nome: "Roselane dos Santos", email: "roselane.santos@sc.senac.br", area: "Auxiliar de Operações", subarea: "Servente", foto: "" },
  { nome: "Rosemari Dallabona", email: "dallabona@sc.senac.br", area: "Gestora de Núcleo", subarea: "NAF", foto: "" },
  { nome: "Salete de Oliveira Borges", email: "salete.borges@sc.senac.br", area: "Bibliotecária", subarea: "Biblioteca", foto: "" },
  { nome: "Suelen Duarte Battisti", email: "suelen.battisti@sc.senac.br", area: "Analista Educacional", subarea: "NE", foto: "" },
  { nome: "Vanessa Lenschow Voigt", email: "vanessa.lenschow@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NAF", foto: "" },
  { nome: "Vanusa Grola Holz", email: "vanusa@sc.senac.br", area: "Assistente de Suporte à Gestão", subarea: "NAF", foto: "" },
].sort((a, b) => a.nome.localeCompare(b.nome));

const ContatosSection = () => {
  const [busca, setBusca] = useState("");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // Seleciona 6 aleatórios ao iniciar o componente
  const randomSelection = useMemo(() => {
    return [...professores].sort(() => 0.5 - Math.random()).slice(0, 6);
  }, []);

  const hasSearch = busca.trim().length > 0;
  const listToRender = hasSearch || mostrarTodos ? professores : randomSelection;

  const filtrados = listToRender.filter((c) => {
    const isProfessor = c.email.includes("@prof.sc.senac.br") || 
      ["Saúde", "Gestão", "Informática", "Design", "Informação e Comunicação", "Turismo e Hospitalidade", "Ambiente e Saúde", "Gestão e Negócios", "0"].includes(c.area) ||
      ["Saúde", "Gestão", "Informática", "Design", "Informação e Comunicação", "Turismo e Hospitalidade", "Ambiente e Saúde", "Gestão e Negócios", "0"].includes(c.area.charAt(0).toUpperCase() + c.area.slice(1).toLowerCase());
    
    const funcao = isProfessor ? "Professor Professor(a) Professora" : "";
    const searchTerm = busca.toLowerCase();

    return (
      c.nome.toLowerCase().includes(searchTerm) ||
      c.area.toLowerCase().includes(searchTerm) ||
      c.subarea.toLowerCase().includes(searchTerm) ||
      funcao.toLowerCase().includes(searchTerm)
    );
  });

  const copiarEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const extraCount = professores.length - 6;

  return (
    <section id="pessoas" className="py-10 md:py-16 bg-[#FAFAFC] scroll-mt-16">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-[#0B1527] tracking-tight">Pessoas</h2>
          <p className="text-base font-medium text-muted-foreground mt-1">
            Encontre o e-mail, cargo e setor da pessoa que você precisa.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input
              placeholder="Buscar por nome, função, área ou sub-área..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 h-12 text-base rounded-xl border-slate-200 focus-visible:ring-blue-500 shadow-sm"
            />
          </div>
          
          {!hasSearch && professores.length > 6 && (
            <Button 
              variant={mostrarTodos ? "secondary" : "default"} 
              className={`h-12 px-6 rounded-xl shadow-sm transition-all font-semibold sm:w-auto w-full ${mostrarTodos ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              onClick={() => setMostrarTodos(!mostrarTodos)}
            >
              <Users className="mr-2 h-5 w-5" />
              {mostrarTodos ? "Ocultar lista completa" : `Ver todas as ${professores.length} pessoas`}
            </Button>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((contato, idx) => {
            const isProfessor = contato.email.includes("@prof.sc.senac.br") || 
              ["Saúde", "Gestão", "Informática", "Design", "Informação e Comunicação", "Turismo e Hospitalidade", "Ambiente e Saúde", "Gestão e Negócios", "0"].includes(contato.area) ||
              ["Saúde", "Gestão", "Informática", "Design", "Informação e Comunicação", "Turismo e Hospitalidade", "Ambiente e Saúde", "Gestão e Negócios", "0"].includes(contato.area.charAt(0).toUpperCase() + contato.area.slice(1).toLowerCase());
            
            const subtitle = isProfessor 
              ? `Professor(a) • ${contato.area}${contato.subarea ? ` • ${contato.subarea}` : ''}`
              : contato.area;
            
            const badgeText = isProfessor ? "NE" : (contato.subarea || "Colaborador");

            return (
              <Card key={`${contato.email}-${idx}`} className="hover:shadow-lg transition-all border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-5 flex items-start gap-4 border-b border-slate-50 bg-white">
                    <div className="h-14 w-14 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl overflow-hidden shadow-inner mt-1">
                      {contato.foto ? (
                        <img src={contato.foto} alt={contato.nome} className="w-full h-full object-cover" />
                      ) : (
                        contato.nome.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0 flex-1 relative">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#111827] truncate" title={contato.nome}>{contato.nome}</h3>
                          <p className="text-[0.7rem] text-slate-500 font-medium leading-snug mt-1 pe-1" title={subtitle}>
                            {subtitle}
                          </p>
                        </div>
                        <Badge variant="secondary" className={`shrink-0 border px-2 py-0.5 whitespace-nowrap ${getSectorColor(badgeText)}`}>
                          {badgeText}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 px-5">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                      <a href={`mailto:${contato.email}`} className="hover:text-blue-600 transition-colors truncate flex-1 font-medium" title={contato.email}>
                        {contato.email}
                      </a>
                      <button
                        onClick={() => copiarEmail(contato.email)}
                        className="ml-auto p-1.5 rounded-md hover:bg-slate-200 transition-colors shrink-0 tooltip"
                        title="Copiar e-mail"
                      >
                        {copiedEmail === contato.email ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtrados.length === 0 && (
          <div className="text-center py-12 rounded-xl border border-dashed border-slate-200 bg-white">
            <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Nenhuma pessoa encontrada com esse termo.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default ContatosSection;
