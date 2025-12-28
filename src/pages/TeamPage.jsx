import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Phone, Linkedin, Twitter, Github, Globe, GraduationCap, ChevronRight, Moon, Sun, ArrowLeft, Users } from 'lucide-react';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import Footer from '../components/Footer';

// --- Team Data Configuration ---
const teamMembers = [
  {
    id: 1,
    name: "Nilum Mudaliarachchi",
    role: "Founder",
    degree: "B.Sc.(Hons) Computer Science and Eng, UoM",
    bio: "Pioneering researcher in swarm robotics with amazing leadership.",
    email: "nilum@genxis.lk",
    portfolio: "nilum.genxis.lk",
    image: "/team_imgs/nilumNew.jpg",
    social: { linkedin: "https://www.linkedin.com/in/nilum2002/", github: "https://github.com/nilum2002" }
  },
  {
    id: 2,
    name: "Tharusha Udana",
    role: "Founder",
    degree: "B.Sc.(Hons) Artificial Intelligence, UoM",
    bio: "Expert in neural network architectures and predictive modeling for enterprise scale.",
    email: "tharusha@genxis.lk",
    portfolio: "tharusha.genxis.lk",
    image: "/team_imgs/TharushaNew.jpg",
    social: { linkedin: "https://www.linkedin.com/in/tharushaudana/", github: "https://github.com/tharushaudana" }
  },
  {
    id: 3,
    name: "Udul Dewmina",
    role: "Co-Founder & Software Eng",
    degree: "B.Sc.(Hons) in Electronics & Telecommunication Engineering, UoM",
    bio: "Specializes in industrial automation and Robotics interface design for manufacturing.",
    email: "udul@genxis.lk",
    portfolio: "udul.genxis.lk",
    image: "/team_imgs/UdulNew.jpg",
    social: { linkedin: "https://www.linkedin.com/in/udul-dewmina-29b166311/", github: "https://github.com/KUDewmina" }
  },
  {
    id: 4,
    name: "Hiruna Malavipathirana",
    role: "Software Eng",
    degree: "B.Sc.(Hons) Computer Science and Eng, UoM",
    bio: "Full-stack architect focused on building scalable, secure cloud infrastructures.",
    email: "hiruna@genxis.lk",
    portfolio: "hiruna.genxis.lk",
    image: "/team_imgs/hirunaNew.jpg",
    social: { linkedin: "https://www.linkedin.com/in/hiruna-malavipathirana-b0904916a/", github: "https://github.com/Hirunahhm" }
  },
];

export default function TeamPage() {
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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white font-sans selection:bg-[#00d6fb] selection:text-white overflow-x-hidden transition-colors duration-500">
      
      {/* --- Navigation --- */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
        <nav className={`
          grid grid-cols-3 items-center px-6 md:px-8 py-3 
          transition-all duration-500 ease-in-out
          ${scrolled 
            ? 'w-[95%] md:w-[85%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full' 
            : 'w-full bg-transparent border-transparent'
          }
        `}>
          <a href="/" className="flex items-center gap-2 z-10 group justify-self-start">
             <img src="/logo_with_text.png" alt="GenXis Labs" className="h-8 md:h-10" />
          </a>

          <div className="flex items-center gap-4 justify-self-center">
             {/* Simple link back to home */}
             <a href="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#00a1ff] transition-colors">
               <ArrowLeft size={16} className="mr-1" /> Back to Home
             </a>
          </div>
          
          <div className="flex items-center gap-3 justify-self-end">
             <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none"
             >
               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             {/* <button className="md:hidden text-gray-900 dark:text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button> */}
          </div>
        </nav>
      </div>

      {/* --- Page Header --- */}
      <header className="pt-40 pb-20 px-6 relative overflow-hidden bg-gray-50 dark:bg-[#0F172A] transition-colors duration-500">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.4))] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00a1ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800/50 border border-blue-100 dark:border-blue-900 text-[#00a1ff] text-xs font-bold uppercase tracking-widest mb-8">
              <Users size={14} />
              <span>Meet The Minds</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
              The Architects of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a1ff] to-[#00d6fb]">Intelligence</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We are a collective of researchers, engineers, and visionaries united by a single mission: to build the future of Robotics and AI.
            </p>
          </Reveal>
        </div>
      </header>

      {/* --- Team Grid --- */}
      <section className="py-24 bg-white dark:bg-[#0B1120] transition-colors duration-500">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <Reveal key={member.id} delay={index * 100}>
                <div className="group relative bg-gray-50 dark:bg-gray-800/40 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-[#00a1ff]/30 dark:hover:border-[#00a1ff]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full">
                  
                  {/* Image Container */}
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110  group-hover:grayscale-0"
                    />
                    
                    {/* Floating Role Badge */}
                    <div className="absolute top-6 right-6 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-lg border border-white/20 dark:border-gray-700">
                      {member.role}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 relative flex-1 flex flex-col">
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                      <div className="flex items-center gap-2 text-[#00a1ff] text-sm font-medium mb-4">
                        <GraduationCap size={16} />
                        <span>{member.degree}</span>
                      </div>
                      
                      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed border-b border-gray-200 dark:border-gray-700 pb-6">
                        {member.bio}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#00a1ff]">
                            <Mail size={14} />
                          </div>
                          <span className="hover:text-[#00a1ff] transition-colors cursor-pointer">{member.email}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        {/* Portfolio Button */}
                        <a 
                          href= "/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 mb-6 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:border-[#00a1ff] hover:text-[#00a1ff] hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 group/btn"
                        >
                          <Globe size={16} className="group-hover/btn:animate-pulse" />
                          Visit Portfolio
                        </a>

                        {/* Social Links Row */}
                        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                          {member.social.linkedin && (
                            <a href={member.social.linkedin} className="text-gray-400 hover:text-[#00a1ff] transition-colors"><Linkedin size={18} /></a>
                          )}
                          {member.social.twitter && (
                            <a href={member.social.twitter} className="text-gray-400 hover:text-[#00a1ff] transition-colors"><Twitter size={18} /></a>
                          )}
                          {member.social.github && (
                            <a href={member.social.github} className="text-gray-400 hover:text-[#00a1ff] transition-colors"><Github size={18} /></a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Recruitment CTA --- */}
      <section className="py-24 bg-[#fafafa] dark:bg-[#0F172A] transition-colors duration-500">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <div className="bg-[#00a1ff] rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join the Architects of Tomorrow</h2>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                  We are always looking for exceptional talent in robotics, AI, and software engineering. 
                  If you're ready to solve the hardest problems in tech, we want to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
                    Contact Recruiting
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}