
import React from 'react';
import BandSiteDemo from './components/BandSiteDemo';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020005]">
      {/* The app now directly serves the interactive band site demo */}
      <BandSiteDemo />
      
      {/* Background decoration - consistent across the app */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
