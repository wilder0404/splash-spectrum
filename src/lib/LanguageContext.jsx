import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';
  return (
    <LanguageContext.Provider value={{ lang, setLang, isAr }}>
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        style={isAr ? { fontFamily: "'Cairo', sans-serif" } : {}}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}