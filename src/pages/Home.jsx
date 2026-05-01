import React, { useState } from 'react';
import Navbar from '../components/splash/Navbar';
import HeroSection from '../components/splash/HeroSection';
import PaintDrips from '../components/splash/PaintDrips';
import ExperiencesSection from '../components/splash/ExperiencesSection';
import VibeSelector from '../components/splash/VibeSelector';
import PaintStatsSection from '../components/splash/PaintStatsSection';
import GallerySection from '../components/splash/GallerySection';
import WhySection from '../components/splash/WhySection';
import ReactionsSection from '../components/splash/ReactionsSection';
import BookingSection from '../components/splash/BookingSection';
import LocationSection from '../components/splash/LocationSection';
import FloatingBookButton from '../components/splash/FloatingBookButton';
import Footer from '../components/splash/Footer';
import ExperienceQuiz from '../components/splash/ExperienceQuiz';

export default function Home() {
  const [quizResult, setQuizResult] = useState(null);

  const handleQuizBook = (result) => {
    setQuizResult(result);
  };

  return (
    <div className="bg-obsidian min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PaintDrips />
      <ExperiencesSection />
      <PaintDrips />
      <ExperienceQuiz onBookWithExperience={handleQuizBook} />
      <VibeSelector />
      <PaintStatsSection />
      <GallerySection />
      <PaintDrips />
      <WhySection />
      <ReactionsSection />
      <BookingSection preSelectedExperience={quizResult} />
      <LocationSection />
      <Footer />
      <FloatingBookButton />
    </div>
  );
}