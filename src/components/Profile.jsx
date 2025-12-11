import React from 'react';
import logo from '../assets/logo.jpg';

const Profile = () => {
    return (
        <section id="profile" className="section" style={{ background: 'linear-gradient(to bottom, var(--bg-dark), #111827)' }}>
            <div className="container">
                <div className="glass" style={{ padding: '3rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, alignItems: 'center', gap: '3rem' }}>
                    {/* Responsive flex layout is handled by CSS grid usually, but using inline styles for simplicity here means we might want a wrapper */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>

                        <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                            <img
                                src={logo}
                                alt="Anil Sir"
                                style={{
                                    width: '250px',
                                    height: '250px',
                                    borderRadius: '1rem',
                                    objectFit: 'cover',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    border: '2px solid var(--primary)'
                                }}
                            />
                        </div>

                        <div style={{ flex: '2 1 400px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Meet <span className="text-gradient">Anil Kumar Sir</span></h2>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 'bold' }}>Director & Founder, Anil's Prayas</h3>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                A distinguished alumnus of <strong>Science College, Patna</strong>, Anil Sir has dedicated over three decades to the cause of education. Since establishing Anil's Prayas in <strong style={{ color: 'white' }}>1993</strong>, he has been a pillar of strength for Hindi medium aspirants.
                            </p>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                Possessing deep expertise in <strong>History</strong> and <strong>General Studies</strong>, he has personally mentored thousands of students. His teaching philosophy goes beyond rote learning; he believes in building analytical ability and confidence in students from rural backgrounds.
                            </p>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                Qualified in multiple <strong>NET/SET</strong> examinations, his academic excellence translates into a rigorous yet accessible curriculum. He stands as a guardian against misinformation, ensuring students receive authentic and strategic guidance for UPSC and BPSC.
                            </p>

                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Academic Excellence & Qualifications</h4>
                                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem', paddingLeft: '0', listStyle: 'none' }}>
                                    {[
                                        "M.A - Ancient History & Archaeology (Gold Medalist) - Patna University",
                                        "LLM - Patna University",
                                        "M.Sc - Physics (Spectroscopy Specialization) - Patna University",
                                        "UGC NET Qualified - Archaeology",
                                        "UGC NET Qualified - Indian Culture",
                                        "UGC NET Qualified - History",
                                        "UGC NET Qualified - South Asian Studies",
                                        "BET Qualified - Ancient History (Bihar Eligibility Test)",
                                        "CSIR Fellowship Awarded for Physics"
                                    ].map((qual, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                            <span style={{ color: 'var(--accent)', marginTop: '4px' }}>•</span>
                                            <span>{qual}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
