import React from 'react';
import Reveal from './Reveal';
import Button from './Button';
import { GitBranch, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    // Assuming this function is defined in a parent or context, 
    // keeping it as you had it in your snippet.
    const handleScrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-white dark:bg-[#0B1120] border-t border-gray-100 dark:border-gray-800 pt-20 pb-10 transition-colors duration-500">
            <div className="container mx-auto px-6 md:px-12">

                {/* Newsletter Section */}
                <Reveal>
                    <div className="bg-[#00a1ff]/5 dark:bg-[#00a1ff]/10 rounded-[2rem] p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="md:w-1/2">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Stay ahead of the curve</h3>
                            <p className="text-gray-500 dark:text-gray-400">Join 5,000+ engineers and innovators receiving our monthly insights on AI & Robotics.</p>
                        </div>
                        <div className="md:w-1/2 w-full">
                            {/* FIX APPLIED HERE:
                                1. Changed 'flex' to 'flex flex-col sm:flex-row' 
                                   (Stacks vertically on mobile, row on tablet+)
                            */}
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full sm:flex-1 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#00a1ff] text-gray-900 dark:text-white transition-colors" 
                                />
                                <Button variant="primary" className="!px-8 w-full sm:w-auto">Subscribe</Button>
                            </form>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={200} className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 lg:col-span-1">
                        <a href="/" className="flex items-center gap-2 mb-6" onClick={(e) => handleScrollToSection(e, '#home')}>
                            <img src="/logo_with_text.png" alt="GenXis Labs Logo" className="h-8 md:h-10 transform group-hover:scale-105 transition-transform duration-300" />
                        </a>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            GenXis Labs is a pioneering technology research firm dedicated to bridging human potential with artificial intelligence and advanced robotics.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons */}
                            <a href="https://www.linkedin.com/company/genxis-labs" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#00a1ff] hover:text-white transition-all"><Linkedin size={18} /></a>
                            <a href="https://github.com/GenXisLabs" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#00a1ff] hover:text-white transition-all"><Github size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Solutions</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Advanced Robotics</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">AI & Machine Learning</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Cloud Infrastructure</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Digital Strategy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors" onClick={(e) => handleScrollToSection(e, '#about')}>About Us</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Blog & Insights</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors" onClick={(e) => handleScrollToSection(e, '#contact')}>Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Legal & Help</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-[#00a1ff] transition-colors">Security</a></li>
                        </ul>
                    </div>
                </Reveal>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 dark:text-gray-500 text-sm">© {new Date().getFullYear()} GenXis Labs. All rights reserved.</p>
                    <div className="flex gap-8 text-sm text-gray-400 dark:text-gray-500">
                        <span>Sri Lanka</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;