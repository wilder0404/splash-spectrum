import React from 'react';
import { Instagram, MessageCircle, Facebook } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";
const WHATSAPP_NUMBER = '966554563447';

// TikTok icon (lucide doesn't have it)
const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

// Snapchat icon
const SnapchatIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C8.396 0 6.37 1.687 5.423 3.115c-.56.853-.697 1.72-.697 2.588v1.283c-.344.107-.68.16-1.008.16-.437 0-.854-.08-1.193-.24l-.085-.043-.09.003c-.32.01-.54.23-.54.55 0 .28.17.51.46.62.05.02.7.26 1.93.38.29.52.79 1.44 1.53 2.17-.71.37-2.09.87-4.38 1.04-.34.03-.59.3-.56.64.02.23.18.42.41.49.04.01 1.67.5 2.13 1.67.01.03.02.07.02.1 0 .05-.01.1-.04.15-.53.74-1.74 1.07-2.72 1.07-.22 0-.43-.02-.62-.05-.3-.05-.59.12-.68.41-.08.27.04.57.3.71 2.4 1.37 4.74 1.58 5.44 1.61.22.58.62 1.58 1.35 2.48.46.57 1.24 1.24 2.44 1.24.09 0 .18 0 .27-.01.24-.02.47-.03.69-.03.22 0 .45.01.69.03.09.01.18.01.27.01 1.2 0 1.98-.67 2.44-1.24.73-.9 1.13-1.9 1.35-2.48.7-.03 3.04-.24 5.44-1.61.26-.14.38-.44.3-.71-.09-.29-.38-.46-.68-.41-.19.03-.4.05-.62.05-.98 0-2.19-.33-2.72-1.07-.03-.05-.04-.1-.04-.15 0-.03.01-.07.02-.1.46-1.17 2.09-1.66 2.13-1.67.23-.07.39-.26.41-.49.03-.34-.22-.61-.56-.64-2.29-.17-3.67-.67-4.38-1.04.74-.73 1.24-1.65 1.53-2.17 1.23-.12 1.88-.36 1.93-.38.29-.11.46-.34.46-.62 0-.32-.22-.54-.54-.55l-.09-.003-.085.043c-.339.16-.756.24-1.193.24-.328 0-.664-.053-1.008-.16V5.703c0-.868-.137-1.735-.697-2.588C17.647 1.687 15.62 0 12 0h.017z"/>
  </svg>
);

export default function Footer() {
  const { lang } = useLang();

  const socials = [
    { href: 'https://www.instagram.com/splashspectrumksa?igsh=MjZhaDI1ZjQzeDdm', icon: <Instagram className="w-5 h-5" />, label: 'Instagram', hover: 'hover:text-uv-purple' },
    { href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp', hover: 'hover:text-neon-green' },
    { href: 'https://www.facebook.com/share/1CTYsJivME/?mibextid=wwXIfr', icon: <Facebook className="w-5 h-5" />, label: 'Facebook', hover: 'hover:text-electric-cyan' },
    { href: 'https://www.tiktok.com/@splashspectrumksa?_r=1&_t=ZS-95rwxJdSMum', icon: <TikTokIcon />, label: 'TikTok', hover: 'hover:text-white' },
    { href: 'https://www.snapchat.com/add/spectrumksa', icon: <SnapchatIcon />, label: 'Snapchat', hover: 'hover:text-yellow-400' },
  ];

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

          <div className="flex items-center gap-5">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`text-white/40 ${s.hover} transition-colors`} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
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