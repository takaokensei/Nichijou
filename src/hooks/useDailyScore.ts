import { useState, useEffect } from 'react';
import { getAllCheckins } from '@/lib/storage';
import { scheduleMap } from '@/data/schedule';
import type { Category } from '@/data/schedule';

// Per-category weights as specified in the Master Plan
const CATEGORY_WEIGHTS: Record<Category, number> = {
  sono:     2.0,
  treino:   1.5,
  estudo:   1.3,
  pele:     1.2,
  cabelo:   1.2,
  aula:     1.3,
  refeicao: 1.0,
  livre:    0.5,
};

export interface DailyScoreResult {
  score: number;           // 0–100 rounded
  completed: number;       // weighted sum of done blocks
  total: number;           // weighted sum of all blocks
  blocksDone: number;      // raw count
  blocksSkipped: number;   // raw count
  blocksTotal: number;     // raw count
}

export function computeScore(dayNum: number, checkins: Record<number, string | null>): DailyScoreResult {
  const entry = scheduleMap[dayNum];
  if (!entry) return { score: 0, completed: 0, total: 0, blocksDone: 0, blocksSkipped: 0, blocksTotal: 0 };

  const blocks = entry.blocks;
  let completedWeight = 0;
  let totalWeight = 0;
  let blocksDone = 0;
  let blocksSkipped = 0;

  blocks.forEach((block, idx) => {
    const weight = CATEGORY_WEIGHTS[block.category] ?? 1.0;
    totalWeight += weight;
    if (checkins[idx] === 'done') {
      completedWeight += weight;
      blocksDone++;
    } else if (checkins[idx] === 'skipped') {
      blocksSkipped++;
    }
  });

  const score = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;

  return {
    score,
    completed: Math.round(completedWeight * 10) / 10,
    total: Math.round(totalWeight * 10) / 10,
    blocksDone,
    blocksSkipped,
    blocksTotal: blocks.length,
  };
}

export function useDailyScore(date: Date = new Date()): DailyScoreResult {
  const dayNum = date.getDay();

  const [result, setResult] = useState<DailyScoreResult>(() =>
    computeScore(dayNum, getAllCheckins(date))
  );

  // Re-compute whenever localStorage changes (e.g. another tab, or checkin toggle)
  useEffect(() => {
    const refresh = () => setResult(computeScore(dayNum, getAllCheckins(date)));

    // Listen for storage events from other tabs
    window.addEventListener('storage', refresh);
    // Listen for custom event from same tab
    window.addEventListener('nexus:checkin-update', refresh);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('nexus:checkin-update', refresh);
    };
  }, [dayNum, date]);

  return result;
}
