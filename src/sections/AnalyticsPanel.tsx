import { useAnalytics } from '@/hooks/useAnalytics';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
import { Activity, PieChart as PieChartIcon, TrendingUp, Zap, Calendar, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsPanelProps {
  isVisible: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg p-3 shadow-lg border-[var(--border)] text-sm">
        <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">{label}</p>
        <p className="font-display font-medium text-[var(--text)]">
          Score: <span className="text-[var(--accent)]">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsPanel({ isVisible }: AnalyticsPanelProps) {
  const { adherence, distribution, stats } = useAnalytics();

  if (!isVisible) return null;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }} className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-3xl font-semibold text-[var(--text)] tracking-tight m-0">
          Analytics
        </h2>
        <p className="font-sans text-[12px] text-[var(--text-secondary)] mt-1 tracking-wide">
          Análise de aderência e distribuição (últimos 30 dias)
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-2xl p-4 flex flex-col justify-between">
          <Target size={14} className="text-[var(--text-secondary)] mb-2" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] mb-1">Média 30d</span>
          <span className="font-display text-2xl font-bold text-[var(--accent)]">{stats.avgScore}</span>
        </div>
        <div className="glass rounded-2xl p-4 flex flex-col justify-between">
          <Calendar size={14} className="text-[var(--text-secondary)] mb-2" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] mb-1">Melhor Dia</span>
          <span className="font-mono text-xl font-medium text-[var(--text)]">{stats.bestDay}</span>
        </div>
        <div className="glass rounded-2xl p-4 flex flex-col justify-between">
          <Zap size={14} className="text-[var(--text-secondary)] mb-2" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] mb-1">Efeito Treino</span>
          <span className={cn(
            "font-mono text-xl font-bold",
            stats.correlationTreino > 0 ? "text-emerald-500" : "text-[var(--text-secondary)]"
          )}>
            {stats.correlationTreino > 0 ? '+' : ''}{stats.correlationTreino} pts
          </span>
        </div>
      </div>

      {/* Adherence Chart */}
      <div className="glass-strong rounded-3xl p-5 pt-6 border-[var(--border)] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={14} className="text-[var(--accent)]" />
          <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] font-semibold">
            Curva de Aderência
          </h3>
        </div>
        
        <div className="h-[200px] w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adherence} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="shortDate" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}
                dy={10}
                minTickGap={20}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={stats.avgScore} stroke="var(--border)" strokeDasharray="3 3" />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="var(--accent)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Chart & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pie Chart */}
        <div className="glass-strong rounded-3xl p-5 border-[var(--border)] flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <PieChartIcon size={14} className="text-[var(--accent)]" />
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] font-semibold">
              Distribuição de Foco
            </h3>
          </div>
          
          <div className="h-[180px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display text-2xl font-bold text-[var(--text)] leading-none mb-1">
                {distribution.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--text-secondary)]">Blocos</span>
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="glass rounded-3xl p-5 border-[var(--border)] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-[var(--accent)]" />
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] font-semibold">
              Insights Algorítmicos
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--c-treino)] mt-1.5 shrink-0" />
              <p className="text-xs text-[var(--text)] leading-relaxed">
                Nos dias em que há conclusão de treino, a aderência a outros protocolos aumenta em média <strong className="text-[var(--accent)]">{stats.correlationTreino > 0 ? '+' : ''}{stats.correlationTreino} pontos</strong>.
              </p>
            </div>
            
            <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
              <p className="text-xs text-[var(--text)] leading-relaxed">
                Manter o ritmo: a curva de aderência mostra {adherence.length > 0 && adherence[adherence.length - 1].score >= stats.avgScore ? "estabilidade recente acima" : "queda recente abaixo"} da média histórica de {stats.avgScore} pts.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
