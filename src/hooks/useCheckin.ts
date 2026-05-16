import { useState, useCallback, useEffect } from 'react';
import { getCheckin, setCheckin, getAllCheckins } from '@/lib/storage';
import type { CheckinStatus } from '@/lib/storage';

export type { CheckinStatus };

export function useCheckin(date: Date = new Date()) {
  const [checkins, setCheckins] = useState<Record<number, CheckinStatus>>(
    () => getAllCheckins(date)
  );

  useEffect(() => {
    const refresh = () => setCheckins(getAllCheckins(date));
    window.addEventListener('storage', refresh);
    window.addEventListener('nexus:checkin-update', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('nexus:checkin-update', refresh);
    };
  }, [date]);

  const toggle = useCallback((blockIndex: number, status: CheckinStatus) => {
    // If clicking same status, undo (set to null)
    const current = getCheckin(blockIndex, date);
    const next: CheckinStatus = current === status ? null : status;
    setCheckin(blockIndex, next, date);
    setCheckins(prev => ({ ...prev, [blockIndex]: next }));
  }, [date]);

  const getStatus = useCallback((blockIndex: number): CheckinStatus => {
    return checkins[blockIndex] ?? null;
  }, [checkins]);

  return { getStatus, toggle };
}
