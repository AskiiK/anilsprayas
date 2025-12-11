import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Hero = () => {
    return (
        <section id="home" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '4rem',
            background: 'radial-gradient(circle at top right, rgba(30, 64, 175, 0.3), transparent 40%), radial-gradient(circle at bottom left, rgba(245, 158, 11, 0.1), transparent 40%)'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <img
                    src={logo}
                    alt="Anil's Prayas Logo"
                    className="animate-fade-in"
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '1.5rem',
                        border: '4px solid var(--accent)',
                        boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
                    }}
                />
                <h2 className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: '600', marginBottom: '1rem' }}>
                    Welcome to Anil's Prayas I.A.S Study Circle
                </h2>
                <h1 className="animate-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', fontWeight: '800', marginBottom: '1.5rem' }}>
                    Empowering <span className="text-gradient">Hindi Medium</span><br />
                    Aspirants to Succeed
                </h1>
                <p className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    Mentored by Anil Sir since 1993. Providing high-quality guidance for UPSC and BPSC examinations in pure Hindi medium.
                </p>
                <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="#videos" className="btn btn-primary">
                        Start Learning <ArrowRight size={20} />
                    </a>
                    <a href="https://t.me/anilsprayas" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        Join Telegram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
