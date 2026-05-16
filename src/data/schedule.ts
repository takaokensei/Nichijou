export type Category = 'aula' | 'treino' | 'pele' | 'cabelo' | 'refeicao' | 'sono' | 'estudo' | 'livre';

export interface ScheduleBlock {
  time: string;
  label: string;
  sub: string;
  category: Category;
  link?: string;
}

export interface DaySchedule {
  id: string;
  name: string;
  sub: string;
  info: string;
  blocks: ScheduleBlock[];
}

export const weekDays: DaySchedule[] = [
  {
    id: 'seg',
    name: 'Segunda-feira',
    sub: 'Manhã livre · Aulas à tarde (14:50 – 18:20)',
    info: 'Manhã inteiramente livre. Primeira aula só às 14:50. Treina, cuida da pele e estuda sem pressa.',
    blocks: [
      { time: '07:00', label: 'Acorda — sem alarme agressivo', sub: 'Dia leve. Sem correria.', category: 'sono' },
      { time: '07:03', label: 'Café da manhã', sub: 'Pão c/ ovo + aveia + mamão + café + 1 col sopa de linhaça', category: 'refeicao' },
      { time: '07:18', label: 'Banho — 10min', sub: 'Rápido. Sem o protocolo corporal completo — esse fica para o banho da noite.', category: 'livre' },
      { time: '07:28', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
      { time: '07:30', label: 'Rotina de pele — manhã', sub: 'Limpeza → niacinamida 10% → hidratante → FPS 50+', category: 'pele' },
      { time: '07:45', label: 'TREINO A — Empurrar (calistenia)', sub: 'Flexão diamante 3×8 / Flexão larga 3×10 / Pike push-up 3×8 / Dip em cadeira 3×10 · ~40min', category: 'treino' },
      { time: '08:30', label: 'Tempo livre — manhã', sub: 'Descanso, One Piece, o que quiser. Sem culpa.', category: 'livre' },
      { time: '12:00', label: 'Almoço em casa', sub: 'Arroz + feijão + frango ou ovo. Proteína primeiro no prato.', category: 'refeicao' },
      { time: '13:00', label: 'Preparo + deslocamento', sub: 'Sai ~13:20. Ônibus ~13:30. Chega ~14:30.', category: 'livre' },
      { time: '14:50', label: 'DCO1016 — Laboratório de Comunicações II', sub: '14:50 – 16:30', category: 'aula' },
      { time: '16:40', label: 'DCO3022 — Sistemas de Telecomunicações I', sub: '16:40 – 18:20', category: 'aula' },
      { time: '18:20', label: 'Deslocamento para casa', sub: 'Chega ~19:20', category: 'livre' },
      { time: '19:20', label: 'Banho + cuidado corporal — 20min', sub: 'Banho 15min → ainda úmido: óleo de rosa mosqueta nos flancos e coxa (estrias) → hidratante corporal com ureia nos braços (queratose pilar) e resto do corpo.', category: 'livre' },
      { time: '19:35', label: 'Janta', sub: 'Arroz + feijão + sardinha ou ovo. Sem arroz c/ leite.', category: 'refeicao' },
      { time: '20:00', label: 'Discord — xadrez + jogos com amigo', sub: '~1h–1h30. Conexo, Contexto, Expresso, Golfe, xadrez. Afiação mental diária.', category: 'livre' },
      { time: '21:30', label: 'Rotina de pele — noite', sub: 'Limpeza dupla → niacinamida (sem. 1–4) / ác. azelaico (sem. 5+) → hidratante', category: 'pele' },
      { time: '21:50', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min → enxaguante se tiver. Nunca pule.', category: 'pele' },
      { time: '22:00', label: 'Dormir', sub: 'Meta: 8h+ de sono. Acorda 07:00.', category: 'sono' },
    ],
  },
  {
    id: 'ter',
    name: 'Terça-feira',
    sub: 'Aulas de manhã (07:00 – 12:20) · volta pra casa depois',
    info: 'Acorda 05:20. Três aulas seguidas de manhã e depois volta pra casa. Treino B e estudo em casa à tarde — mais confortável do que ficar no campus à toa.',
    blocks: [
      { time: '05:20', label: 'Acorda', sub: 'Aula começa 07:00. Sai ~06:00, ônibus 06:10, chega ~06:40.', category: 'sono' },
      { time: '05:23', label: 'Café da manhã', sub: 'Protocolo padrão + linhaça na aveia.', category: 'refeicao' },
      { time: '05:35', label: 'Banho — 10min', sub: 'Rápido. Protocolo corporal completo fica para o banho da noite.', category: 'livre' },
      { time: '05:45', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
      { time: '05:47', label: 'Rotina de pele — manhã', sub: 'Protocolo completo + FPS 50+. Rápido: 10min.', category: 'pele' },
      { time: '06:00', label: 'Deslocamento', sub: 'Ônibus 06:10. Chega ~06:40.', category: 'livre' },
      { time: '07:00', label: 'ELE0520 — Máquinas Elétricas I', sub: '07:00 – 08:40', category: 'aula' },
      { time: '08:50', label: 'ELE0514 — Circuitos Eletrônicos II', sub: '08:50 – 10:30', category: 'aula' },
      { time: '10:40', label: 'ELE0530 — Análise de Sistemas de Potência II', sub: '10:40 – 12:20', category: 'aula' },
      { time: '12:20', label: 'Deslocamento para casa', sub: 'Última aula encerrada. Chega ~13:20.', category: 'livre' },
      { time: '13:20', label: 'Banho + cuidado corporal — 20min', sub: 'Chegou do campus → ainda úmido: óleo de rosa mosqueta (flancos/coxa) → hidratante ureia nos braços e corpo.', category: 'livre' },
      { time: '13:40', label: 'Almoço em casa', sub: 'Arroz + feijão + frango ou ovo. Mais gostoso que sanduíche no campus.', category: 'refeicao' },
      { time: '14:10', label: 'Discord — xadrez + jogos com amigo', sub: '~50min. Ele sai ~15:00. Conexo, Contexto, Expresso, Golfe, xadrez.', category: 'livre' },
      { time: '15:00', label: 'TREINO B — Puxar (calistenia)', sub: 'Remada invertida 3×8 / Retração escapular 3×12 / Curl de toalha 3×10 · ~35min', category: 'treino' },
      { time: '15:40', label: 'Bloco de estudo — 90min', sub: 'ELE0514 ou ELE0530. Pomodoro 25+5. Em casa, sem barulho de campus.', category: 'estudo' },
      { time: '17:10', label: 'Descanso / One Piece', sub: 'Descansa sem culpa.', category: 'livre' },
      { time: '19:00', label: 'Janta', sub: 'Arroz + feijão + proteína. Mais cedo = melhor digestão e sono.', category: 'refeicao' },
      { time: '19:30', label: 'Rotina de pele — noite', sub: 'Limpeza dupla → ativo noturno → hidratante.', category: 'pele' },
      { time: '22:20', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min. Nunca pule.', category: 'pele' },
      { time: '23:20', label: 'Dormir', sub: 'Acorda 05:20 = 6h. Compensa no fim de semana e quarta.', category: 'sono' },
    ],
  },
  {
    id: 'qua',
    name: 'Quarta-feira',
    sub: '1 aula manhã (08:50 – 10:30) · intervalo · 1 aula tarde (16:40 – 18:20)',
    info: 'Dia sanduíche. Uma aula de manhã, intervalo longo, uma aula no final da tarde. Ótimo para estudar e treinar no meio.',
    blocks: [
      { time: '07:00', label: 'Acorda', sub: 'Sai ~07:20, ônibus 07:30, chega ~08:30.', category: 'sono' },
      { time: '07:03', label: 'Café da manhã', sub: 'Protocolo padrão + linhaça.', category: 'refeicao' },
      { time: '07:15', label: 'Banho — 10min', sub: 'Rápido. Protocolo corporal completo fica para o banho ao chegar em casa (11:30).', category: 'livre' },
      { time: '07:25', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
      { time: '07:27', label: 'Rotina de pele — manhã', sub: 'Protocolo completo + FPS 50+', category: 'pele' },
      { time: '07:40', label: 'Deslocamento', sub: 'Ônibus 07:30. Chega ~08:30.', category: 'livre' },
      { time: '08:50', label: 'ELE0522 — Sistemas de Controle II', sub: '08:50 – 10:30', category: 'aula' },
      { time: '10:30', label: 'Bloco de estudo — 90min', sub: 'Revisão do que foi visto em Controle II. Enquanto está fresco.', category: 'estudo' },
      { time: '12:00', label: 'Almoço — sanduíche', sub: '80g frango + mostarda + salada + queijo.', category: 'refeicao' },
      { time: '12:30', label: 'TREINO C — Pernas + Glúteo (calistenia)', sub: 'Agach. búlgaro 3×10 / Hip thrust c/ mochila 3×15 / Panturrilha 3×20 / Caminhada 20min · ~40min', category: 'treino' },
      { time: '13:15', label: 'Descanso / One Piece', sub: 'Longa pausa merecida.', category: 'livre' },
      { time: '15:30', label: 'Revisão pré-aula — 30min', sub: 'Revisar conteúdo de DCO3022 (Telecom I) antes da aula.', category: 'estudo' },
      { time: '16:40', label: 'DCO3022 — Sistemas de Telecomunicações I', sub: '16:40 – 18:20', category: 'aula' },
      { time: '18:20', label: 'Deslocamento para casa', sub: 'Chega ~19:20', category: 'livre' },
      { time: '19:20', label: 'Banho + cuidado corporal — 20min', sub: 'Chegou do campus → ainda úmido: óleo de rosa mosqueta (flancos/coxa) → hidratante ureia nos braços e corpo.', category: 'livre' },
      { time: '19:35', label: 'Janta', sub: 'Arroz + feijão + proteína.', category: 'refeicao' },
      { time: '20:00', label: 'Rotina de pele — noite', sub: 'Limpeza dupla → ativo noturno → hidratante', category: 'pele' },
      { time: '21:50', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min. Nunca pule.', category: 'pele' },
      { time: '22:00', label: 'Dormir', sub: '8h+ de sono. Dia de recuperação máxima.', category: 'sono' },
    ],
  },
  {
    id: 'qui',
    name: 'Quinta-feira',
    sub: 'Aulas manhã (07:00 – 12:20) + Lab tarde (15:40 – 18:20) · dia mais cheio',
    info: 'Dia mais pesado da semana. Mesma sequência de manhã que terça + Lab de Circuitos à tarde. Sem treino — só descanso entre os blocos.',
    blocks: [
      { time: '05:20', label: 'Acorda', sub: 'Aula 07:00. Sai ~06:00, ônibus 06:10, chega ~06:40.', category: 'sono' },
      { time: '05:23', label: 'Café da manhã', sub: 'Protocolo padrão + linhaça.', category: 'refeicao' },
      { time: '05:35', label: 'Banho — 10min', sub: 'Rápido. Protocolo corporal completo fica para o banho da noite.', category: 'livre' },
      { time: '05:45', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
      { time: '05:47', label: 'Rotina de pele — manhã', sub: 'Protocolo completo + FPS 50+. 10min.', category: 'pele' },
      { time: '06:00', label: 'Deslocamento', sub: 'Ônibus 06:10. Chega ~06:40.', category: 'livre' },
      { time: '07:00', label: 'ELE0520 — Máquinas Elétricas I', sub: '07:00 – 08:40', category: 'aula' },
      { time: '08:50', label: 'ELE0514 — Circuitos Eletrônicos II', sub: '08:50 – 10:30', category: 'aula' },
      { time: '10:40', label: 'ELE0530 — Análise de Sistemas de Potência II', sub: '10:40 – 12:20', category: 'aula' },
      { time: '12:20', label: 'Almoço — sanduíche', sub: '80g frango + mostarda + salada + queijo. Água.', category: 'refeicao' },
      { time: '12:50', label: 'Descanso entre blocos', sub: 'Quinta é dia cheio. Sem treino aqui. One Piece liberado.', category: 'livre' },
      { time: '14:30', label: 'Revisão pré-lab — 30min', sub: 'Preparar ELE0519 (Lab Circuitos Eletrônicos).', category: 'estudo' },
      { time: '15:40', label: 'ELE0519 — Laboratório de Circuitos Eletrônicos', sub: '15:40 – 18:20', category: 'aula' },
      { time: '18:20', label: 'Deslocamento para casa', sub: 'Chega ~19:20–19:30', category: 'livre' },
      { time: '19:30', label: 'Banho + cuidado corporal — 20min', sub: 'Chegou do campus → ainda úmido: óleo de rosa mosqueta (flancos/coxa) → hidratante ureia nos braços e corpo.', category: 'livre' },
      { time: '19:45', label: 'Janta', sub: 'Arroz + feijão + proteína.', category: 'refeicao' },
      { time: '20:10', label: 'Rotina de pele — noite', sub: 'Limpeza dupla → ativo noturno → hidratante', category: 'pele' },
      { time: '22:20', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min. Nunca pule.', category: 'pele' },
      { time: '23:20', label: 'Dormir', sub: 'Acorda 05:20 = 6h. Dia mais pesado — dorme assim que bater o sono.', category: 'sono' },
    ],
  },
  {
    id: 'sex',
    name: 'Sexta-feira',
    sub: '1 aula manhã (08:50 – 10:30) · tarde completamente livre',
    info: 'Semana quase encerrada. Uma aula de manhã, tarde inteira livre. Dia do cabelo (sextas alternadas) + treino D.',
    blocks: [
      { time: '07:00', label: 'Acorda', sub: 'Sai ~07:20, ônibus 07:30, chega ~08:30.', category: 'sono' },
      { time: '07:03', label: 'Café da manhã', sub: 'Protocolo padrão + linhaça.', category: 'refeicao' },
      { time: '07:15', label: 'Banho — 10min', sub: 'Rápido. Protocolo corporal completo fica para o banho ao chegar em casa (11:30).', category: 'livre' },
      { time: '07:25', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
      { time: '07:27', label: 'Rotina de pele — manhã', sub: 'Protocolo completo + FPS 50+', category: 'pele' },
      { time: '07:40', label: 'Deslocamento', sub: 'Ônibus 07:30. Chega ~08:30.', category: 'livre' },
      { time: '08:50', label: 'ELE0522 — Sistemas de Controle II', sub: '08:50 – 10:30', category: 'aula' },
      { time: '10:30', label: 'Deslocamento para casa', sub: 'Chega ~11:30', category: 'livre' },
      { time: '11:30', label: 'Banho + cuidado corporal — 20min', sub: 'Nas sextas do cabelo: o banho É a lavagem → depois óleo rosa mosqueta + hidratante ureia. Nas outras: banho normal + hidratação corporal.', category: 'livre' },
      { time: '11:45', label: 'Dia do cabelo — sextas alternadas', sub: 'Lavagem + cronograma + finalização com gel. Sem pressa — tarde inteira.', category: 'cabelo' },
      { time: '12:30', label: 'Almoço em casa', sub: 'Arroz + feijão + frango/ovo. Sem frituras.', category: 'refeicao' },
      { time: '13:15', label: 'TREINO D — Full body + core', sub: 'Agachamento 3×15 / Flexão 3×10 / Prancha 3×30s / Hollow body 3×20s / Superman 3×12 · ~35min', category: 'treino' },
      { time: '14:00', label: 'Discord — xadrez + jogos com amigo', sub: '~1h–1h30. Conexo, Contexto, Expresso, Golfe, xadrez. Afiação mental diária.', category: 'livre' },
      { time: '15:30', label: 'Tarde livre', sub: 'Amigos, descanso, One Piece. Sem obrigações.', category: 'livre' },
      { time: '19:30', label: 'Rotina de pele — noite', sub: 'Protocolo noturno completo.', category: 'pele' },
      { time: '22:50', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min. Nunca pule.', category: 'pele' },
      { time: '23:00', label: 'Dormir', sub: 'Pode dormir mais tarde na sexta. Limite: 00:00.', category: 'sono' },
    ],
  },
];

export const weekendSchedule: { id: string; name: string; sub: string; info: string; days: { title: string; blocks: ScheduleBlock[] }[] } = {
  id: 'fds',
  name: 'Sábado e Domingo',
  sub: 'Acorda 08:30 · Recuperação + preparação da semana',
  info: 'Fim de semana não é anarquia. É onde você consolida o que a semana construiu. Dois dias iguais em estrutura — só o treino muda.',
  days: [
    {
      title: 'Sábado',
      blocks: [
        { time: '08:30', label: 'Acorda — alarme fixo', sub: 'Mesmo horário toda semana. O corpo não sabe que é sábado.', category: 'sono' },
        { time: '08:33', label: 'Café da manhã', sub: 'Protocolo padrão + linhaça. Café só até 14h.', category: 'refeicao' },
        { time: '08:50', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
        { time: '08:53', label: 'Rotina de pele — manhã', sub: 'Protocolo completo + FPS 50+', category: 'pele' },
        { time: '09:10', label: 'LISS — caminhada 35min acelerada', sub: 'Ao ar livre. Ritmo que eleva levemente o cardíaco. Sem HIIT nas primeiras 8 semanas.', category: 'treino' },
        { time: '10:00', label: 'Banho + cuidado corporal — 20min', sub: 'Após caminhada → água fria se conseguir → ainda úmido: óleo rosa mosqueta (flancos/coxa) + hidratante ureia (braços/corpo).', category: 'livre' },
        { time: '10:15', label: 'Revisão semanal — 1h máximo', sub: 'Revisar o que foi visto na semana. Não estudar matéria nova. Só consolidar.', category: 'estudo' },
        { time: '11:15', label: 'Preparar sanduíches da semana', sub: 'Montar os de ter/qui/qua. Frango 80g, sem maionese, dobrar a salada. ~30min.', category: 'refeicao' },
        { time: '12:00', label: 'Almoço', sub: 'Arroz + feijão + proteína. Sem frituras.', category: 'refeicao' },
        { time: '13:00', label: 'Tarde livre', sub: 'Amigos, One Piece, sair.', category: 'livre' },
        { time: '15:00', label: 'Discord — xadrez + jogos com amigo', sub: '~1h–1h30. Conexo, Contexto, Expresso, Golfe, xadrez. Afiação mental diária.', category: 'livre' },
        { time: '16:30', label: 'Hobbies — 1h', sub: 'Japonês, xadrez aprofundado ou desenho. Rotaciona pelo que estiver com vontade. Sem pressão.', category: 'estudo' },
        { time: '17:30', label: 'Tarde livre — continua', sub: 'Descansa o resto.', category: 'livre' },
        { time: '19:00', label: 'Janta', sub: 'Arroz + feijão + proteína. Mais cedo = melhor sono.', category: 'refeicao' },
        { time: '19:30', label: 'Rotina de pele — noite', sub: 'Protocolo noturno completo.', category: 'pele' },
        { time: '22:50', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min. Nunca pule.', category: 'pele' },
        { time: '23:00', label: 'Dormir', sub: 'Limite: 23:30. Acorda 08:30 = 9h30 de sono. Aproveita.', category: 'sono' },
      ],
    },
    {
      title: 'Domingo',
      blocks: [
        { time: '08:30', label: 'Acorda — alarme fixo', sub: 'Mesmo horário. Domingo é o ensaio da segunda-feira.', category: 'sono' },
        { time: '08:33', label: 'Café da manhã', sub: 'Protocolo padrão + linhaça. Café só até 14h.', category: 'refeicao' },
        { time: '08:45', label: 'Banho — 10min', sub: 'Rápido. Protocolo corporal completo fica para o banho da noite (18:45).', category: 'livre' },
        { time: '08:55', label: 'Escovar os dentes — manhã', sub: 'Após comer. Fio dental + escova 2min.', category: 'pele' },
        { time: '08:57', label: 'Rotina de pele — manhã', sub: 'Protocolo completo + FPS 50+. Quinzenalmente: esfoliação suave antes (PHA ou pano macio).', category: 'pele' },
        { time: '09:10', label: 'Descanso ativo — sem treino', sub: 'Caminhada leve, leitura, One Piece. Domingo é recuperação. Músculo cresce no repouso.', category: 'livre' },
        { time: '12:00', label: 'Almoço', sub: 'Arroz + feijão + proteína.', category: 'refeicao' },
        { time: '13:00', label: 'Contato social intencional', sub: 'Mandar mensagem pro pessoal. Sair se possível. Não é opcional — isolamento sabota tudo mais.', category: 'livre' },
        { time: '14:30', label: 'Discord — xadrez + jogos com amigo', sub: '~1h–1h30. Conexo, Contexto, Expresso, Golfe, xadrez. Afiação mental diária.', category: 'livre' },
        { time: '17:00', label: 'Preparação da semana — 30min', sub: 'Ver o que tem na semana: provas, labs, entregas. Montar prioridades. Só planejamento, não execução.', category: 'estudo' },
        { time: '17:30', label: 'Hobbies — 1h', sub: 'Japonês, xadrez aprofundado ou desenho. Rotaciona ou segue o que estiver com vontade. Se tiver prova na semana, pode trocar por revisão — mas ao menos 30min.', category: 'estudo' },
        { time: '18:45', label: 'Banho + cuidado corporal — 20min', sub: 'Protocolo completo: óleo rosa mosqueta (flancos/coxa) + hidratante ureia (braços/corpo).', category: 'livre' },
        { time: '19:05', label: 'Janta', sub: 'Arroz + feijão + proteína. Mais cedo = melhor sono.', category: 'refeicao' },
        { time: '19:30', label: 'Rotina de pele — noite', sub: 'Protocolo noturno completo.', category: 'pele' },
        { time: '21:50', label: 'Escovar os dentes — noite', sub: 'Fio dental primeiro → escova 2min. Nunca pule.', category: 'pele' },
        { time: '22:00', label: 'Dormir — mais cedo que sábado', sub: 'Acorda 08:30 = 8h30. Segunda começa às 07:00 — esse sono é o combustível da semana.', category: 'sono' },
      ],
    },
  ],
};

export const scheduleMap: Record<number, { tabId: string; tabName: string; dayId: string; blocks: ScheduleBlock[] }> = {
  0: { tabId: 'fds', tabName: 'Fim de semana', dayId: 'dom', blocks: weekendSchedule.days[1].blocks },
  1: { tabId: 'seg', tabName: 'Segunda', dayId: 'seg', blocks: weekDays[0].blocks },
  2: { tabId: 'ter', tabName: 'Terça', dayId: 'ter', blocks: weekDays[1].blocks },
  3: { tabId: 'qua', tabName: 'Quarta', dayId: 'qua', blocks: weekDays[2].blocks },
  4: { tabId: 'qui', tabName: 'Quinta', dayId: 'qui', blocks: weekDays[3].blocks },
  5: { tabId: 'sex', tabName: 'Sexta', dayId: 'sex', blocks: weekDays[4].blocks },
  6: { tabId: 'fds', tabName: 'Fim de semana', dayId: 'sab', blocks: weekendSchedule.days[0].blocks },
};

export function toMins(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function getCurrentBlock(dayNum: number, nowMins: number): { block: ScheduleBlock; idx: number } | null {
  const entry = scheduleMap[dayNum];
  if (!entry) return null;
  const blocks = entry.blocks;
  for (let i = 0; i < blocks.length; i++) {
    const next = i + 1 < blocks.length ? toMins(blocks[i + 1].time) : 24 * 60;
    if (nowMins >= toMins(blocks[i].time) && nowMins < next) {
      return { block: blocks[i], idx: i };
    }
  }
  return null;
}

export function getNextBlocks(dayNum: number, currentIdx: number, count: number = 3): ScheduleBlock[] {
  const entry = scheduleMap[dayNum];
  if (!entry) return [];
  const nextBlocks: ScheduleBlock[] = [];
  for (let i = 1; i <= count; i++) {
    const nextIdx = currentIdx + i;
    if (nextIdx < entry.blocks.length) {
      nextBlocks.push(entry.blocks[nextIdx]);
    }
  }
  return nextBlocks;
}
