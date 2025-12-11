import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import About from './components/About';
import VideoGrid from './components/VideoGrid';
import Chatbot from './components/Chatbot';
import News from './components/News';
import DailyWisdom from './components/DailyWisdom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <News />
      <Profile />
      <DailyWisdom />
      <About />
      <VideoGrid />
      <Chatbot />

      <footer style={{ background: 'var(--bg-dark)', padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)' }}>&copy; 2025 Anil's Prayas I.A.S Study Circle. All rights reserved.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Ashok Rajpath, Patna, Bihar.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
