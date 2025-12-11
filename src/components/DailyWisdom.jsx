import React, { useState, useEffect } from 'react';
import data from '../assets/gk_data.json';
import { Lightbulb } from 'lucide-react';

const DailyWisdom = () => {
    const [tip, setTip] = useState('');

    useEffect(() => {
        const facts = data.facts;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setTip(randomFact);
    }, []);

    return (
        <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <Lightbulb size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>General Knowledge Fact</h2>
                <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', fontStyle: 'italic', lineHeight: '1.8' }}>
                    "{tip}"
                </div>
                <p style={{ marginTop: '1.5rem', opacity: 0.8 }}>- Key to Success (PT/Mains)</p>
            </div>
        </section>
    );
};

export default DailyWisdom;
