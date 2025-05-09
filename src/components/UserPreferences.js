'use client';

import { useUserPreferences } from '../context/UserPreferencesContext';
import styles from './UserPreferences.module.css';

export default function UserPreferences() {
  const { primaryColor, setPrimaryColor, fontSize, setFontSize } = useUserPreferences();
  
  const colorOptions = [
    { name: 'Purple', value: '#673AB7' },
    { name: 'Blue', value: '#2196F3' },
    { name: 'Green', value: '#4CAF50' },
    { name: 'Orange', value: '#FF9800' },
    { name: 'Red', value: '#F44336' }
  ];
  
  const fontSizeOptions = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' },
    { name: 'Extra Large', value: 'extra-large' }
  ];
  
  return (
    <div className={styles.preferencesPanel}>
      <h3>Customize Your Experience</h3>
      
      <div className={styles.optionGroup}>
        <label>Theme Color</label>
        <div className={styles.colorOptions}>
          {colorOptions.map(color => (
            <button
              key={color.value}
              className={`${styles.colorOption} ${primaryColor === color.value ? styles.selected : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => setPrimaryColor(color.value)}
              aria-label={`Set theme color to ${color.name}`}
            />
          ))}
        </div>
      </div>
      
      <div className={styles.optionGroup}>
        <label>Font Size</label>
        <div className={styles.fontSizeOptions}>
          {fontSizeOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.fontSizeOption} ${fontSize === option.value ? styles.selected : ''}`}
              onClick={() => setFontSize(option.value)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}