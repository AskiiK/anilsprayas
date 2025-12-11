import React from 'react';
import { PlayCircle } from 'lucide-react';

const videos = [
    { title: "66th BPSC RESULT- IMPOSSIBLE YET DOUBTFUL MARKS!", views: "Recent", url: "https://www.youtube.com/watch?v=p-sQw3BaZzM", videoId: "p-sQw3BaZzM" },
    { title: "68th BPSC- BATCH LAUNCH घोषणा", views: "Recent", url: "https://www.youtube.com/watch?v=oO_ITzjqrrA", videoId: "oO_ITzjqrrA" },
    { title: "67वीं BPSC- CURRENT AFFAIRS रणनीति", views: "Popular", url: "https://www.youtube.com/watch?v=Epp7Iy0SzDY", videoId: "Epp7Iy0SzDY" },
    { title: "UPSC PRELIMS 21-ANSWER KEY-HISTORY", views: "Key Analysis", url: "https://www.youtube.com/watch?v=lkgXhctZRa4", videoId: "lkgXhctZRa4" },
    { title: "JPSC 2021 (7th-10th)- ANSWERKEY- GS-HISTORY", views: "Solved", url: "https://www.youtube.com/watch?v=-meTtlpB8DY", videoId: "-meTtlpB8DY" },
    { title: "OFFLINE BATCH @ANIL'S PRAYAS, PATNA", views: "Announcement", url: "https://www.youtube.com/watch?v=A5d0y4v-BnY", videoId: "A5d0y4v-BnY" }
];

const VideoGrid = () => {
    return (
        <section id="videos" className="section">
            <div className="container">
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Recent <span className="text-gradient">Videos</span></h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {videos.map((vid, idx) => (
                        <a
                            key={idx}
                            href={vid.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass"
                            style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer', display: 'block', transition: 'transform 0.2s', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`}
                                    alt={vid.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <PlayCircle size={48} color="white" style={{ opacity: 0.9, filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} />
                                </div>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{vid.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{vid.views}</p>
                            </div>
                        </a >
                    ))}
                </div >

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <a href="https://www.youtube.com/@anilsprayasi.a.sstudycircl1180" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        Visit YouTube Channel
                    </a>
                </div>
            </div >
        </section >
    );
};

export default VideoGrid;
