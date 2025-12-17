import React, { useState } from 'react';
import { Loader } from '@react-three/drei';
import Scene from './components/Scene';
import { Navbar, AboutPage } from './components/Overlay';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'about'>('home');

  return (
    <>
      <div className="relative w-full h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2a2a] to-[#1a1a1a] overflow-hidden font-sans text-white">
        <Navbar setView={setView} currentView={view} />
        
        {/* 3D Scene handles its own content based on view */}
        <Scene view={view} />
        
        {/* About Page Overlay */}
        {view === 'about' && (
          <div className="absolute inset-0 z-40 overflow-y-auto bg-black/80 backdrop-blur-md pt-20">
             <AboutPage onClose={() => setView('home')} />
          </div>
        )}
      </div>
      <Loader 
        containerStyles={{ background: '#1a1a1a' }} 
        innerStyles={{ background: '#333', width: '200px', height: '4px' }}
        barStyles={{ background: '#FF3D00', height: '4px' }}
        dataStyles={{ fontSize: '14px', fontFamily: 'Russo One', fontWeight: 'bold', color: '#888', marginTop: '20px' }}
      />
    </>
  );
};

export default App;