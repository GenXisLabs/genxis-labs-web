import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Brain, Code, Cloud, LineChart, Mail, MapPin, Phone, ExternalLink, Quote, Users, Zap, Award, ArrowRight, Moon, Sun, Bot, Twitter, Linkedin, Github } from 'lucide-react';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import Button from '../components/Button';

// --- CountUp Animation Component ---
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(ease * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

// --- Tech Wave Background Component ---
const TechWaveBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let time = 0;

    const lines = [
      { yOffset: 0, amplitude: 50, frequency: 0.002, speed: 0.01, color: isDark ? 'rgba(0, 161, 255, 0.3)' : 'rgba(0, 161, 255, 0.15)', width: 2 },
      { yOffset: 20, amplitude: 70, frequency: 0.0015, speed: 0.015, color: isDark ? 'rgba(0, 214, 251, 0.3)' : 'rgba(0, 214, 251, 0.15)', width: 2 },
      { yOffset: -20, amplitude: 30, frequency: 0.003, speed: 0.008, color: isDark ? 'rgba(0, 161, 255, 0.2)' : 'rgba(0, 161, 255, 0.1)', width: 1 },
      { yOffset: 40, amplitude: 40, frequency: 0.0025, speed: 0.02, color: isDark ? 'rgba(0, 214, 251, 0.2)' : 'rgba(0, 214, 251, 0.1)', width: 1 },
    ];

    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.2 - 0.1,
      speedY: Math.random() * 0.2 - 0.1,
      opacity: Math.random() * 0.4 + 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      lines.forEach(line => {
        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        
        for (let x = 0; x <= w; x += 5) {
          const y = (h / 2) + line.yOffset + 
                    Math.sin(x * line.frequency + time * line.speed) * line.amplitude +
                    Math.sin(x * line.frequency * 0.5 + time * line.speed * 0.5) * (line.amplitude * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 161, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />;
};

// --- Modern Reusable Components ---
const SectionHeading = ({ badge, title, subtitle, dark = false, align = 'center' }) => (
  <div className={`mb-20 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <Reveal>
      {badge && (
        <span className={`inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-6 ${dark ? 'bg-white/10 text-[#00d6fb] border border-white/10' : 'bg-blue-50 dark:bg-blue-900/20 text-[#00a1ff] dark:text-[#00d6fb] border border-blue-100 dark:border-blue-800'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-[#00d6fb]' : 'bg-[#00a1ff] dark:bg-[#00d6fb]'}`}></span>
          {badge}
        </span>
      )}
      <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight ${dark ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {title}
      </h2>
      <p className={`text-lg md:text-xl ${dark ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'} leading-relaxed font-light`}>
        {subtitle}
      </p>
    </Reveal>
  </div>
);

// --- Main App Component ---
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
    { name: 'Team', href: '/team' },
  ];

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white font-sans selection:bg-[#00d6fb] selection:text-white overflow-x-hidden transition-colors duration-500">

        {/* --- Floating Modern Navigation --- */}
        <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
          <nav className={`
            flex items-center justify-between px-6 md:px-8 py-3 
            transition-all duration-500 ease-in-out
            ${scrolled 
              ? 'w-[95%] md:w-[85%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full' 
              : 'w-full bg-transparent border-transparent'
            }
          `}>
            <a href="/" className="flex items-center gap-2 z-10 group">
              <img src="logo_with_text.png" alt="GenXis Labs Logo" className="h-8 md:h-10 transform group-hover:scale-105 transition-transform duration-300" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <div className={`flex items-center gap-1 px-4 py-1.5 rounded-full ${scrolled ? 'bg-gray-100/50 dark:bg-gray-800/50' : 'bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-white/40 dark:border-white/10'}`}>
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => {
                        // if it's an internal section link, scroll smoothly
                        if (link.href.startsWith('#')) {
                            handleScrollToSection(e, link.href);
                        } else {
                            e.preventDefault();
                            window.location.href = link.href;
                        }
                    }}
                    className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00a1ff] dark:hover:text-[#00a1ff] rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
               <button 
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none"
                  aria-label="Toggle Dark Mode"
               >
                 {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               <Button variant="primary" className="!px-6 !py-2.5 !h-10 !text-xs uppercase !tracking-wider" onClick={(e) => handleScrollToSection(e, '#contact')}>
                 Get Started
               </Button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300"
               >
                 {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
               </button>
              <button className="z-50 text-gray-900 dark:text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-8 text-2xl font-light">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                    // if it's an internal section link, scroll smoothly
                    if (link.href.startsWith('#')) {
                        handleScrollToSection(e, link.href);
                    } else {
                        e.preventDefault();
                        window.location.href = link.href;
                    }
                }}
                className="text-gray-900 dark:text-white hover:text-[#00a1ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" onClick={(e) => handleScrollToSection(e, '#contact')}>
              Get in Touch
            </Button>
          </div>
        </div>

        {/* --- Hero Section --- */}
        <header id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#fafafa] dark:bg-[#0B1120] transition-colors duration-500">
          <TechWaveBackground isDark={isDarkMode} />
          
          {/* Soft gradient orb for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />

          <div className="container mx-auto px-6 md:px-12 relative z-10 pt-12">
            <Reveal>
              <div className="max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800/50 border border-blue-100 dark:border-blue-900 text-[#00a1ff] text-xs font-bold uppercase tracking-widest mb-10 shadow-sm animate-fade-in-up">
                  <span className="flex h-2 w-2 relative justify-center items-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a1ff] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a1ff]"></span>
                  </span>
                  Robotics, AI & Software Innovation Lab
                </div>
                
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-8 text-gray-900 dark:text-white transition-colors duration-500">
                  Shaping Tomorrow <br/>
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00a1ff] via-[#00d6fb] to-[#00a1ff] pb-2">
                     Through Intelligence.
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light transition-colors duration-500">
                  GenXis Labs engineers the bridge between human potential and artificial intelligence, building robust solutions for the modern enterprise.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Button variant="primary" className="!h-14 !px-10 !text-base shadow-blue-500/20" onClick={(e) => handleScrollToSection(e, '#services')}>
                    Explore Solutions <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="!h-14 !px-10 !text-base bg-white/60 dark:bg-black/40 backdrop-blur-sm" onClick={(e) => handleScrollToSection(e, '#contact')}>
                    Contact Our Team
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        {/* --- About Section --- */}
        <section id="about" className="py-24 md:py-32 bg-white dark:bg-[#0B1120] relative transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <Reveal className="relative">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-blue-900/10">
                   <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply z-10"></div>
                   <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Team"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
                
                {/* Floating Stat Card - Modern Glass Effect */}
                <div className="absolute -bottom-10 -right-10 md:right-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-white/20 dark:border-gray-700 z-20 max-w-xs animate-bounce-slow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-[#00a1ff] rounded-2xl">
                      <Award size={28} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Experience</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Excellence</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Delivering enterprise-grade solutions with a focus on scalability and security.
                  </p>
                </div>
                
                {/* Pattern Dots */}
                <div className="absolute -top-12 -left-12 opacity-20 dark:opacity-10">
                   <div className="w-48 h-48" style={{backgroundImage: `radial-gradient(${isDarkMode ? '#00d6fb' : '#00a1ff'} 2px, transparent 2px)`, backgroundSize: '24px 24px'}}></div>
                </div>
              </Reveal>

              <div>
                <SectionHeading 
                  align="left"
                  badge="Who We Are"
                  title="Engineering the Future of AI & Robotics"
                  subtitle="We don't just write code; we architect systems that learn, adapt, and grow with modern technologies."
                />
                
                <div className="space-y-8">
                  <Reveal delay={200} className="flex gap-6 group">
                    <div className="mt-1 w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#00a1ff] flex-shrink-0 group-hover:bg-[#00a1ff] group-hover:text-white transition-colors duration-300">
                      <span className="font-bold text-lg">01</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Research Driven</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Our labs are constantly exploring the bleeding edge of AI to bring you tested, proven innovations.</p>
                    </div>
                  </Reveal>
                  <Reveal delay={400} className="flex gap-6 group">
                    <div className="mt-1 w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#00a1ff] flex-shrink-0 group-hover:bg-[#00a1ff] group-hover:text-white transition-colors duration-300">
                      <span className="font-bold text-lg">02</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Human Centric</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Technology should empower people. We design interfaces that are intuitive and enhance human capability.</p>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={600} className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 grid grid-cols-3 gap-8">
                  <div>
                     <h4 className="text-4xl font-extrabold text-[#00a1ff] tracking-tight">
                       <CountUp end={2} suffix="+" />
                     </h4>
                     <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold uppercase mt-2 tracking-wider">Years R&D</p>
                  </div>
                  <div>
                     <h4 className="text-4xl font-extrabold text-[#00a1ff] tracking-tight">
                       <CountUp end={15} suffix="+" />
                     </h4>
                     <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold uppercase mt-2 tracking-wider">Projects</p>
                  </div>
                  <div>
                     <h4 className="text-4xl font-extrabold text-[#00a1ff] tracking-tight">
                       <CountUp end={100} suffix="%" />
                     </h4>
                     <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold uppercase mt-2 tracking-wider">Commitment</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* --- Services Section --- */}
        <section id="services" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              badge="Our Capabilities"
              title="Comprehensive Tech Solutions"
              subtitle="From the cloud to the edge, we provide the full stack of services needed to modernize your enterprise."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Bot />, title: "Advanced Robotics", desc: "Autonomous systems, industrial automation, and smart physical interfaces." },
                { icon: <Brain />, title: "AI & ML", desc: "Custom neural networks and predictive modeling tailored to your data." },
                { icon: <Code />, title: "Software Dev", desc: "Full-cycle web and mobile application development with scalable architecture." },
                { icon: <Cloud />, title: "Cloud Ops", desc: "Scalable infrastructure and automated CI/CD pipelines for high availability." },
                { icon: <LineChart />, title: "Strategy", desc: "Digital transformation consulting and roadmapping for the future." }
              ].map((s, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="group relative bg-white dark:bg-gray-800/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:border-[#00a1ff]/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-white mb-8 group-hover:bg-[#00a1ff] group-hover:text-white transition-all duration-300">
                      {React.cloneElement(s.icon, { size: 32 })}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{s.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                      {s.desc}
                    </p>
                    <a href="#" className="inline-flex items-center text-sm font-bold text-[#00a1ff] group-hover:translate-x-2 transition-transform">
                      Learn more <ArrowRight size={16} className="ml-2" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- Why Choose Us (Dark Modern Gradient - Persists in Dark Mode) --- */}
        <section id="why-us" className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a1929] to-gray-900 z-0"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00a1ff]/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <Reveal>
                  <span className="text-[#00d6fb] font-bold tracking-widest uppercase text-sm mb-4 block">Why GenXis Labs?</span>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                    Harnessing AI for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d6fb] to-[#00a1ff]">Smarter Future</span>
                  </h2>
                  <p className="text-lg text-gray-400 mb-10 leading-relaxed font-light">
                    Our mission is to revolutionize business operations by integrating cutting-edge AI with traditional engineering disciplines. We streamline manual tasks and turn challenges into opportunities.
                  </p>
                  <Button variant="primary" className="shadow-none ring-2 ring-white/10 hover:ring-[#00a1ff]" onClick={(e) => handleScrollToSection(e, '#about')}>
                    Read Our Mission
                  </Button>
                </Reveal>
              </div>
              
              <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                 <div className="space-y-6 md:mt-12">
                   <Reveal delay={200} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                      <Users className="text-[#00d6fb] mb-6" size={40} />
                      <h3 className="text-xl font-bold text-white mb-3">Expert Team</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Highly skilled AI engineers and developers tackling the toughest challenges.</p>
                   </Reveal>
                   <Reveal delay={400} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                      <Award className="text-[#00d6fb] mb-6" size={40} />
                      <h3 className="text-xl font-bold text-white mb-3">Proven Results</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Measurable value delivery across multiple industries ensuring high ROI.</p>
                   </Reveal>
                 </div>
                 <div className="space-y-6">
                   <Reveal delay={300} className="bg-gradient-to-br from-[#00a1ff] to-[#00d6fb] p-8 rounded-[2rem] shadow-xl text-white">
                      <Zap className="text-white mb-6" size={40} />
                      <h3 className="text-xl font-bold mb-3">Cutting-Edge Tech</h3>
                      <p className="text-white/90 text-sm leading-relaxed">Latest engineering solutions for maximum efficiency and speed.</p>
                   </Reveal>
                   <Reveal delay={500} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                      <Quote className="text-[#00d6fb] mb-6" size={40} />
                      <h3 className="text-xl font-bold text-white mb-3">Client Focused</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Your success is our success. We build long-term partnerships.</p>
                   </Reveal>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Testimonials Section (Minimalist) - Commented out for future use --- */}
        {/*
        <section className="py-24 md:py-32 bg-white dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <SectionHeading title="Trusted by Visionaries" subtitle="We let our work... and our partners... speak for themselves." />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "GenXis Labs didn't just build software; they engineered a competitive advantage for us.", author: "Sarah Jenkins", role: "CTO, Nexus Financial" },
                { quote: "The level of technical expertise and professionalism exhibited by the team is unmatched.", author: "David Chen", role: "Ops Director, OmniLogistics" },
                { quote: "From concept to deployment, the process was transparent, agile, and incredibly effective.", author: "Marcus Thorne", role: "CEO, HealthVantage" }
              ].map((t, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-10 rounded-[2rem] hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <div key={star} className="w-2 h-2 rounded-full bg-[#00a1ff]"></div>)}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 font-medium">"{t.quote}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{t.author}</h4>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* --- Contact Section (Clean & Functional) --- */}
        <section id="contact" className="py-24 md:py-32 bg-[#fafafa] dark:bg-[#0B1120] transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12">
            <Reveal>
              <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 dark:shadow-black/20 overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="grid lg:grid-cols-2">
                  <div className="p-12 lg:p-16 bg-[#00a1ff] text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-6">Ready to start?</h3>
                      <p className="text-blue-100 mb-12 text-lg">Tell us about your project challenges and let's explore how our technology can help.</p>
                      
                      <div className="space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><MapPin size={20} /></div>
                          <p>100 Innovation Drive, San Francisco, CA</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Mail size={20} /></div>
                          <p>hello@genxislabs.com</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Phone size={20} /></div>
                          <p>+1 (555) 123-4567</p>
                        </div>
                      </div>
                    </div>
                    {/* Decoration */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  </div>

                  <div className="p-12 lg:p-16">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#00a1ff] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                          <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#00a1ff] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all" placeholder="john@company.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#00a1ff] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all" placeholder="How can we help?"></textarea>
                      </div>
                      <Button variant="primary" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Footer --- */}
        <Footer />
      </div>
    </div>
  );
}