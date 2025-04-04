import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import Game from './Game';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [opponentPhoto, setOpponentPhoto] = useState('');
  const getLocalData = () => {
    return localStorage.getItem("playerResults"); 
  }

  // Función para iniciar el juego
  const startGame = (name: string, photo: string, nameOpponent: string, photoOpponent: string) => {
    setPlayerName(name);
    setPlayerPhoto(photo);
    setOpponentName(nameOpponent);
    setOpponentPhoto(photoOpponent);
    setIsGameStarted(true); // Cambia el estado a 'true' cuando el juego comienza
  };

  // Función para resetear el juego y volver al perfil
  const resetGame = () => {
    setIsGameStarted(false);
    setPlayerName('');
    setPlayerPhoto('');
    setOpponentName('');
    setOpponentPhoto('');
  };

  return (
    <div>
      <CssBaseline />
      <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Piedra, Papel o Tijera</Typography>
        <ThemeSwitch />
      </Box>
      <Container maxWidth="sm">
        {/* Mostrar el formulario de perfil si el juego no ha comenzado o si no hay datos en local storage*/}
        {isGameStarted  ? (
          <Game playerName={playerName} playerPhoto={playerPhoto} opponentName={opponentName} opponentPhoto={opponentPhoto} onReset={resetGame} />
        ) : (
          <ProfileForm onStartGame={startGame}/>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
