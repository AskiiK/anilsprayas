import React, { useState, useEffect } from 'react';
import data from '../assets/gk_data.json';
import { Bell, RefreshCw, ExternalLink } from 'lucide-react';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        setLoading(true);
        try {
            // Fetch top stories from The Hindu (National) via RSS to JSON converter
            const RSS_URL = 'https://www.thehindu.com/news/national/feeder/default.rss';
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
            const json = await res.json();

            if (json.status === 'ok') {
                // Map the RSS items to our format
                const liveNews = json.items.slice(0, 8).map(item => ({
                    text: item.title,
                    link: item.link,
                    date: item.pubDate
                }));
                setNewsItems(liveNews);
            } else {
                throw new Error("RSS Fetch failed");
            }
        } catch (error) {
            console.error("Failed to fetch live news:", error);
            // Fallback to static GK data if live fetch fails
            setNewsItems(data.news.map(text => ({ text, link: null })));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (newsItems.length === 0) return null;

    return (
        <section className="section" style={{ padding: '2rem 0', background: 'rgba(59, 130, 246, 0.1)', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}> { /* Centered and constrained width */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <Bell color="var(--accent)" size={20} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Latest National News</h3>
                        </div>
                        <button onClick={fetchNews} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Refresh News">
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    <div className="glass" style={{ padding: '1rem', borderRadius: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {loading ? (
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading latest news...</p>
                            ) : (
                                newsItems.map((item, idx) => (
                                    <div key={idx} style={{
                                        padding: '0.8rem',
                                        borderRadius: '0.5rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderLeft: '3px solid var(--accent)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'start',
                                        gap: '1rem'
                                    }}>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '500', lineHeight: '1.4' }}>{item.text}</p>
                                            {item.date && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{new Date(item.date).toDateString()}</span>}
                                        </div>
                                        {item.link && (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                        <a href="https://t.me/anilsprayas" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', fontSize: '0.85rem', textDecoration: 'underline' }}>
                            More on Telegram
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;
