import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import Game from './Game';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import { CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import '../traducciones/i18n';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState('');

  const getLocalData = () => {
    return localStorage.getItem("playerResults"); 
  };

  const startGame = (name: string, photo: string) => {
    setPlayerName(name);
    setPlayerPhoto(photo);
    setIsGameStarted(true);
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setPlayerName('');
    setPlayerPhoto('');
  };

  return (
    <div>
      <CssBaseline />
      <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{t('gameTitle')}</Typography>
        <ThemeSwitch />
      </Box>
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => i18n.changeLanguage('es')}>Español</Button>
        <Button variant="contained" onClick={() => i18n.changeLanguage('en')}>English</Button>
      </Box>
      <Container maxWidth="sm">
        {isGameStarted ? (
          <Game playerName={playerName} playerPhoto={playerPhoto} onReset={resetGame} />
        ) : (
          <ProfileForm onStartGame={startGame} localData={getLocalData} />
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
