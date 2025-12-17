import React, { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface NavbarProps {
  setView: (view: 'home' | 'about') => void;
  currentView?: 'home' | 'about';
}

// Navbar Component
export const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 md:px-20 md:py-10 flex justify-between items-center pointer-events-none text-white">
      <div 
        className="text-2xl font-black tracking-tighter pointer-events-auto cursor-pointer font-display"
        onClick={() => setView('home')}
      >
        BASKET<span className="text-brand-orange">FLOW</span>
      </div>
      <div className="hidden md:flex gap-8 font-bold text-sm tracking-widest uppercase pointer-events-auto text-gray-400">
        <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className={`hover:text-brand-orange transition-colors ${currentView === 'home' ? 'text-white' : ''}`}>Products</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="hover:text-brand-orange transition-colors">Technology</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setView('about'); }} className={`hover:text-brand-orange transition-colors ${currentView === 'about' ? 'text-white' : ''}`}>About Us</a>
      </div>
      <div className="pointer-events-auto min-w-[100px] flex justify-end">
        {currentView !== 'about' && (
          <button className="bg-white/10 hover:bg-brand-orange text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-colors backdrop-blur-md border border-white/20">
            Cart (0)
          </button>
        )}
      </div>
    </nav>
  );
};

interface AboutPageProps {
  onClose?: () => void;
}

