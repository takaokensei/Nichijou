export interface ShoppingItem {
  title: string;
  brand: string;
  price: string;
  priceSub: string;
  links: { label: string; url: string }[];
  note?: string;
  pending?: boolean;
}

export const skinProducts: ShoppingItem[] = [
  {
    title: 'Sabonete Facial Nupill Derme Control',
    brand: '200ml · gel ou espuma · não comedogênico',
    price: 'R$ 19–22',
    priceSub: 'dura ~2 meses',
    links: [{ label: 'Amazon', url: 'https://www.amazon.com.br/Nupill-Sabonete-Liquido-Facial-Control/dp/B077C2JWKQ' }],
  },
  {
    title: 'Sérum Niacinamida 10% + Zinco — Principia NC-10',
    brand: '30ml · trata acne + oleosidade simultaneamente',
    price: 'R$ 50–55',
    priceSub: 'dura ~2,5 meses',
    links: [{ label: 'Amazon', url: 'https://www.amazon.com.br/S%C3%A9rum-Nc-10-Principia-Niacinamida-Zinco/dp/B08R7RSJFX' }],
  },
  {
    title: 'Nivea Facial Hidratante Gel (Pepino)',
    brand: '100g · oil-free com ácido hialurônico · ideal pele oleosa',
    price: 'R$ 29–35',
    priceSub: 'dura ~3 meses',
    links: [
      { label: 'Amazon', url: 'https://www.amazon.com.br/s?k=Nivea+Facial+Hidratante+Gel+pepino' },
      { label: 'Mercado Livre', url: 'https://lista.mercadolivre.com.br/nivea-facial-hidratante-gel-pepino' }
    ],
  },
  {
    title: 'Protetor Solar Anasol Oil Free Toque Seco FPS 50',
    brand: '200ml · toque seco · ideal para Natal',
    price: 'R$ 36–45',
    priceSub: 'dura ~2,5 meses',
    links: [{ label: 'Mercado Livre', url: 'https://www.mercadolivre.com.br/protetor-solar-anasol-fps-50-oil-free-toque-seco-200ml/p/MLB19504667' }],
  },
  {
    title: 'Água Micelar Garnier SkinActive',
    brand: '400ml · limpeza dupla · remove FPS e proteção',
    price: 'R$ 38–55',
    priceSub: 'dura ~3 meses',
    links: [{ label: 'Amazon', url: 'https://www.amazon.com.br/%C3%81gua-Micelar-Tudo-Garnier-400ML/dp/B085PJ15G9' }],
  },
  {
    title: 'Óleo de Rosa Mosqueta Puro — Farmax',
    brand: '30ml · estrias roxas nos flancos e posterior de coxa · aplicar após banho',
    price: 'R$ 20–28',
    priceSub: 'dura ~3 meses',
    links: [],
    note: 'Busca "Farmax rosa mosqueta" no ML',
  },
  {
    title: 'Ácido Azelaico 10% Gel — FarmaSite',
    brand: '30g · introduzir apenas na semana 5 · não compra agora',
    price: 'R$ 45–55',
    priceSub: 'dura ~3,5 meses',
    links: [],
    note: '⏳ Compra no mês 2 — busca no ML',
    pending: true,
  },
  {
    title: 'Hidratante Corporal com Ureia 10% — Cerave SA ou Eucerin UreaRepair',
    brand: 'Queratose pilar nos braços + hidratação geral do corpo · aplica após banho',
    price: 'R$ 40–60',
    priceSub: 'dura ~2–3 meses',
    links: [],
    note: 'Busca "Cerave SA Smoothing" ou "Eucerin UreaRepair 10%" no ML',
  },
];

export const hairProducts: ShoppingItem[] = [
  {
    title: 'Leave-in Leve — Widi Care Ondulando a Juba',
    brand: '500ml · não pesa o fio · ideal para ondas finas 2A-2B',
    price: 'R$ 45–65',
    priceSub: 'dura 3–4 meses',
    links: [
      { label: 'Amazon', url: 'https://www.amazon.com.br/Ondulando-Juba-Creme-Pentar-500ml/dp/B0933L5RJC' },
      { label: 'Mercado Livre', url: 'https://lista.mercadolivre.com.br/widi-care-ondulando-juba' },
    ],
  },
  {
    title: 'Gel/Ativador Leve — Widi Care Geleia de Babosa',
    brand: 'Fixação suave sem efeito capacete · não sela demais as ondas',
    price: 'R$ 30–50',
    priceSub: 'dura 3–4 meses',
    links: [{ label: 'Mercado Livre', url: 'https://lista.mercadolivre.com.br/widi-care-geleia-babosa' }],
  },
  {
    title: 'Shampoo + Condicionador Low Poo',
    brand: 'Salon Line Low Poo ou Elseve Glycolic Gloss · 300ml cada',
    price: 'R$ 32–48',
    priceSub: 'o par · dura ~2 meses',
    links: [],
    note: 'Busca no supermercado ou ML — geralmente mais barato presencialmente',
  },
];
