import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';  // Importar los íconos de sol y luna
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
    <FormControlLabel
      control={
        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          inputProps={{ 'aria-label': 'Switch theme' }}
          color="default"
          sx={{ 
            '& .MuiSwitch-thumb': {
              backgroundColor: darkMode ? '#ffcc00' : '#f57c00',
            },
            '& .MuiSwitch-track': {
              backgroundColor: darkMode ? '#757575' : '#e0e0e0',
            },
          }}
        />
      }
      labelPlacement="start"  // Coloca los íconos a la izquierda
      label={
        <>
          <Brightness7 sx={{ display: !darkMode ? 'block' : 'none', color: '#FFB300', fontSize: 24 }} />  {/* Sol en modo claro */}
          <Brightness4 sx={{ display: darkMode ? 'block' : 'none', color: '#fff', fontSize: 24 }} />  {/* Luna en modo oscuro */}
        </>
      }
    />
  );
};

export default ThemeSwitch;
