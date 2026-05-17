export interface FinProduct {
  title: string;
  brand: string;
  price: string;
  priceSub: string;
  badge: string;
  badgeType: 'unico' | 'mensal' | 'futuro' | 'fixo';
}

export interface FinMetric {
  label: string;
  value: string;
  valueColor?: string;
  sub: string;
}

export interface FinPhase {
  title: string;
  body: string;
  ok?: boolean;
}

export const finInitialProducts: FinProduct[] = [
  { title: 'Sabonete facial suave', brand: 'Principia GL-01 ou Nupill Derme Control · 120–150ml', price: 'R$ 22–30', priceSub: 'dura ~2 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Sérum niacinamida 10% + zinco 1%', brand: 'Principia NC-10 · 30ml', price: 'R$ 35–45', priceSub: 'dura ~2–3 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Hidratante gel oil-free', brand: 'Nivea Facial Hidratante Gel (Pepino) · 100g', price: 'R$ 29–35', priceSub: 'dura ~3 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Protetor solar FPS 50+ toque seco', brand: 'Anasol Oil Free Toque Seco 200ml — melhor custo-benefício', price: 'R$ 37–42', priceSub: 'dura ~2–3 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Água micelar (limpeza dupla)', brand: 'Garnier Água Micelar 400ml', price: 'R$ 22–28', priceSub: 'dura ~3 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Óleo de rosa mosqueta — estrias', brand: 'Aplicar nos flancos e posterior de coxa após banho. Diário.', price: 'R$ 18–28', priceSub: 'dura ~3 meses', badge: 'Compra única agora', badgeType: 'unico' },
];

export const finPhase5Products: FinProduct[] = [
  { title: 'Hidratante corporal ureia 10% — Cerave SA ou Eucerin UreaRepair', brand: 'Queratose pilar nos braços + hidratação corporal geral · aplica após banho', price: 'R$ 40–60', priceSub: 'dura ~2–3 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Ácido azelaico 10% gel', brand: 'FarmaSite ou The Ordinary · 30g — não compra agora, só na semana 5', price: 'R$ 45–55', priceSub: 'dura ~3–4 meses', badge: 'Compra no mês 2', badgeType: 'futuro' },
];

export const finHairProducts: FinProduct[] = [
  { title: 'Leave-in leve — Widi Care Ondulando a Juba', brand: '500ml · ideal para ondas 2A-2B, sem pesar o fio', price: 'R$ 45–65', priceSub: 'dura 3–4 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Gel/Ativador leve — Widi Care Geleia de Babosa', brand: 'Fixação suave, sem efeito capacete · ideal ondas 2A-2B', price: 'R$ 30–50', priceSub: 'dura 3–4 meses', badge: 'Compra única agora', badgeType: 'unico' },
  { title: 'Shampoo + Condicionador Low Poo', brand: 'Salon Line Low Poo ou Elseve Glycolic Gloss · 300ml cada', price: 'R$ 32–48', priceSub: 'dura ~2 meses cada', badge: 'Compra única agora', badgeType: 'unico' },
];

export const finInitialMetrics: FinMetric[] = [
  { label: 'Pele (compra inicial)', value: 'R$ 175–230', valueColor: 'var(--c-pele)', sub: 'inclui óleo rosa mosqueta' },
  { label: 'Cabelo (compra inicial)', value: 'R$ 110–160', valueColor: 'var(--c-cabelo)', sub: 'Widi Care + Low Poo' },
];

