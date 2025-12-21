import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Brain, Code, Cloud, LineChart, Mail, MapPin, Phone, ExternalLink, Quote, Users, Zap, Award } from 'lucide-react';

// --- Particle Background Component ---
const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    // Responsive particle count
    const getParticleCount = () => Math.floor((w * h) / 15000);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 161, 255, 0.5)'; // Primary blue, semi-transparent
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connections first so they are behind particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 214, 251, ${0.2 - dist / 120 * 0.2})`; // Cyan, fading with distance
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

// --- Reusable Components ---
const SectionHeading = ({ badge, title, subtitle, dark = false }) => (
  <div className="mb-16 text-center max-w-3xl mx-auto">
    {badge && (
      <span className="inline-block py-1 px-3 rounded-full bg-cyan-50 text-[#00a1ff] text-sm font-semibold tracking-wider uppercase mb-4">
        {badge}
      </span>
    )}
    <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    <p className={`text-lg md:text-xl ${dark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
      {subtitle}
    </p>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1";
  const variants = {
    primary: "bg-gradient-to-r from-[#00a1ff] to-[#00d6fb] text-white hover:shadow-lg hover:shadow-cyan-500/30",
    outline: "bg-transparent border-2 border-[#00a1ff] text-[#00a1ff] hover:bg-[#00a1ff] hover:text-white",
    white: "bg-white text-gray-900 hover:shadow-lg"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Main App Component ---
export default function GenXisLabsSite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#00d6fb] selection:text-white">

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00a1ff] to-[#00d6fb] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">GenXis<span className="text-[#00a1ff]">.</span>Labs</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-[#00a1ff] transition-colors uppercase tracking-wider">
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="!px-6 !py-2.5 !text-sm">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden z-50 text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center gap-8 text-xl">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-900 hover:text-[#00a1ff]">
                {link.name}
              </a>
            ))}
            <Button variant="primary" onClick={() => setIsMenuOpen(false)}>
              Get in Touch
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ParticleNetwork />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#00a1ff] text-sm font-medium mb-8 animate-fade-in">
              <span className="flex h-2 w-2 relative justify-center items-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a1ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a1ff]"></span>
              </span>
              Leading the AI Revolution
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
              Shaping Tomorrow Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a1ff] to-[#00d6fb]">AI & Software</span> Innovation.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              GenXis Labs delivers cutting-edge software and artificial intelligence solutions that empower businesses to thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary">
                Explore Solutions <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
        {/* Abstract shape for visual interest */}
        <div className="absolute -right-64 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-100/40 to-blue-50/40 rounded-full blur-3xl -z-10"></div>
      </header>

      {/* --- About Section --- */}
      <section id="about" className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="GenXis Labs Team collaborating"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00a1ff]/20 to-transparent mix-blend-overlay"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-[#00a1ff] to-[#00d6fb] rounded-3xl -z-0 opacity-20"></div>
            </div>
            <div>
              <span className="text-[#00a1ff] font-semibold tracking-wider uppercase mb-4 block">About GenXis Labs</span>
              <h2 className="text-4xl font-bold mb-8 leading-tight">We bridge the gap between <br/>human potential and artificial intelligence.</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At GenXis Labs, we are more than just developers; we are visionaries, researchers, and strategists dedicated to pushing the boundaries of what's possible.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded on the principles of relentless innovation and customer-centricity, our R&D-focused approach ensures that every solution we build is not just current, but future-proof.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <h3 className="text-4xl font-bold text-[#00a1ff] mb-2">2+</h3>
                  <p className="text-gray-600 font-medium">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-[#00a1ff] mb-2">3+</h3>
                  <p className="text-gray-600 font-medium">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-[#00a1ff] mb-2">3</h3>
                  <p className="text-gray-600 font-medium">Core Specializations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading
            badge="Our Expertise"
            title="Intelligent Solutions for Modern Enterprises"
            subtitle="Leverage our deep technical expertise to transform your operations and unlock new growth opportunities."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain size={32} />,
                title: "AI & Machine Learning",
                description: "Predictive analytics, NLP models, and computer vision systems tailored to your data."
              },
              {
                icon: <Code size={32} />,
                title: "Custom Software",
                description: "Scalable, secure, and high-performance web and mobile applications built from scratch."
              },
              {
                icon: <Cloud size={32} />,
                title: "Cloud & Automation",
                description: "Seamless cloud migration and intelligent process automation to reduce operational overhead."
              },
              {
                icon: <LineChart size={32} />,
                title: "IT Consulting & Strategy",
                description: "Digital transformation roadmaps designed by industry veterans to guide your journey."
              }
            ].map((service, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 text-[#00a1ff] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#00a1ff] group-hover:to-[#00d6fb] group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section id="why-us" className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="text-[#00d6fb] font-semibold tracking-wider uppercase mb-4 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Harnessing AI for a <br/>Smarter Future</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our mission is to revolutionize business operations by integrating cutting-edge AI with traditional engineering disciplines. We streamline manual tasks, empower human talent, and turn everyday challenges into opportunities for growth and innovation.
              </p>
              <Button variant="primary">
                Learn About Our Mission
              </Button>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" alt="AI Future" className="w-full h-full object-cover opacity-50" />
               <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-gray-800 p-8 rounded-3xl border border-gray-800 hover:border-[#00a1ff] transition-colors duration-300 group">
                <div className="w-12 h-12 bg-gray-700/50 text-[#00d6fb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00a1ff] group-hover:text-white transition-all">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Expert Team</h3>
                <p className="text-gray-400 leading-relaxed">Highly skilled AI engineers, software developers, and supply chain experts ready to tackle your toughest challenges.</p>
             </div>
             <div className="bg-gray-800 p-8 rounded-3xl border border-gray-800 hover:border-[#00a1ff] transition-colors duration-300 group">
                <div className="w-12 h-12 bg-gray-700/50 text-[#00d6fb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00a1ff] group-hover:text-white transition-all">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Proven Results</h3>
                <p className="text-gray-400 leading-relaxed">Measurable value delivery across multiple industries and business sectors, ensuring ROI on every initiative.</p>
             </div>
             <div className="bg-gray-800 p-8 rounded-3xl border border-gray-800 hover:border-[#00a1ff] transition-colors duration-300 group">
                 <div className="w-12 h-12 bg-gray-700/50 text-[#00d6fb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00a1ff] group-hover:text-white transition-all">
                   <Zap size={24} />
                 </div>
                 <h3 className="text-xl font-bold mb-4 text-white">Cutting-Edge Technology</h3>
                 <p className="text-gray-400 leading-relaxed">Latest AI technologies and engineering solutions for maximum efficiency, keeping you ahead of the curve.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="py-24 md:py-32 bg-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5">
            <Brain size={600} className="mx-auto mt-20" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by Visionaries</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "GenXis Labs didn't just build software; they engineered a competitive advantage for us. Their AI integration was seamless.",
                author: "Sarah Jenkins",
                role: "CTO, Nexus Financial"
              },
              {
                quote: "The level of technical expertise and professionalism exhibited by the team is unmatched. They truly understand enterprise needs.",
                author: "David Chen",
                role: "Director of Operations, OmniLogistics"
              },
              {
                quote: "From concept to deployment, the process was transparent and agile. The final product exceeded our wildest expectations.",
                author: "Marcus Thorne",
                role: "CEO, HealthVantage"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm relative">
                <Quote size={40} className="text-blue-100 absolute top-8 right-8" />
                <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.author}</h4>
                  <p className="text-[#00a1ff]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading
                badge="Connect with Us"
                title="Ready to Innovate?"
                subtitle="Tell us about your project challenges and let's explore how our technology can help you overcome them."
              />
              <div className="space-y-8 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#00a1ff] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Headquarters</h4>
                    <p className="text-gray-600">100 Innovation Drive, Suite 500<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#00a1ff] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email Us</h4>
                    <p className="text-gray-600">hello@genxislabs.com<br/>partners@genxislabs.com</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#00a1ff] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567<br/>Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 md:p-12 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-[#00a1ff] focus:ring-[#00a1ff] transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-[#00a1ff] focus:ring-[#00a1ff] transition-colors" placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-[#00a1ff] focus:ring-[#00a1ff] transition-colors">
                    <option>General Inquiry</option>
                    <option>AI Solutions</option>
                    <option>Software Development</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-[#00a1ff] focus:ring-[#00a1ff] transition-colors" placeholder="Tell us about your project..."></textarea>
                </div>
                <Button variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00a1ff] to-[#00d6fb] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">GenXis<span className="text-[#00a1ff]">.</span>Labs</span>
              </a>
              <p className="text-lg max-w-sm mb-8">
                Pioneering the future through intelligent software and AI innovations. Building tomorrow, today.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Solutions</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-[#00a1ff] transition-colors">AI & Machine Learning</a></li>
                <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Custom Development</a></li>
                <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Cloud Services</a></li>
                <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Data Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="hover:text-[#00a1ff] transition-colors">About Us</a></li>
                <li><a href="#why-us" className="hover:text-[#00a1ff] transition-colors">Why Us</a></li>
                <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-[#00a1ff] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} GenXis Labs. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}