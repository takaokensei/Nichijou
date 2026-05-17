import { useState, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useCurrentBlock } from '@/hooks/useCurrentBlock';
import { weekDays, scheduleMap } from '@/data/schedule';
import { BootSequence } from '@/sections/BootSequence';
import { Header } from '@/sections/Header';
import { MetricsPanel } from '@/sections/MetricsPanel';
import { Navigation } from '@/sections/Navigation';
import { DayPanel } from '@/sections/DayPanel';
import { WeekendPanel } from '@/sections/WeekendPanel';
import { ProtocolPanel } from '@/sections/ProtocolPanel';
import { AnalyticsPanel } from '@/sections/AnalyticsPanel';
import { FinancePanel } from '@/sections/FinancePanel';
import { ShoppingPanel } from '@/sections/ShoppingPanel';

import { ContextWidget } from '@/sections/ContextWidget';

function App() {
  const { theme, toggleTheme } = useTheme();
  const currentBlock = useCurrentBlock();
  const [bootDone, setBootDone] = useState(false);
  const [activeTab, setActiveTab] = useState('seg');

  const handleBootComplete = useCallback(() => {
    setBootDone(true);
    const now = new Date();
    const dayNum = now.getDay();
    const entry = scheduleMap[dayNum];
    if (entry) {
      setActiveTab(entry.tabId);
    }
  }, []);

  const currentBlockIdx = (() => {
    if (!currentBlock) return null;
    const entry = scheduleMap[currentBlock.dayNum];
    if (!entry) return null;
    if (entry.tabId !== activeTab) return null;
    return currentBlock.idx;
  })();

  return (
    <>
      {!bootDone && <BootSequence onComplete={handleBootComplete} />}

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <MetricsPanel />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {weekDays.map(day => (
          <DayPanel
            key={day.id}
            day={day}
            isVisible={activeTab === day.id}
            currentBlockIdx={activeTab === day.id ? currentBlockIdx : null}
          />
        ))}

        <WeekendPanel isVisible={activeTab === 'fds'} />
        <ProtocolPanel isVisible={activeTab === 'proto'} />
        <AnalyticsPanel isVisible={activeTab === 'analytics'} />
        <FinancePanel isVisible={activeTab === 'fin'} />
        <ShoppingPanel isVisible={activeTab === 'comp'} />
      </main>

      {bootDone && <ContextWidget />}
    </>
  );
}

export default App;
