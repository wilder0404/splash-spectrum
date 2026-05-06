import React, { useState, useEffect } from 'react';
import SplashScreen from '../components/splash/SplashScreen';
import Navbar from '../components/splash/Navbar';
import HeroSection from '../components/splash/HeroSection';
import ExperiencesSection from '../components/splash/ExperiencesSection';
import PaintStatsSection from '../components/splash/PaintStatsSection';
import GallerySection from '../components/splash/GallerySection';
import WhySection from '../components/splash/WhySection';
import ReactionsSection from '../components/splash/ReactionsSection';
import BookingSection from '../components/splash/BookingSection';
import LocationSection from '../components/splash/LocationSection';
import FloatingBookButton from '../components/splash/FloatingBookButton';
import Footer from '../components/splash/Footer';
import ExperienceQuiz from '../components/splash/ExperienceQuiz';
import PaintDrips from '../components/splash/PaintDrips';

export default function Home() {
  const [quizResult, setQuizResult] = useState(null);
  // Check sessionStorage to only show splash screen once per session
  const [splashDone, setSplashDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splashShown') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (splashDone) {
      sessionStorage.setItem('splashShown', 'true');
    }
  }, [splashDone]);

  const handleQuizBook = (result) => {
    setQuizResult(result);
  };

  return (
    <div className="bg-obsidian min-h-screen overflow-x-hidden relative">
      {/* Background paint drips effect */}
      <PaintDrips />
      
      {/* Main content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
        <Navbar />
        <HeroSection />
        <ExperiencesSection />
        <ExperienceQuiz onBookWithExperience={handleQuizBook} />
        <PaintStatsSection />
        <GallerySection />
        <WhySection />
        <ReactionsSection />
        <BookingSection preSelectedExperience={quizResult} />
        <LocationSection />
        <Footer />
        <FloatingBookButton />
      </div>
    </div>
  );
}
