import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { getCheckinsByDateStr } from '@/lib/storage';
import { scheduleMap, weekendSchedule } from '@/data/schedule';
import type { Category } from '@/data/schedule';

interface BodyRegion {
  id: string;
  label: string;
  path: string;
  colorVar: string;
  targetId: string;
  category: Category;
}

const REGIONS: BodyRegion[] = [
  {
    id: 'head',
    label: 'Rosto & Cabelo',
    path: 'M40,20 C40,10 60,10 60,20 C65,30 55,45 50,45 C45,45 35,30 40,20 Z',
    colorVar: '--c-pele',
    targetId: 'proto-pele-manha',
    category: 'pele',
  },
  {
    id: 'torso',
    label: 'Core & Peitoral',
    path: 'M35,50 L65,50 L60,100 L40,100 Z',
    colorVar: '--c-treino',
    targetId: 'proto-treino',
    category: 'treino',
  },
  {
    id: 'arms_l',
    label: 'Braços',
    path: 'M30,50 L15,90 L25,95 L35,60 Z',
    colorVar: '--c-treino',
    targetId: 'proto-treino',
    category: 'treino',
  },
  {
    id: 'arms_r',
    label: 'Braços',
    path: 'M70,50 L85,90 L75,95 L65,60 Z',
    colorVar: '--c-treino',
    targetId: 'proto-treino',
    category: 'treino',
  },
  {
    id: 'legs_l',
    label: 'Pernas & Hidratação',
    path: 'M40,105 L30,170 L40,175 L50,105 Z',
    colorVar: '--c-corpo', // will fallback to accent if not defined
    targetId: 'proto-corpo',
    category: 'pele', // Hidratação is technically part of skin care here
  },
  {
    id: 'legs_r',
    label: 'Pernas & Hidratação',
    path: 'M60,105 L70,170 L60,175 L50,105 Z',
    colorVar: '--c-corpo',
    targetId: 'proto-corpo',
    category: 'pele',
  }
];

type StatusLevel = 'ok' | 'warning' | 'critical';

function getCategoryBlocksForDay(dayNum: number): { idx: number; cat: Category }[] {
  const entry = scheduleMap[dayNum];
  if (!entry) return [];
  if (dayNum === 6) return weekendSchedule.days[0].blocks.map((b, i) => ({ idx: i, cat: b.category }));
  if (dayNum === 0) return weekendSchedule.days[1].blocks.map((b, i) => ({ idx: i + 100, cat: b.category }));
  return entry.blocks.map((b, i) => ({ idx: i, cat: b.category }));
}

function useBodyStatus(): Record<Category, StatusLevel> {
  const [status, setStatus] = useState<Record<Category, StatusLevel>>({} as any);

  useEffect(() => {
    const compute = () => {
      const today = new Date();
      const lastSeen: Partial<Record<Category, number>> = {};
      
      // Look back up to 14 days
      for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const dayNum = d.getDay();
        const checkins = getCheckinsByDateStr(dateStr);
        const dayBlocks = getCategoryBlocksForDay(dayNum);
        
        for (const { idx, cat } of dayBlocks) {
          if (checkins[idx] === 'done') {
            if (lastSeen[cat] === undefined) {
              lastSeen[cat] = i; // days ago
            }
          }
        }
      }

      const newStatus = {} as Record<Category, StatusLevel>;
      const cats: Category[] = ['pele', 'treino']; // only care about these for the body map
      for (const cat of cats) {
        const daysAgo = lastSeen[cat];
        if (daysAgo === undefined || daysAgo > 5) newStatus[cat] = 'critical';
        else if (daysAgo > 2) newStatus[cat] = 'warning';
        else newStatus[cat] = 'ok';
      }
      setStatus(newStatus);
    };

    compute();
    window.addEventListener('storage', compute);
    window.addEventListener('nexus:checkin-update', compute);
    return () => {
      window.removeEventListener('storage', compute);
      window.removeEventListener('nexus:checkin-update', compute);
    };
  }, []);

  return status;
}