export const finMonthlyProducts: FinProduct[] = [
  { title: 'Ônibus — ida e volta à UFRN', brand: 'R$2,60 × 2 passagens × ~22 dias letivos/mês', price: 'R$ ~114', priceSub: '~R$26/semana', badge: 'Gasto fixo', badgeType: 'fixo' },
  { title: 'Sabonete facial', brand: 'Repõe a cada ~2 meses', price: 'R$ 13', priceSub: 'R$26/2 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Niacinamida 10%', brand: 'Repõe a cada ~2,5 meses', price: 'R$ 16', priceSub: 'R$40/2,5 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Hidratante gel', brand: 'Repõe a cada ~3 meses', price: 'R$ 10', priceSub: 'R$30/3 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Protetor solar FPS 50+', brand: 'Repõe a cada ~2,5 meses — uso intenso em Natal', price: 'R$ 16', priceSub: 'R$40/2,5 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Água micelar', brand: 'Repõe a cada ~3 meses', price: 'R$ 8', priceSub: 'R$25/3 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Óleo rosa mosqueta — estrias', brand: 'Repõe a cada ~3 meses', price: 'R$ 8', priceSub: 'R$23/3 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Ácido azelaico (mês 2+)', brand: 'Repõe a cada ~3,5 meses', price: 'R$ 14', priceSub: 'R$50/3,5 meses', badge: 'A partir do mês 2', badgeType: 'futuro' },
  { title: 'Shampoo + condicionador', brand: 'Repõe a cada ~2 meses', price: 'R$ 20', priceSub: 'R$40/2 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
  { title: 'Leave-in + gel ativador', brand: 'Repõe a cada ~4 meses', price: 'R$ 12', priceSub: 'R$48/4 meses', badge: 'Mensal prorrateado', badgeType: 'mensal' },
];

export const finMonthlyMetrics: FinMetric[] = [
  { label: 'Produtos — mês 1', value: 'R$ 103', valueColor: 'var(--c-estudo)', sub: 'sem ácido azelaico' },
  { label: 'Produtos — mês 2+', value: 'R$ 117', valueColor: 'var(--c-estudo)', sub: 'com ácido azelaico' },
];

export const finBudgetMetrics: FinMetric[] = [
  { label: 'Renda mensal (PIBIC)', value: 'R$ 700', sub: 'bolsa NLP · UFRN' },
  { label: 'Transporte mensal', value: 'R$ ~114', valueColor: 'var(--c-sono)', sub: 'ônibus 5 dias/semana' },
  { label: 'Produtos (mês 2+)', value: 'R$ ~117', valueColor: 'var(--c-estudo)', sub: 'cuidado pessoal' },
  { label: 'Total gastos fixos', value: 'R$ ~231', valueColor: 'var(--c-pele)', sub: 'transporte + produtos' },
];

export const finBudgetBars = [
  { label: 'Transporte (ônibus)', value: 'R$ 114 · 16%', width: 16, color: 'var(--c-sono)' },
  { label: 'Produtos de cuidado pessoal', value: 'R$ 117 · 17%', width: 17, color: 'var(--c-pele)' },
  { label: 'Lazer / imprevistos (sugerido)', value: 'R$ 100 · 14%', width: 14, color: 'var(--c-cabelo)' },
  { label: 'Poupança', value: 'R$ 369 · 53%', width: 53, color: 'var(--c-treino)' },
];

export const finBudgetCards: FinProduct[] = [
  { title: 'Cenário moderado — R$100/mês em lazer', brand: 'R$469/mês × 12 = R$5.628 + R$2.390 já poupados', price: 'R$ 8.018', priceSub: 'em 1 ano', badge: '', badgeType: 'unico' },
  { title: 'Cenário conservador — R$200/mês em lazer', brand: 'R$369/mês × 12 = R$4.428 + R$2.390 já poupados', price: 'R$ 6.818', priceSub: 'em 1 ano', badge: '', badgeType: 'unico' },
];

export const finStrategyPhases: FinPhase[] = [
  { title: 'Agora — compra inicial pele + cabelo + estrias', body: 'Junte tudo num pedido no Mercado Livre para atingir frete grátis (geralmente acima de R$79). Principia tem loja oficial com combos mais baratos. Prioridade: sabonete + niacinamida + FPS + hidratante + água micelar + óleo rosa mosqueta + leave-in + gel + shampoo/cond. Total: ~R$235.' },
  { title: 'Semana 5 (mês 2) — introduzir ácido azelaico', body: 'Só compra após 4 semanas usando a niacinamida. Pele precisa se adaptar antes. FarmaSite no Mercado Livre tem o gel 10% por ~R$45–50. Não antecipa essa compra.' },
  { title: 'Dica — embalagens maiores sempre compensam', body: 'Gelatina Salon Line 550g vs 300g: diferença de R$8 mas dura 80% a mais. Protetor solar 200ml vs 60ml: mesmo raciocínio. Para cabelo, sempre a maior embalagem — você usa regularmente e não vence.', ok: true },
  { title: 'Onde comprar — ordem de prioridade', body: '1º Mercado Livre (loja oficial das marcas — mais barato, frete grátis frequente). 2º Amazon.com.br. 3º Drogasil/Farmácias online. Evita lojas físicas sem checar o preço online antes.', ok: true },
  { title: 'O que NÃO comprar agora', body: 'Vitamina C pura (não é o ativo certo para o seu tipo de olheira). Peróxido de benzoíla sem orientação dermato. Óleos ou manteigas capilares pesadas — cabelo 2B não precisa. Máscaras capilares caras — uma da Salon Line ~R$15 resolve.' },
  { title: 'Transporte — se quiser economizar', body: 'R$114/mês no ônibus é fixo enquanto você mora longe da UFRN. Não tem muito o que fazer além de verificar se tem desconto estudantil no cartão de transporte de Natal — pode reduzir a passagem.', ok: true },
];
