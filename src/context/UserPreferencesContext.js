'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { generatePalette } from '../utils/colorUtils';

const UserPreferencesContext = createContext();

export function UserPreferencesProvider({ children }) {
  const [primaryColor, setPrimaryColor] = useState('#673AB7');
  const [fontSize, setFontSize] = useState('medium');
  const [colorPalette, setColorPalette] = useState(generatePalette('#673AB7'));
  
  // Update color palette when primary color changes
  useEffect(() => {
    setColorPalette(generatePalette(primaryColor));
    
    // Apply colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--primary-light', colorPalette.light);
    document.documentElement.style.setProperty('--primary-dark', colorPalette.dark);
  }, [primaryColor]);
  
  // Apply font size
  useEffect(() => {
    const fontSizes = {
      small: '0.9rem',
      medium: '1rem',
      large: '1.1rem',
      'extra-large': '1.2rem'
    };
    
    document.documentElement.style.setProperty('--base-font-size', fontSizes[fontSize]);
  }, [fontSize]);
  
  return (
    <UserPreferencesContext.Provider 
      value={{ 
        primaryColor, 
        setPrimaryColor, 
        fontSize, 
        setFontSize,
        colorPalette
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}