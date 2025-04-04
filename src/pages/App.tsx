import React, { useState } from 'react';
import ProfileForm from '../pages/ProfileForm';
import Game from '../pages/Game';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState('');

  // Función para iniciar el juego
  const startGame = (name: string, photo: string) => {
    setPlayerName(name);
    setPlayerPhoto(photo);
    setIsGameStarted(true); // Cambia el estado a 'true' cuando el juego comienza
  };

  // Función para resetear el juego y volver al perfil
  const resetGame = () => {
    setIsGameStarted(false);
    setPlayerName('');
    setPlayerPhoto('');
  };

  // Función para actualizar el nombre y la foto del jugador
  const updatePlayer = (newName: string, newPhoto: string) => {
    setPlayerName(newName);
    setPlayerPhoto(newPhoto);
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
        {isGameStarted ? (
          <Game 
            playerName={playerName} 
            playerPhoto={playerPhoto} 
            onReset={resetGame} 
            onUpdatePlayer={updatePlayer} // Pasamos la función para actualizar el jugador
          />
        ) : (
          <ProfileForm onStartGame={startGame}/>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
