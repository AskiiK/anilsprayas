import React from 'react';
import { BookOpen, Users, Award } from 'lucide-react';

const About = () => {
    const cards = [
        {
            icon: <Users size={32} color="var(--primary-light)" />,
            title: "Personal Guidance",
            desc: "Direct mentorship from Anil Sir, who has decades of experience guiding students in Patna."
        },
        {
            icon: <BookOpen size={32} color="var(--accent)" />,
            title: "Pure Hindi Medium",
            desc: "Specialized content and study materials created specifically for Hindi medium students, removing the language barrier."
        },
        {
            icon: <Award size={32} color="var(--primary-light)" />,
            title: "Proven Legacy",
            desc: "An institution active since 1993, dedicated to the success of aspirants from rural and urban backgrounds alike."
        }
    ];

    return (
        <section id="about" className="section" style={{ background: 'var(--bg-dark)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Why Choose Anil's Prayas?</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        We believe that language should never be a barrier to success. Our mission is to provide the best resources and strategy for Civil Services Examination.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {cards.map((card, idx) => (
                        <div key={idx} className="glass" style={{ padding: '2rem', borderRadius: '1rem', transition: 'transform 0.3s' }}>
                            <div style={{ marginBottom: '1.5rem' }}>{card.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>{card.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
