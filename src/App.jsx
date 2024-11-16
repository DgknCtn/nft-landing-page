import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import About from './components/About';
import Collection from './components/Collection';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import Footer from './components/Footer';
import WalletButton from './components/WalletButton';
import SocialLinks from './components/SocialLinks';
import Stake from './components/Stake';
import Whitelist from './components/Whitelist';

function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Home = () => (
    <div className="min-h-screen bg-gradient-to-b from-primary to-black">
      <div id="about">
        <About />
      </div>
      <div id="roadmap">
        <Roadmap />
      </div>
      <div id="team">
        <Team />
      </div>
      <Footer />
    </div>
  );

  return (
    <Router>
      <div className="relative">
        <header className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex items-center">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
            >
              VANTH
            </Link>
            <div className="hidden md:flex items-center justify-center flex-grow gap-8">
              <Link 
                to="/" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
                className="text-white hover:text-accent transition-all duration-300"
              >
                About
              </Link>
              <Link 
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('roadmap');
                }}
                className="text-white hover:text-accent transition-all duration-300"
              >
                Roadmap
              </Link>
              <Link 
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('team');
                }}
                className="text-white hover:text-accent transition-all duration-300"
              >
                Team
              </Link>
              <Link 
                to="/stake" 
                className="px-4 py-2 border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/10 transition-all duration-300"
              >
                Stake
              </Link>
              <Link 
                to="/whitelist" 
                className="px-4 py-2 border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/10 transition-all duration-300"
              >
                Whitelist
              </Link>
            </div>
            <div className="ml-8">
              <WalletButton />
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/whitelist" element={<Whitelist />} />
          </Routes>
        </main>

        <SocialLinks />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;