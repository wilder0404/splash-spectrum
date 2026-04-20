import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Splash Spectrum" className="w-10 h-10 rounded-full" />
            <span className="font-heading font-extrabold text-lg text-white">
              SPLASH <span className="text-neon-pink">SPECTRUM</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-uv-purple transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-neon-green transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 font-body text-xs">
            © {new Date().getFullYear()} Splash Spectrum. All rights reserved. Made with 🎨 and ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}