interface BodyMapProps {
  onRegionClick: (targetId: string) => void;
}

export function BodyMap({ onRegionClick }: BodyMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const statusMap = useBodyStatus();

  const activeLabel = hoveredRegion 
    ? REGIONS.find(r => r.id === hoveredRegion)?.label 
    : 'Selecione uma região';

  const activeStatus = hoveredRegion
    ? statusMap[REGIONS.find(r => r.id === hoveredRegion)!.category]
    : null;

  return (
    <div className="relative w-full max-w-sm mx-auto glass-strong rounded-3xl p-6 flex flex-col items-center gap-6 border-[var(--border)] overflow-hidden">
      
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="text-center z-10 h-12 flex flex-col items-center justify-start">
        <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] font-semibold mb-1">
          NEXUS Body Map
        </h3>
        <div className="flex items-center gap-2">
          {activeStatus && (
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              activeStatus === 'ok' ? "bg-emerald-400" : activeStatus === 'warning' ? "bg-yellow-400" : "bg-red-500"
            )} />
          )}
          <p className="font-display text-lg font-medium text-[var(--accent)]">
            {activeLabel}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <svg
          viewBox="0 0 100 190"
          className="w-48 h-auto drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 20px var(--glow))' }}
        >
          {/* Base Wireframe Silhouette */}
          <path
            d="M40,20 C40,10 60,10 60,20 C65,30 55,45 50,45 C45,45 35,30 40,20 Z M35,50 L65,50 L60,100 L40,100 Z M30,50 L15,90 L25,95 L35,60 Z M70,50 L85,90 L75,95 L65,60 Z M40,105 L30,170 L40,175 L50,105 Z M60,105 L70,170 L60,175 L50,105 Z"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
            className="opacity-50"
          />

          {REGIONS.map((region) => {
            const isHovered = hoveredRegion === region.id || (region.label === 'Braços' && hoveredRegion?.startsWith('arms')) || (region.label === 'Pernas & Hidratação' && hoveredRegion?.startsWith('legs'));
            const status = statusMap[region.category] || 'ok';
            const statusColor = status === 'ok' ? 'var(--accent-muted)' : status === 'warning' ? '#facc15' : '#ef4444';
            
            return (
              <path
                key={region.id}
                d={region.path}
                fill={isHovered ? `var(${region.colorVar}, var(--accent))` : 'color-mix(in srgb, var(--surface) 50%, transparent)'}
                stroke={isHovered ? `var(${region.colorVar}, var(--accent))` : statusColor}
                strokeWidth={isHovered ? "2" : "1"}
                className="transition-all duration-300 cursor-pointer origin-center"
                style={{
                  opacity: hoveredRegion ? (isHovered ? 1 : 0.3) : 0.8,
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onRegionClick(region.targetId)}
              />
            );
          })}
          
          {/* Data points/nodes connecting the body */}
          <circle cx="50" cy="30" r="1.5" fill="var(--accent)" className="animate-pulse" />
          <circle cx="50" cy="75" r="1.5" fill="var(--accent)" className="animate-pulse" style={{ animationDelay: '0.5s'}} />
          <circle cx="45" cy="140" r="1.5" fill="var(--accent)" className="animate-pulse" style={{ animationDelay: '1s'}} />
          <circle cx="55" cy="140" r="1.5" fill="var(--accent)" className="animate-pulse" style={{ animationDelay: '1.2s'}} />
        </svg>

        {/* Global Status Indicators */}
        <div className="absolute top-2 -right-12 flex flex-col gap-2">
          {Object.entries(statusMap).map(([cat, st]) => (
            <div key={cat} className="flex items-center gap-1.5 bg-[var(--surface-2)] px-2 py-1 rounded-md border border-[var(--border)]">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                st === 'ok' ? "bg-emerald-400" : st === 'warning' ? "bg-yellow-400" : "bg-red-500"
              )} />
              <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--text-secondary)]">
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative HUD elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[var(--accent)] opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[var(--accent)] opacity-50" />
    </div>
  );
}
