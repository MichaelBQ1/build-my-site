import React, { useState, useEffect, useRef } from 'react';

const BandSiteDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [typedText, setTypedText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const fullText = "Вся Соль в твоих наушниках.";
  
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor Trail Effect
  useEffect(() => {
    const canvas = cursorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      points.push({ x: mouse.x, y: mouse.y, age: 0 });
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Limit to ~20 particles in the trail as requested
      points = points.filter(p => p.age < 20);
      
      points.forEach(p => {
        p.age += 1;
        const opacity = 1 - p.age / 20;
        // Size from 8px to 4px as requested
        const size = Math.max(4, 8 - (p.age * 0.2)); 
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 170, ${opacity * 0.5})`;
        ctx.fill();
        
        // Slight glow for extra aesthetics
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 255, 170, 0.4)';
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Floating Particles Background (50-70 particles)
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; s: number; c: string; v: number; drift: number }[] = [];
    const colors = ['#00ffaa', '#ff00ff', '#ffffff'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const count = 70; 
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          s: Math.random() * 3 + 2, // 2-5px size
          c: colors[Math.floor(Math.random() * colors.length)],
          v: Math.random() * 0.4 + 0.1, // Slow movement
          drift: (Math.random() - 0.5) * 0.2 // Random side shift
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.v; // Movement up
        p.x += p.drift + Math.sin(p.y / 100) * 0.2; // Sideways drift
        
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.15; // Low transparency
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const navItems = [
    { id: 'main', label: 'Главная' },
    { id: 'music', label: 'Музыка' },
    { id: 'about', label: 'Группа' },
  ];

  const gigs = [
    { date: "14 сентября 2025", place: "Смарт Парк Дельфин", city: "Воронеж" },
    { date: "5 декабря 2025", place: "Артель", city: "Воронеж" }
  ];

  const members = [
    { 
      name: "Губарев Елисей", 
      role: "басист",
      icon: "🎸",
      img: "https://drive.google.com/uc?export=view&id=1MbB8hjuGJhUPJjF4xYOW98-Aj33tRR23"
    },
    { 
      name: "Соловьев Даниил", 
      role: "вокалист, гитарист",
      icon: "🎸",
      img: "https://drive.google.com/uc?export=view&id=1X1Z8hjuGJhUPJjF4xYOW98-Aj33tRR23"
    },
    { 
      name: "Елисеев Андрей", 
      role: "барабанщик",
      icon: "🥁",
      img: "https://drive.google.com/uc?export=view&id=1S0iYDaYWJkjoBpB5ROvODmERowa2XoBd"
    },
    { 
      name: "Шевченко Даниил", 
      role: "гитарист",
      icon: "🎸",
      img: "https://drive.google.com/uc?export=view&id=1XyZ8hjuGJhUPJjF4xYOW98-Aj33tRR23"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020005] text-white selection:bg-[#00ffaa] selection:text-black relative">
      {/* Canvas Layer Effects */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 pointer-events-none z-[-2]" />
      <canvas ref={cursorCanvasRef} className="fixed inset-0 pointer-events-none z-[100]" />
      
      {/* Visual Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

      {/* Background Gradient Layers with Parallax */}
      <div className="fixed inset-0 pointer-events-none z-[-3] overflow-hidden">
        <div 
          className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_15%_25%,#2a0055_0%,transparent_60%)] will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
        <div 
          className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_85%_75%,#0a2840_0%,transparent_60%)] will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
        <div 
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,#150025_0%,transparent_70%)] opacity-50 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-black tracking-tighter uppercase font-heading group cursor-pointer" onClick={() => setActiveTab('main')}>
              Вся <span className="text-[#00ffaa] italic glitch-hover transition-all duration-300">Соль</span>
            </div>
            <div className="flex items-end gap-1.5 h-6">
              {[0.4, 0.7, 1.2, 0.5, 0.9, 0.3, 1.0, 0.6].map((d, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-[#00ffaa] visualizer-bar rounded-full shadow-[0_0_10px_#00ffaa]" 
                  style={{ '--duration': `${d}s` } as React.CSSProperties}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-xs font-black uppercase tracking-[0.3em] transition-all relative py-2 group ${
                  activeTab === item.id ? 'text-[#00ffaa] neon-text-lime' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#00ffaa] transition-all duration-300 ${activeTab === item.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
              </button>
            ))}
          </div>
          <button className="md:hidden text-[#00ffaa]">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </nav>

      <main className="pt-24 relative">
        {activeTab === 'main' && (
          <section className="animate-in fade-in duration-1000">
            {/* Hero Section */}
            <div className="relative h-[90vh] flex flex-col md:flex-row items-center justify-center overflow-hidden px-6">
              <div 
                className="absolute top-20 right-[10%] w-48 h-48 border-2 border-[#ff00ff]/20 rounded-full animate-bounce duration-[5000ms]"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
              ></div>
              <div 
                className="absolute bottom-10 left-[5%] w-32 h-32 border-2 border-[#00d4ff]/20 rotate-45 animate-pulse"
                style={{ transform: `translateY(${scrollY * -0.08}px)` }}
              ></div>

              <div className="relative z-10 text-center md:text-left md:w-1/2">
                <h1 className="text-7xl md:text-[11rem] font-black mb-4 tracking-tighter uppercase leading-[0.8] glitch-hover">
                  Тот самый <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffaa] via-[#00d4ff] to-[#ff00ff] neon-text-lime">Драйв.</span>
                </h1>
                <div className="h-8 md:h-12 flex items-center justify-center md:justify-start">
                   <p className="text-xl md:text-3xl text-[#00ffaa] font-mono tracking-tighter neon-text-lime font-bold">
                    {typedText}<span className="animate-pulse">_</span>
                   </p>
                </div>
                
                <div className="mt-14 flex flex-col sm:flex-row gap-8 justify-center md:justify-start">
                  <button onClick={() => setActiveTab('music')} className="group relative bg-[#00ffaa] text-black px-14 py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all animate-pulse-glow overflow-hidden shadow-[0_0_30px_rgba(0,255,170,0.5)]">
                    <span className="relative z-10">Врубить звук</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  </button>
                  <button onClick={() => setActiveTab('about')} className="border-2 border-white/20 hover:border-[#ff00ff] text-white px-14 py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all bg-white/5 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]">
                    О группе
                  </button>
                </div>
              </div>

              <div className="hidden md:flex md:w-1/2 justify-center items-center relative py-20">
                <div className="relative w-96 h-96 group">
                  <div className="absolute inset-0 bg-[#00ffaa]/30 rounded-full blur-[80px] animate-pulse"></div>
                  <div className="absolute inset-0 bg-black rounded-full border-4 border-[#1a0033] shadow-[0_0_50px_rgba(0,255,170,0.2)] animate-[spin_8s_linear_infinite] overflow-hidden group-hover:animate-[spin_3s_linear_infinite] transition-all">
                    {[...Array(15)].map((_, i) => (
                      <div key={i} className="absolute inset-0 rounded-full border border-white/5" style={{ margin: `${i * 10}px` }}></div>
                    ))}
                    <div className="absolute inset-[30%] bg-gradient-to-br from-[#ff4500] to-[#ff00ff] rounded-full flex items-center justify-center text-center p-4">
                      <div className="text-[12px] font-black text-black leading-tight uppercase tracking-tighter">
                        Вся Соль<br/>Pure Salt<br/>2026
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-[48.5%] bg-black rounded-full shadow-inner z-10 border border-white/10"></div>
                </div>
              </div>
            </div>
            
            {/* Gigs Section */}
            <div className="relative bg-[#020005]/80 py-48 overflow-hidden">
              <div className="absolute inset-0 skewed-bg bg-gradient-to-r from-[#1a0033] to-[#0a1020] z-[-1] opacity-60"></div>
              <div className="max-w-7xl mx-auto px-6 unskew">
                <div className="mb-12">
                   <p className="text-[#00ffaa] font-black uppercase tracking-[0.4em] mb-4 text-center md:text-left neon-text-lime italic">Мы играли здесь</p>
                   <div className="flex items-end justify-between">
                     <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter glitch-hover">СОСТОЯВШИЕСЯ <br/><span className="text-[#00ffaa] neon-text-lime">Концерты</span></h2>
                     <div className="hidden md:block h-2 w-64 bg-gradient-to-r from-[#00ffaa] to-transparent mb-6"></div>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {gigs.map((gig, i) => (
                    <div key={i} className="group relative bg-zinc-900/40 p-12 rounded-[3rem] border border-white/5 hover:border-[#ff00ff]/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,0,255,0.15)]">
                      <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#ff00ff] text-black px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_20px_#ff00ff]">
                        {gig.city}
                      </div>
                      <span className="text-[#00ffaa] text-xl font-black uppercase tracking-[0.4em] mb-4 block neon-text-lime">{gig.date}</span>
                      <h3 className="text-4xl font-black text-white leading-tight uppercase">{gig.place}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'music' && (
          <section className="min-h-[80vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-6 py-20 animate-in slide-in-from-right-20 duration-700">
            <div className="mb-12 text-center">
              <p className="text-[#00ffaa] font-black uppercase tracking-[0.3em] mb-4 neon-text-lime">Слушай нас на всех площадках</p>
              <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
                Вся <span className="text-[#ff00ff] neon-text-fuchsia italic">Соль</span> <br/>
                <span className="text-zinc-800">в твоих ушах</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              <div className="relative group p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc00] to-[#ff00ff] blur-[30px] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]"></div>
                <a 
                  href="https://music.yandex.ru/artist/23517455" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative h-full flex items-center gap-6 bg-black border-4 border-[#ffcc00] p-10 rounded-[3rem] hover:scale-[1.05] transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  <div className="relative w-20 h-20 bg-[#ffcc00] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_20px_#ffcc00]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px] mb-1">Слушать на</div>
                    <h3 className="text-2xl font-black text-[#ffcc00] uppercase tracking-tighter">Яндекс.Музыке</h3>
                  </div>
                </a>
              </div>

              <div className="relative group p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#00ffaa] blur-[30px] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]"></div>
                <a 
                  href="https://vk.com/artist/vsyasol" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative h-full flex items-center gap-6 bg-black border-4 border-[#00d4ff] p-10 rounded-[3rem] hover:scale-[1.05] transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  <div className="relative w-20 h-20 bg-[#00d4ff] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_20px_#00d4ff]">
                    <span className="font-black text-black text-2xl">VK</span>
                  </div>
                  <div>
                    <div className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px] mb-1">Слушать на</div>
                    <h3 className="text-2xl font-black text-[#00d4ff] uppercase tracking-tighter">VK Музыка</h3>
                  </div>
                </a>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'about' && (
          <section className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-20 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start mb-24">
              <div className="relative">
                 <div className="absolute -top-10 -left-10 w-full h-full bg-[#ff00ff]/10 skewed-bg z-[-1]"></div>
                 <h2 className="text-7xl font-black mb-14 uppercase tracking-tighter leading-none glitch-hover text-white">В чем <br/><span className="text-[#00ffaa] neon-text-lime">Соль?</span></h2>
                 
                 <div className="space-y-12">
                   <div>
                     <h3 className="text-[#00ffaa] text-xl font-black uppercase tracking-widest mb-4 italic">1. Как всё начиналось</h3>
                     <p className="text-zinc-300 text-lg leading-relaxed font-light">
                       Группа «Вся соль» зародилась летом 2024 года. С того момента коллектив прошёл через серьёзные изменения: менялись люди, формат, звучание и подход к музыке. За это время было два состава, а нынешний — третий — стал самым удачным и устойчивым.
                     </p>
                   </div>
                   
                   <div>
                     <h3 className="text-[#00ffaa] text-xl font-black uppercase tracking-widest mb-4 italic">2. Рождение текущего звучания</h3>
                     <p className="text-zinc-300 text-lg leading-relaxed font-light">
                       Именно в текущем составе группа обрела своё настоящее лицо. Музыканты нашли общий язык, единое видение и то самое звучание, которое сегодня определяет «Всю соль». На протяжении последнего года группа активно занимается созданием собственного материала: пишет и записывает авторские песни, постепенно формируя репертуар. Треки выходят и размещаются на всех основных музыкальных площадках.
                     </p>
                   </div>
                   
                   <div>
                     <h3 className="text-[#00ffaa] text-xl font-black uppercase tracking-widest mb-4 italic">3. От Redwood к Вся Соль</h3>
                     <p className="text-zinc-300 text-lg leading-relaxed font-light">
                       До появления названия «Вся соль» группа существовала под именем Redwood. Это был более ранний этап, с совершенно другим составом и настроением. В период Redwood коллектив дал три концерта: в смарт-парке «Дельфин», в «Чайке», и в Липецке. Однако со временем стало понятно, что группа переросла тот формат. Сегодня «Вся соль» — это самостоятельный проект, который развивается и честно рассказывает свои истории через музыку.
                     </p>
                   </div>
                 </div>
              </div>
              <div className="relative group lg:sticky lg:top-32">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00ffaa] via-[#00d4ff] to-[#ff00ff] opacity-30 blur-3xl group-hover:opacity-60 transition-opacity"></div>
                <img 
                  src="https://drive.google.com/uc?export=view&id=1jKj9X-qY1zXoW98-Aj33tRR23" 
                  className="rounded-[4rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 relative z-10 rotate-3 group-hover:rotate-0 border-2 border-white/10 w-full object-cover" 
                  alt="Band Session"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            </div>

            <div className="mt-40 mb-32">
              <h2 className="text-6xl font-black mb-16 uppercase tracking-tighter italic text-center md:text-left text-white">Состав <span className="text-[#00ffaa] neon-text-lime italic">Группы</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
                {members.map((member, i) => (
                  <div key={i} className="flex flex-col items-center group transition-all duration-300 hover:scale-105">
                    <div className="w-[200px] h-[200px] rounded-full border-3 border-[#00ffaa] shadow-[0_0_15px_rgba(0,255,170,0.5)] overflow-hidden mb-6 group-hover:shadow-[0_0_30px_rgba(0,255,170,1)] transition-shadow duration-300 flex items-center justify-center bg-zinc-900">
                      <img 
                        src={member.img} 
                        alt={member.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a0033&color=00ffaa&size=200&bold=true`;
                        }}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1 uppercase tracking-tighter">{member.name}</div>
                      <div className="text-[#00ffaa] text-sm font-black uppercase tracking-[0.2em] neon-text-lime flex items-center justify-center gap-2">
                        <span style={{ fontSize: '18px' }}>{member.icon}</span> {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-20">
               <a 
                 href="https://music.yandex.ru/artist/23517455"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group relative bg-[#00ffaa] text-black px-16 py-7 rounded-2xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all animate-pulse-glow overflow-hidden shadow-[0_0_30px_rgba(0,255,170,0.5)] flex items-center gap-4"
               >
                 <span className="relative z-10">Слушать нас</span>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="relative z-10">
                   <path d="M8 5V19L19 12L8 5Z" />
                 </svg>
                 <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
               </a>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black border-t border-white/5 py-40 relative overflow-hidden">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,#2a0040_0%,transparent_70%)] opacity-40 z-[-1]"></div>
         
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-6xl font-black uppercase font-heading mb-4 tracking-tighter">Вся <span className="text-[#00ffaa] neon-text-lime">Соль</span></div>
              <div className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em]">Честная музыка без примесей. 2026.</div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-6">
                 <a 
                   href="https://vk.com/samayakrutayarockgruppa" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-sm hover:bg-[#00ffaa] hover:text-black transition-all cursor-pointer shadow-lg"
                 >
                   VK
                 </a>
                 <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-sm hover:bg-[#00ffaa] hover:text-black transition-all cursor-pointer shadow-lg">
                   TG
                 </div>
              </div>
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#00ffaa] to-transparent"></div>
              <div className="text-zinc-400 font-black text-[10px] tracking-widest uppercase">© 2026 VS SOL BAND</div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default BandSiteDemo;