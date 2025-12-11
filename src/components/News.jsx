import React, { useState, useEffect } from 'react';
import data from '../assets/gk_data.json';
import { Bell } from 'lucide-react';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        // Use the static GK news list
        setNewsItems(data.news);
    }, []);

    if (newsItems.length === 0) return null;

    return (
        <section className="section" style={{ padding: '2rem 0', background: 'rgba(59, 130, 246, 0.1)', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Bell color="var(--accent)" />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>News & Updates</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {newsItems.map((item, idx) => (
                        <div key={idx} className="glass" style={{ padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--accent)' }}>
                            <p style={{ fontSize: '1rem' }}>{item}</p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <a href="https://t.me/anilsprayas" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                        View all on Telegram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default News;
