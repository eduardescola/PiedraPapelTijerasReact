import React, { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import './ThemeSwitchStyles.css';

const ThemeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', darkMode ? 'light' : 'dark');
    document.body.classList.toggle('dark-theme', !darkMode);
  };

  return (
    <Switch
      checked={darkMode}
      onChange={handleThemeChange}
      inputProps={{ 'aria-label': 'Switch theme' }}
    />
  );
};

export default ThemeSwitch;
