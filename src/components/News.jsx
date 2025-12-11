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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Bell color="var(--accent)" />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Latest National News (Updates Daily)</h3>
                    </div>
                    <button onClick={fetchNews} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Refresh News">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading latest news...</p>
                    ) : (
                        newsItems.map((item, idx) => (
                            <div key={idx} className="glass" style={{ padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                                <div>
                                    <p style={{ fontSize: '1rem', fontWeight: '500' }}>{item.text}</p>
                                    {item.date && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(item.date).toDateString()}</span>}
                                </div>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', flexShrink: 0 }}>
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <a href="https://t.me/anilsprayas" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                        Join Telegram for More Updates
                    </a>
                </div>
            </div>
        </section>
    );
};

export default News;
