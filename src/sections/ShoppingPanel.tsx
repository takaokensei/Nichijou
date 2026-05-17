import { ArrowUpRight } from 'lucide-react';
import { skinProducts, hairProducts } from '@/data/shopping';
import { cn } from '@/lib/utils';

interface ShoppingPanelProps {
  isVisible: boolean;
}

function ShoppingCard({ item }: { item: typeof skinProducts[0] }) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-3.5 mb-2 transition-all duration-200",
        item.pending ? "border-[var(--c-cabelo)] opacity-75" : "border-border"
      )}
    >
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium text-foreground">{item.title}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{item.brand}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[16px] font-medium text-foreground whitespace-nowrap">{item.price}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{item.priceSub}</div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {item.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md no-underline border border-border text-muted-foreground bg-[var(--surface-2)] transition-colors hover:border-foreground hover:text-foreground"
          >
            <ArrowUpRight size={10} />
            {link.label}
          </a>
        ))}
        {item.note && (
          <span className={cn(
            "text-[11px] font-mono flex items-center ml-1",
            item.pending ? "text-[var(--c-cabelo)]" : "text-muted-foreground"
          )}>
            {item.note}
          </span>
        )}
      </div>
    </div>
  );
}

export function ShoppingPanel({ isVisible }: ShoppingPanelProps) {
  const skinTotal = 'R$ 175–230';
  const hairTotal = 'R$ 110–160';
  const grandTotal = 'R$ 325–450';

  if (!isVisible) return null;

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="mb-6">
        <h2 className="font-display text-4xl font-semibold text-foreground tracking-tight leading-none m-0">
          Compras
        </h2>
        <p className="font-sans text-[13px] text-muted-foreground mt-1.5 tracking-wide">
          Produtos com links diretos · preços verificados mai/2026
        </p>
      </div>

      <div className="info-box mt-0 mb-6">
        Links priorizando o menor preço encontrado — Mercado Livre quando mais barato, Amazon como alternativa. Confira antes de comprar, preços mudam.
      </div>

      {/* Pele */}
      <p className="section-title">Pele</p>
      {skinProducts.map((item, i) => <ShoppingCard key={i} item={item} />)}

      <div className="glass-strong border border-border rounded-xl p-4 mt-4 flex justify-between items-center">
        <div className="text-[12px] text-muted-foreground">Total pele (compra inicial)</div>
        <div className="text-right">
          <div className="text-[18px] font-medium text-foreground">{skinTotal}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">sem ácido azelaico ainda</div>
        </div>
      </div>

      {/* Cabelo */}
      <p className="section-title">Cabelo — ondas 2A-2B</p>
      {hairProducts.map((item, i) => <ShoppingCard key={i} item={item} />)}

      <div className="glass-strong border border-border rounded-xl p-4 mt-2 flex justify-between items-center">
        <div className="text-[12px] text-muted-foreground">Total cabelo (compra inicial)</div>
        <div className="text-right">
          <div className="text-[18px] font-medium text-foreground">{hairTotal}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">Widi Care + Low Poo</div>
        </div>
      </div>

      {/* Total geral */}
      <div className="glass-strong border border-[var(--accent)] rounded-xl p-4 mt-2 flex justify-between items-center">
        <div className="text-[12px] text-muted-foreground">Total geral — mês 1</div>
        <div className="text-right">
          <div className="text-[20px] font-medium text-[var(--accent)]">{grandTotal}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">pele + cabelo + corpo · sem azelaico</div>
        </div>
      </div>

      <div className="info-box">
        Com R$700 de bolsa e ~R$114 de ônibus, o mês 1 vai consumir quase toda a bolsa. Mas é o único mês assim — do mês 2 em diante são só reposições (~R$117/mês). Os R$2.390 poupados cobrem o investimento inicial sem problema.
      </div>
    </div>
  );
}
