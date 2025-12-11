import React, { useState } from 'react';
import { Menu, X, Youtube, Send } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
                <a href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="text-gradient">ANIL'S PRAYAS</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex" style={{ display: 'none' }}>
                    {/* Mobile first styles in css make this tricky without classes, using inline for simplicity or media queries in css */}
                </div>
                <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                    <li><a href="#home" className="hover:text-primary-light">Home</a></li>
                    <li><a href="#about" className="hover:text-primary-light">About</a></li>
                    <li><a href="#videos" className="hover:text-primary-light">Videos</a></li>
                    <li><a href="#contact" className="hover:text-primary-light">Contact</a></li>
                </ul>

                <div style={{ display: 'flex', gap: '1rem' }} className="desktop-menu">
                    <a href="https://www.youtube.com/@anilsprayasi.a.sstudycircl1180" target="_blank" rel="noopener noreferrer">
                        <Youtube className="w-6 h-6 hover:text-red-500" color="#ef4444" />
                    </a>
                    <a href="https://t.me/anilsprayas" target="_blank" rel="noopener noreferrer">
                        <Send className="w-6 h-6 hover:text-blue-400" color="#3b82f6" />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} className="mobile-toggle">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="glass" style={{ padding: '1rem', position: 'absolute', top: '4rem', width: '100%' }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                        <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
                        <li><a href="#videos" onClick={() => setIsOpen(false)}>Videos</a></li>
                        <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                    </ul>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
