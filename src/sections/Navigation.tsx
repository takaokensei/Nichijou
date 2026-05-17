import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

const tabs = [
  { id: 'seg', label: 'Segunda' },
  { id: 'ter', label: 'Terça' },
  { id: 'qua', label: 'Quarta' },
  { id: 'qui', label: 'Quinta' },
  { id: 'sex', label: 'Sexta' },
  { id: 'fds', label: 'Fim de semana' },
  { id: 'proto', label: 'Protocolos' },
  { id: 'fin', label: 'Finanças' },
  { id: 'comp', label: 'Compras' },
  { id: 'analytics', label: 'Analytics', icon: Activity },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-8 bg-[var(--surface)] rounded-2xl p-1.5 border border-[var(--border)] overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-sans tracking-wide transition-all duration-200 border-none cursor-pointer whitespace-nowrap",
              isActive 
                ? "bg-[var(--accent)] text-white shadow-sm font-medium" 
                : "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
            )}
          >
            {Icon && <Icon size={14} className={isActive ? "text-white" : "text-[var(--accent)]"} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
