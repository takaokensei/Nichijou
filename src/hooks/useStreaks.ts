import { useState, useEffect } from 'react';
import { getCheckinsByDateStr } from '@/lib/storage';
import { scheduleMap, weekendSchedule } from '@/data/schedule';
import type { Category } from '@/data/schedule';

export type StreaksData = Record<Category, number>;

function getCategoryBlocksForDay(dayNum: number): { idx: number; cat: Category }[] {
  const entry = scheduleMap[dayNum];
  if (!entry) return [];

  // Handle weekend offset logic (Sáb = 0-99, Dom = 100-199)
  if (dayNum === 6) {
    // Saturday
    return weekendSchedule.days[0].blocks.map((b, i) => ({ idx: i, cat: b.category }));
  } else if (dayNum === 0) {
    // Sunday
    return weekendSchedule.days[1].blocks.map((b, i) => ({ idx: i + 100, cat: b.category }));
  }

  // Weekdays
  return entry.blocks.map((b, i) => ({ idx: i, cat: b.category }));
}

function computeStreaks(): StreaksData {
  const streaks: StreaksData = {
    aula: 0, treino: 0, pele: 0, cabelo: 0,
    refeicao: 0, sono: 0, estudo: 0, livre: 0,
  };
  
  const broken: Record<Category, boolean> = {
    aula: false, treino: false, pele: false, cabelo: false,
    refeicao: false, sono: false, estudo: false, livre: false,
  };

  const today = new Date();

  // Look back up to 60 days
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayNum = d.getDay();
    
    const checkins = getCheckinsByDateStr(dateStr);
    const dayBlocks = getCategoryBlocksForDay(dayNum);

    // Group checkins by category for this day
    const catStats = {} as Record<Category, { done: number; skipped: number }>;
    
    for (const { idx, cat } of dayBlocks) {
      if (!catStats[cat]) catStats[cat] = { done: 0, skipped: 0 };
      if (checkins[idx] === 'done') catStats[cat].done++;
      if (checkins[idx] === 'skipped') catStats[cat].skipped++;
    }

    // Apply rules
    for (const cat of Object.keys(streaks) as Category[]) {
      if (broken[cat]) continue;
      
      const stats = catStats[cat];
      if (!stats) continue; // no blocks for this category today
      
      if (stats.done > 0) {
        streaks[cat]++;
      } else if (stats.skipped > 0) {
        broken[cat] = true;
      }
      // If done == 0 and skipped == 0, streak doesn't increment but doesn't break.
    }

    // If all streaks are broken, we can stop early
    if (Object.values(broken).every(b => b)) break;
  }

  return streaks;
}

export function useStreaks(): StreaksData {
  const [streaks, setStreaks] = useState<StreaksData>(computeStreaks);

  useEffect(() => {
    const refresh = () => setStreaks(computeStreaks());
    
    window.addEventListener('storage', refresh);
    window.addEventListener('nexus:checkin-update', refresh);
    
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('nexus:checkin-update', refresh);
    };
  }, []);

  return streaks;
}
