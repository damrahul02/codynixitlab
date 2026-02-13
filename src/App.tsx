import { useState, useEffect } from 'react';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import CaseStudies from './sections/CaseStudies';
import Stats from './sections/Stats';
import Services from './sections/Services';
import TechExpertise from './sections/TechExpertise';
import Industries from './sections/Industries';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-cody-darker">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div 
        className={`transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navigation />
        
        <main>
          <Hero />
          <CaseStudies />
          <Stats />
          <Services />
          <TechExpertise />
          <Industries />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