// About Page Component
export const AboutPage: React.FC<AboutPageProps> = ({ onClose }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-8 md:px-20 pb-20 pointer-events-auto relative">
      
      {/* Close Button - increased z-index to 100 to guarantee visibility above all other elements */}
      {onClose && (
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 md:top-10 md:right-10 z-[100] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all group"
          aria-label="Close"
        >
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
           </svg>
        </button>
      )}

      <div className="max-w-4xl w-full mt-10">
        <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-8 leading-none">
          OUR <span className="text-brand-orange">STORY</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="text-xl text-gray-300 leading-relaxed mb-6 font-medium">
              BasketFlow was founded on a simple premise: basketball isn't just a game of instinct, it's a game of precision physics.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We started in a garage in Bangalore, stripping down traditional basketballs to understand their flaws. Inconsistent bounce, slippery surfaces when wet, and lack of data feedback. We decided to rebuild the basketball from the core out.
            </p>
          </div>
          <div className="border-l border-white/10 pl-8">
             <h3 className="text-2xl font-display font-bold text-white mb-4">MISSION</h3>
             <p className="text-gray-400 mb-8">To empower athletes with equipment that evolves with their game.</p>
             <h3 className="text-2xl font-display font-bold text-white mb-4">VISION</h3>
             <p className="text-gray-400">A world where every shot is measurable, analyzing improvement in real-time.</p>
          </div>
        </div>

        <div className="mb-20">
           <h2 className="text-4xl font-display font-bold text-white mb-10 border-b border-white/10 pb-4">THE TEAM</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Arjun Patel", role: "Founder & Lead Engineer", bg: "bg-gray-800" },
                { name: "Ananya Iyer", role: "Head of Design", bg: "bg-gray-800" },
                { name: "Vikram Singh", role: "Data Science Lead", bg: "bg-gray-800" }
              ].map((member, i) => (
                <div key={i} className="group cursor-pointer">
                   <div className={`h-64 w-full ${member.bg} rounded-lg mb-4 overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-white/5 group-hover:bg-brand-orange/20 transition-colors duration-500"></div>
                      {/* Placeholder for team image */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-display font-bold text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                        {member.name.charAt(0)}
                      </div>
                   </div>
                   <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">{member.name}</h3>
                   <p className="text-sm text-gray-500 uppercase tracking-widest">{member.role}</p>
                </div>
              ))}
           </div>
        </div>
        
        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">JOIN THE REVOLUTION</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">We are always looking for passionate engineers, designers, and ballers to join our team.</p>
            <button className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm">
               View Careers
            </button>
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <section className="h-screen w-full flex flex-col justify-center px-8 md:px-20 pointer-events-none">
      <div className={`pointer-events-auto w-full flex flex-col ${className || ''}`}>
        {children}
      </div>
    </section>
  );
};

// Background Overlay Component
export const BackgroundOverlay: React.FC = () => {
  return (
    <div className="w-full h-full pointer-events-none overflow-hidden select-none">
       <div className="absolute top-[20%] left-[5%] opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-black text-white leading-none font-display">01</h1>
       </div>
       <div className="absolute top-[120%] right-[5%] opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-black text-white leading-none font-display">02</h1>
       </div>
       <div className="absolute top-[220%] left-[10%] opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-black text-white leading-none font-display">03</h1>
       </div>
       <div className="absolute top-[320%] right-[10%] opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-black text-white leading-none font-display">04</h1>
       </div>
       <div className="absolute top-[420%] left-[5%] opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-black text-white leading-none font-display">05</h1>
       </div>
       <div className="absolute top-[520%] right-[5%] opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-black text-white leading-none font-display">06</h1>
       </div>
    </div>
  );
};

export const ForegroundOverlay: React.FC = () => {
  const scroll = useScroll();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null); 
  const section6Ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const scrollOffset = scroll.offset;

    // Trigger Points for 6 Sections (0.0, 0.2, 0.4, 0.6, 0.8, 1.0)
    const calculateOpacity = (target: number, range: number = 0.12) => {
      const dist = Math.abs(scrollOffset - target);
      return Math.max(0, 1 - dist / range);
    };

    // 1. Hero Section (Target: 0.0)
    if (heroContentRef.current) {
      const op = Math.max(0, 1 - scrollOffset / 0.15);
      heroContentRef.current.style.opacity = String(op);
      heroContentRef.current.style.transform = `translateY(${scrollOffset * -200}px)`;
      heroContentRef.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
    }

    // 2. Tech Section (Target: 0.2)
    if (section2Ref.current) {
      const op = calculateOpacity(0.2);
      section2Ref.current.style.opacity = String(op);
      const x = (0.2 - scrollOffset) * 500;
      section2Ref.current.style.transform = `translateX(${x}px)`;
      section2Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
    }

    // 3. Materials Section (Target: 0.4)
    if (section3Ref.current) {
      const op = calculateOpacity(0.4);
      section3Ref.current.style.opacity = String(op);
      const x = (scrollOffset - 0.4) * 500;
      section3Ref.current.style.transform = `translateX(${x}px)`;
      section3Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
    }

    // 4. Smart Core Section (Target: 0.6)
    if (section4Ref.current) {
      const op = calculateOpacity(0.6);
      section4Ref.current.style.opacity = String(op);
      const y = (0.6 - scrollOffset) * 400;
      section4Ref.current.style.transform = `translateY(${y}px)`;
      section4Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
    }

    // 5. New Section: Digital Coach (Target: 0.8)
    if (section5Ref.current) {
      const op = calculateOpacity(0.8);
      section5Ref.current.style.opacity = String(op);
      const x = (0.8 - scrollOffset) * 500; // Slide right to left (since aligned right)
      section5Ref.current.style.transform = `translateX(${x}px)`;
      section5Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
    }

    // 6. CTA Section (Target: 1.0)
    if (section6Ref.current) {
      // Visible from 0.9 to 1.0
      const op = scroll.range(0.9, 0.1); 
      section6Ref.current.style.opacity = String(op);
      const s = 0.8 + (0.2 * op);
      section6Ref.current.style.transform = `scale(${s})`;
      section6Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
    }
  });

  return (
    <div className="w-full text-white">
      {/* Section 1: Hero */}
      <Section className="items-start">
        <div ref={heroContentRef} className="w-full md:w-2/3 z-10 will-change-transform">
          <div className="overflow-hidden py-4 -my-4">
             <h1 className="hero-text text-8xl md:text-[10rem] font-display font-black text-white leading-[0.85] tracking-tighter mb-4 pt-4">
               GRAVITY <br/> 
               <span className="text-brand-orange">DEFIED</span>
             </h1>
          </div>
          
          <p className="hero-text text-xl text-gray-400 font-medium mb-10 max-w-md leading-relaxed">
            Engineered for the players who don't just play the game, they change it.
          </p>
          
          <div className="hero-text flex flex-col sm:flex-row gap-6">
            <button className="bg-brand-orange text-white px-10 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              Shop Collection
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                 <svg className="w-4 h-4 text-white group-hover:text-brand-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <span className="font-bold text-sm uppercase tracking-wide text-gray-300 group-hover:text-white">Watch Film</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 2: Technology (Aero Skin) - Right Aligned */}
      <Section className="items-end text-right">
        <div ref={section2Ref} className="w-full md:w-1/2 flex flex-col items-end will-change-transform">
          <div className="inline-block bg-brand-orange/20 border border-brand-orange/30 px-4 py-2 rounded-full mb-4">
             <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Tech Specs</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-6 leading-none">
            AERO <br/> SKIN
          </h2>
          <p className="text-xl text-gray-400 max-w-md mb-10 font-medium">
            Proprietary micro-texture surface for ultimate control in high-velocity situations.
          </p>
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
             <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl hover:border-brand-orange/50 transition-colors">
                <div className="text-4xl font-display font-black text-white mb-1">98<span className="text-xl text-brand-orange">%</span></div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Grip Retention</div>
             </div>
             <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl hover:border-brand-orange/50 transition-colors">
                <div className="text-4xl font-display font-black text-white mb-1">100<span className="text-xl text-brand-orange">X</span></div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Durability</div>
             </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Materials - Left Aligned */}
      <Section className="items-start">
        <div ref={section3Ref} className="w-full md:w-1/2 relative z-10 will-change-transform">
          <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-10 leading-none">
            NANO <br/> WEAVE
          </h2>
           <ul className="space-y-8">
              {[
                  { title: "Composite Shell", desc: "Moisture-wicking microfiber for dry grip." },
                  { title: "Nylon Core", desc: "Precision wound for consistent bounce." },
                  { title: "Butyl Bladder", desc: "Maximum air retention technology." }
              ].map((item, i) => (
                <li key={i} className="group cursor-pointer">
                    <div className="flex items-center justify-between border-b-2 border-white/10 pb-4 group-hover:border-brand-orange transition-colors duration-300">
                        <span className="text-2xl font-bold text-gray-200 group-hover:text-white transition-colors">{item.title}</span>
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 group-hover:bg-brand-orange group-hover:text-white transition-all">
                            {i + 1}
                        </span>
                    </div>
                    <p className="mt-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity h-0 group-hover:h-auto overflow-hidden">
                        {item.desc}
                    </p>
                </li>
              ))}
           </ul>
        </div>
      </Section>

      {/* Section 4: Smart Core - Left Aligned */}
      <Section className="items-start text-left">
        <div ref={section4Ref} className="w-full md:w-1/2 flex flex-col items-start relative z-10 will-change-transform">
          <div className="inline-block bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-4">
             <span className="text-white font-bold text-xs uppercase tracking-widest">Internal Tech</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-8 leading-none">
            SMART <br/> <span className="text-stroke-orange">CORE</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-md mb-10 font-medium">
             Embedded sensors track spin rate, arc depth, and velocity in real-time. Syncs with the BasketFlow App.
          </p>
          
          <div className="w-full max-w-md space-y-4">
            {[
              { label: "Bluetooth 5.0", value: "Connected" },
              { label: "Battery Life", value: "50 Hours" },
              { label: "Latency", value: "< 10ms" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-orange/40 transition-colors w-full">
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                 <span className="text-lg font-display font-bold text-brand-orange">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

       {/* Section 5: Digital Coach - Right Aligned (UPDATED) */}
       <Section className="items-end text-right">
        <div ref={section5Ref} className="w-full md:w-1/2 flex flex-col items-end relative z-10 will-change-transform">
          <div className="inline-block bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-4">
             <span className="text-white font-bold text-xs uppercase tracking-widest">App Ecosystem</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-8 leading-none">
            DIGITAL <br/> <span className="text-brand-orange">COACH</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-md mb-10 font-medium">
             Unlock the full potential of your game. Access 500+ interactive drills, heatmap analytics, and compete on the global leaderboard.
          </p>
          
          <div className="space-y-6 w-full max-w-md">
             {/* New Analytics Card replaces previous icons */}
             <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group text-left">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg className="w-24 h-24 text-brand-orange" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                      <div className="text-xs font-bold text-brand-orange uppercase tracking-widest">Live Telemetry</div>
                   </div>
                   <div className="text-2xl font-display font-bold text-white mb-6">SESSION ANALYTICS</div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                         <span className="text-gray-400 text-sm">Shot Arc</span>
                         <span className="text-white font-mono font-bold">48.2°</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                         <span className="text-gray-400 text-sm">Release Time</span>
                         <span className="text-white font-mono font-bold">0.45s</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-gray-400 text-sm">Rotation</span>
                         <span className="text-white font-mono font-bold">2.4 Hz</span>
                      </div>
                   </div>
                </div>
             </div>

             <button className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center gap-2">
                Download App
             </button>
          </div>
        </div>
      </Section>

      {/* Section 6: CTA */}
      <Section className="items-center text-center">
        <div ref={section6Ref} className="max-w-4xl relative mx-auto will-change-transform">
          <h2 className="text-7xl md:text-9xl font-display font-black text-white mb-8 leading-[0.8]">
            BECOME <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-orange to-red-600">LEGEND</span>
          </h2>
          <button className="bg-white text-black px-16 py-6 rounded-full font-black text-xl hover:bg-brand-orange hover:text-white transition-colors shadow-2xl hover:shadow-orange-500/40 transform hover:-translate-y-1">
            PRE-ORDER NOW - ₹4,999
          </button>
        </div>
      </Section>
    </div>
  );
};