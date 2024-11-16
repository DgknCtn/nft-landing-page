import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import About from './components/About';
import Collection from './components/Collection';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import Footer from './components/Footer';
import WalletButton from './components/WalletButton';
import SocialLinks from './components/SocialLinks';
import WhitelistForm from './components/WhitelistForm';

const queryClient = new QueryClient();

function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-primary to-black">
        <Toaster position="top-right" />
        
        <header className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent cursor-pointer" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              VANTH
            </h1>
            <div className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection('about')} 
                      className="hover:text-accent transition-all duration-300 hover:scale-105">About</button>
              <button onClick={() => scrollToSection('collection')} 
                      className="hover:text-accent transition-all duration-300 hover:scale-105">Collection</button>
              <button onClick={() => scrollToSection('roadmap')} 
                      className="hover:text-accent transition-all duration-300 hover:scale-105">Roadmap</button>
              <button onClick={() => scrollToSection('team')} 
                      className="hover:text-accent transition-all duration-300 hover:scale-105">Team</button>
              <button onClick={() => scrollToSection('whitelist')} 
                      className="hover:text-accent transition-all duration-300 hover:scale-105">Whitelist</button>
            </div>
            <WalletButton />
          </nav>
        </header>

        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"> VANTH </span>
                Collection
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Discover our exclusive collection of unique digital artworks stored on the Ethereum blockchain.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => scrollToSection('collection')} 
                  className="bg-gradient-to-r from-secondary to-accent px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
                >
                  Explore Collection
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <About />
        <Collection />
        <WhitelistForm />
        <Roadmap />
        <Team />
        <Footer />
        <SocialLinks />
      </div>
    </QueryClientProvider>
  );
}

export default App;