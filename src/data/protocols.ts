import type { ScheduleBlock } from './schedule';

export interface ProtocolSection {
  id: string;
  title: string;
  blocks: ScheduleBlock[];
}

export const protocols: ProtocolSection[] = [
  {
    id: 'proto-pele-manha',
    title: 'Pele — manhã',
    blocks: [
      { time: 'Passo 1', label: 'Limpeza com sabonete suave — só o rosto', sub: 'Molha o rosto com água fria. Coloca uma quantidade do tamanho de uma moeda de R$0,50 na palma da mão, espuma levemente e aplica com as pontas dos dedos em movimentos circulares suaves por 30s. Enxágua bem até não restar resíduo. Seca levemente com toalha limpa — bate, não esfrega. A pele deve ficar limpa mas não "apertada".', category: 'pele' },
      { time: 'Passo 2', label: 'Sérum niacinamida 10% — rosto e pescoço', sub: '3–4 gotas na palma. Distribui nos dedos e aplica por todo o rosto (testa, bochechas, nariz, queixo) e no pescoço com movimentos de baixo para cima. Não precisa passar nas orelhas. Espera 60–90s secar completamente antes do próximo passo — niacinamida precisa absorver para funcionar.', category: 'pele' },
      { time: 'Passo 3', label: 'Hidratante gel-creme — rosto e pescoço', sub: 'Quantidade pequena — cerca de 1 ervilha. Espalha em película fina por todo o rosto e pescoço. Não precisa ser generoso: gel-creme leve é eficaz em camada fina. Espera ~30s antes do protetor.', category: 'pele' },
      { time: 'Passo 4', label: 'Protetor solar FPS 50+ — rosto, pescoço e nuca', sub: 'Você vai de camisa e calça, então rosto, pescoço e nuca são as únicas áreas expostas ao sol direto. Quantidade: 2 dedos (indicador + médio) de produto — essa é a quantidade mínima para atingir o FPS declarado. Passa por todo o rosto incluindo pálpebras, pescoço frente e nuca. Natal tem UV extremo — não pula esse passo nem em dias nublados.', category: 'pele' },
      { time: 'Reaplicação', label: 'Reaplicar se ficar +2h exposto ao sol direto', sub: 'Dentro do campus, ônibus ou sala de aula: não precisa reaplicar. Se ficar parado ao sol (fila, espera, caminhada longa): reaplicar com quantidade menor — 1 dedo. O FPS se degrada com luz UV e suor.', category: 'pele' },
    ],
  },
  {
    id: 'proto-pele-noite',
    title: 'Pele — noite',
    blocks: [
      { time: 'Passo 1a', label: '1ª limpeza — água micelar ou óleo', sub: 'Algodão embebido em água micelar ou óleo de limpeza. Passa por todo o rosto em movimentos suaves sem esfregar. Foco especial nas áreas com protetor solar (testa, bochechas, nariz, queixo, pescoço, nuca). O objetivo é dissolver o FPS e o sebo acumulado — não precisa ficar limpíssimo ainda.', category: 'pele' },
      { time: 'Passo 1b', label: '2ª limpeza — sabonete suave', sub: 'Mesma técnica da manhã: água fria, moeda de produto, 30s circular suave, enxágua bem. Agora o rosto fica realmente limpo. Seca batendo com toalha limpa. Nunca pula a limpeza dupla à noite — dormir com FPS e sebo entupindo o poro é a causa principal de acne.', category: 'pele' },
      { time: 'Passo 2a', label: 'Semanas 1–4: niacinamida noturna — rosto e pescoço', sub: 'Mesma aplicação da manhã: 3–4 gotas, rosto todo + pescoço, espera secar 60–90s. A barreira cutânea precisa de 4 semanas para se adaptar antes de receber ácido. Não adianta pular essa fase — pele despreparada reage mal ao azelaico.', category: 'pele' },
      { time: 'Passo 2b', label: 'Semana 5+: ácido azelaico 10% — rosto e pescoço', sub: 'Quantidade equivalente a 1 ervilha. Aplica em camada fina por todo o rosto e pescoço com pontas dos dedos. Foco nas áreas com acne ativa (queixo, testa, nariz) e manchas escuras pós-acne. Espera secar ~2min — ácido azelaico é mais espesso que a niacinamida.', category: 'pele' },
      { time: 'Passo 3', label: 'Hidratante — rosto e pescoço', sub: 'Mesma quantidade da manhã: ~1 ervilha. À noite a pele está mais receptiva então o hidratante penetra melhor. Aplica por cima do ativo (niacinamida ou azelaico já secos). Para as olheiras: toca levemente a área sob os olhos com o dedo anelar — é a pressão mais suave que você tem.', category: 'pele' },
      { time: 'Sem FPS', label: 'Não passa protetor solar à noite', sub: 'FPS é exclusivo da manhã. À noite seria desperdício de produto e pode entupir poros. O objetivo noturno é reparar e hidratar, não proteger.', category: 'pele' },
    ],
  },
  {
    id: 'proto-cabelo',
    title: 'Cabelo — sextas alternadas',
    blocks: [
      { time: 'Passo 1', label: 'Shampoo — aplica na raiz, 2 lavagens', sub: 'Moja bem o cabelo com água morna. Coloca o shampoo Low Poo direto no couro cabeludo (não nas pontas — resseca). Massageia com as pontas dos dedos por ~1min em movimentos circulares. Enxágua bem. Repete uma segunda vez — a 1ª lavagem remove excesso de produto, a 2ª limpa de verdade. Para cabelo 2A-2B, lava a cada 3–4 dias, não todo dia.', category: 'cabelo' },
      { time: 'Passo 2', label: 'Condicionador — do meio às pontas, nunca na raiz', sub: 'Coloca quantidade generosa na palma, distribui do meio do fio até as pontas. Passa os dedos para distribuir e destrancar. Deixa agir 3–5min. Enxágua com água fria — o frio fecha a cutícula e aumenta o brilho. Para 2B, não precisa deixar condicionador como co-wash na raiz.', category: 'cabelo' },
      { time: 'Passo 3', label: 'Leave-in — cabelo úmido ainda pingando', sub: 'Não seca antes. Coloca ~1 colher de chá do Widi Care Ondulando a Juba na palma, distribui nas mãos e aplica do meio para as pontas com "prayer hands" — junta as palmas com o fio entre elas e desliza de cima para baixo. Não aplica na raiz.', category: 'cabelo' },
      { time: 'Passo 4', label: 'Gel ativador — scrunching inclinado', sub: '~1 colher de chá da Geleia de Babosa nas mãos. Inclina a cabeça para frente (cabelo cai na sua frente) e faz movimentos de "apertar" o fio de baixo para cima — como se estivesse amassando o cabelo em direção ao couro. Esse movimento define as ondas. Para 2A-2B não exagera na quantidade — excesso pesa e tira a onda.', category: 'cabelo' },
      { time: 'Passo 5', label: 'Secagem — camiseta de algodão macio ou microfibra', sub: 'NUNCA toalha felpuda — abre a cutícula e vira frizz. Usa uma camiseta velha de algodão ou pano de microfibra: envolve o cabelo e aperta suavemente (não esfrega). Deixa secar ao ar livre de preferência. Se usar secador: difusor na potência mais baixa e temperatura média, cabeça inclinada, fio a fio.', category: 'cabelo' },
      { time: 'Crunch', label: 'Depois de completamente seco — quebra o cast', sub: 'Quando o gel seca cria uma "casca" no fio (é normal). Com o cabelo 100% seco, aplica uma gotinha de óleo ou leave-in nas mãos e "amassa" o cabelo suavemente de baixo para cima para quebrar essa casca. O resultado é onda definida sem frizz.', category: 'cabelo' },
    ],
  },
  {
    id: 'proto-treino',
    title: 'Treino — divisão semanal (calistenia)',
    blocks: [
      { time: 'Seg — A', label: 'Empurrar', sub: 'Flexão diamante 3×8 / Flexão larga 3×10 / Pike push-up 3×8 / Dip cadeira 3×10.', category: 'treino' },
      { time: 'Ter — B', label: 'Puxar', sub: 'Remada invertida 3×8 / Retração escapular 3×12 / Curl de toalha 3×10.', category: 'treino' },
      { time: 'Qua — C', label: 'Pernas + Glúteo', sub: 'Agach. búlgaro 3×10 / Hip thrust mochila 3×15 / Panturrilha 3×20 / Caminhada 20min.', category: 'treino' },
      { time: 'Sex — D', label: 'Full body + core', sub: 'Agachamento 3×15 / Flexão 3×10 / Prancha 3×30s / Hollow body 3×20s / Superman 3×12.', category: 'treino' },
      { time: 'Sáb', label: 'LISS — caminhada 35min', sub: 'Ritmo acelerado. Sem HIIT nas primeiras 8 semanas.', category: 'treino' },
    ],
  },
  {
    id: 'proto-nutricao',
    title: 'Nutrição — ajustes no que já come',
    blocks: [
      { time: 'Adiciona', label: 'Linhaça (1 col sopa) na aveia', sub: 'Ômega-3. Anti-inflamatório. Impacto direto na acne e composição corporal.', category: 'refeicao' },
      { time: 'Troca', label: 'Arroz c/ leite → arroz + feijão + ovo ou sardinha', sub: 'Arroz com leite = açúcar + zero proteína.', category: 'refeicao' },
      { time: 'Aumenta', label: 'Frango no sanduíche: 50g → 80g', sub: 'Meta: ~130g de proteína/dia.', category: 'refeicao' },
      { time: 'Remove', label: 'Maionese → mostarda + azeite', sub: 'Maionese industrial tem óleo de soja (inflamatório).', category: 'refeicao' },
      { time: 'Mantém', label: 'Café, pão c/ ovo, arroz, feijão, frango', sub: 'Base nutricional boa. Não muda o que funciona.', category: 'refeicao' },
    ],
  },
  {
    id: 'proto-hobbies',
    title: 'Hobbies — rotação semanal',
    blocks: [
      { time: 'Japonês', label: 'Anki + Duolingo ou Genki', sub: '15–30min de Anki (revisão de kanji/vocabulário) + leitura ou áudio. Consistência diária bate intensidade semanal.', category: 'estudo' },
      { time: 'Xadrez', label: 'Estudo de abertura ou táticas', sub: 'Chess.com ou Lichess: puzzles táticos 20min + 1 partida analisada. Diferente do Discord casual — aqui é estudo deliberado.', category: 'estudo' },
      { time: 'Desenho', label: 'Prática de fundamentos', sub: 'Drawabox ou referencias do Pinterest. Foca em formas básicas e proporção antes de estilo. 30–60min.', category: 'estudo' },
    ],
  },
  {
    id: 'proto-corpo',
    title: 'Corpo — hidratação + queratose pilar + estrias',
    blocks: [
      { time: 'Quando', label: 'Sempre após o banho, pele ainda úmida — não espera secar', sub: 'Sai do banho, enxuga o rosto e o cabelo, e já aplica os produtos no corpo antes de se vestir. Pele úmida absorve ativos muito melhor que pele completamente seca. Todo o protocolo abaixo leva ~3min.', category: 'pele' },
      { time: 'Passo 1', label: 'Óleo de rosa mosqueta — flancos e posterior de coxa', sub: '5–8 gotas na palma. Esfrega as mãos para aquecer o óleo e aplica com massagem circular suave por ~2min nos flancos (laterais do abdômen onde aparecem as estrias) e na parte de trás das coxas. O calor das mãos + movimento circular aumenta a circulação local e a absorção. Não precisa cobrir áreas sem estria.', category: 'pele' },
      { time: 'Passo 2', label: 'Hidratante com ureia 10% — corpo inteiro exceto rosto', sub: 'Quantidade generosa — não economiza no corpo. Ordem: braços (foco nos bolinhos da queratose pilar — movimento circular mais firme), pernas, tronco frente e costas. Nos braços especificamente: aplica com movimentos circulares leves para ajudar a ureia a penetrar nos folículos entupidos. Não precisa passar nas plantas dos pés — pele diferente, outro produto. Não precisa repassar nas áreas que já receberam o óleo de rosa mosqueta.', category: 'pele' },
      { time: 'Passo 3', label: 'Veste a roupa normalmente', sub: 'Espera ~1–2min após aplicar o hidratante antes de vestir a camisa — evita que o produto saia na roupa. O óleo de rosa mosqueta absorve rápido, não mancha. Com calça e camisa de manga curta o dia todo, as áreas de estria ficam cobertas e o produto trabalha sem interferência do sol.', category: 'pele' },
      { time: 'Esfoliação', label: '1× por semana — domingo, dentro do banho, antes de sair', sub: 'Luva de banho úmida ou esfoliante físico suave. Faz movimentos circulares nos braços (queratose pilar) por ~1min e nas áreas de estria por ~1min. Remove células mortas e aumenta absorção dos produtos pós-banho. Não diariamente — sobre-esfoliação inflama a queratose pilar e piora o aspecto.', category: 'pele' },
      { time: 'Resultado', label: 'Expectativa realista por área', sub: 'Estrias roxas: em 2–3 meses começam a clarear para rosa/branco — o processo leva 6+ meses de consistência. Queratose pilar: textura melhora em 4–8 semanas com ureia diária, sem sumir completamente. Hidratação geral: pele visivelmente mais macia em 2–3 semanas.', category: 'pele' },
    ],
  },
  {
    id: 'proto-estrias',
    title: 'Estrias — tratamento tópico contínuo',
    blocks: [
      { time: 'Contexto', label: 'Suas estrias ainda são roxas — ótima notícia', sub: 'Estrias roxas/vermelhas são recentes e vasculares. Respondem muito bem a tratamento tópico. Flancos e posterior de coxa são áreas com boa penetração. Agir agora = máxima chance de regressão.', category: 'pele' },
      { time: 'Diário', label: 'Óleo de rosa mosqueta ou vitamina E — após banho', sub: 'Aplica nas áreas com estria (flancos, glúteos) com movimentos circulares por 2–3min. Pele úmida absorve melhor. Diário = resultado em 3–6 meses.', category: 'pele' },
      { time: 'Semanal', label: 'Esfoliação física suave nas estrias', sub: '1× por semana (domingo). Luva de banho ou esfoliante suave. Aumenta circulação e penetração dos ativos. Não exagere — pele sensível nas estrias.', category: 'pele' },
      { time: 'Opção+', label: 'Tretinoína tópica (com dermatologista)', sub: 'O tratamento mais eficaz comprovado para estrias. Requer receita. Se tiver acesso a dermatologista, vale mencionar. Não usa junto com ácido azelaico sem orientação.', category: 'pele' },
      { time: 'Longo prazo', label: 'Perda de peso gradual = menos novas estrias', sub: 'Perder peso rápido pode criar mais estrias. A rotina atual (déficit moderado + proteína alta) protege contra isso. Consistência > velocidade.', category: 'pele' },
    ],
  },
  {
    id: 'proto-cafe',
    title: 'Café — redução gradual (800 ml → 0 à noite)',
    blocks: [
      { time: 'Sem. 1–2', label: '800 ml → 400 ml/dia', sub: 'Corta metade. Mantém o da manhã, elimina o da tarde/noite. Dor de cabeça leve possível — normal.', category: 'refeicao' },
      { time: 'Sem. 3–4', label: '400 ml → 200 ml/dia', sub: 'Só o café da manhã. Nenhum café depois das 14h — cafeína tem meia-vida de 5–6h e sabota o sono.', category: 'refeicao' },
      { time: 'Sem. 5+', label: '200 ml/dia — só manhã', sub: 'Teto permanente. Café da manhã liberado, resto da manhã no máximo. Zero à noite.', category: 'refeicao' },
      { time: 'Regra', label: 'Último café: até 14h', sub: 'Cafeína dura ~6h no sangue. Café às 20h = sono prejudicado até 02h. Simples assim.', category: 'sono' },
    ],
  },
];
