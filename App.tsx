
import React, { useState, useCallback } from 'react';
import { ViewMode } from './types';
import StrategyView from './components/StrategyView';
import BandSiteDemo from './components/BandSiteDemo';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.STRATEGY);

  const toggleView = useCallback(() => {
    setViewMode(prev => prev === ViewMode.STRATEGY ? ViewMode.DEMO : ViewMode.STRATEGY);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* View Toggle Controller */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleView}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-full shadow-2xl shadow-indigo-500/50 font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
        >
          {viewMode === ViewMode.STRATEGY ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Посмотреть сайт-прототип
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Вернуться к стратегии
            </>
          )}
        </button>
      </div>

      {viewMode === ViewMode.STRATEGY ? (
        <StrategyView />
      ) : (
        <BandSiteDemo />
      )}
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
