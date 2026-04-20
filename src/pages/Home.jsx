import React from 'react';
import Navbar from '../components/splash/Navbar';
import HeroSection from '../components/splash/HeroSection';
import PaintDrips from '../components/splash/PaintDrips';
import ExperiencesSection from '../components/splash/ExperiencesSection';
import VibeSelector from '../components/splash/VibeSelector';
import GallerySection from '../components/splash/GallerySection';
import WhySection from '../components/splash/WhySection';
import ReactionsSection from '../components/splash/ReactionsSection';
import BookingSection from '../components/splash/BookingSection';
import LocationSection from '../components/splash/LocationSection';
import FloatingBookButton from '../components/splash/FloatingBookButton';
import Footer from '../components/splash/Footer';

export default function Home() {
  return (
    <div className="bg-obsidian min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PaintDrips />
      <ExperiencesSection />
      <PaintDrips />
      <VibeSelector />
      <GallerySection />
      <PaintDrips />
      <WhySection />
      <ReactionsSection />
      <BookingSection />
      <LocationSection />
      <Footer />
      <FloatingBookButton />
    </div>
  );
}