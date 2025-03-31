import React, { useState } from 'react';
import { Button, Box, Typography, Avatar } from '@mui/material';
import { toast } from 'react-toastify';

interface GameProps {
  playerName: string;
  playerPhoto: string;
  onReset: () => void;
}

const Game: React.FC<GameProps> = ({ playerName, playerPhoto, onReset }) => {
  const choices = ['Piedra', 'Papel', 'Tijera'];
  const [playerChoice, setPlayerChoice] = useState('');
  const [opponentChoice, setOpponentChoice] = useState('');
  const [result, setResult] = useState('');

  const determineWinner = (player: string, opponent: string) => {
    if (player === opponent) return 'Empate';
    if (
      (player === 'Piedra' && opponent === 'Tijera') ||
      (player === 'Papel' && opponent === 'Piedra') ||
      (player === 'Tijera' && opponent === 'Papel')
    ) {
      return 'Ganaste';
    }
    return 'Perdiste';
  };

  const handleChoice = (choice: string) => {
    setPlayerChoice(choice);
    const opponent = choices[Math.floor(Math.random() * choices.length)];
    setOpponentChoice(opponent);
    const gameResult = determineWinner(choice, opponent);
    setResult(gameResult);
    toast(gameResult === 'Empate' ? 'Es un empate' : `¡${gameResult}!`, {
      position: 'top-center',
      type: gameResult === 'Empate' ? 'info' : gameResult === 'Ganaste' ? 'success' : 'error',
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
      <Avatar alt={playerName} src={playerPhoto} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      <Typography variant="h5" marginBottom={2}>{playerName}</Typography>
      
      <Box display="flex" justifyContent="space-around" width="100%" marginBottom={2}>
        {choices.map((choice) => (
          <Button
            key={choice}
            variant="contained"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </Button>
        ))}
      </Box>
      
      <Typography variant="h6" marginBottom={2}>Elegiste: {playerChoice}</Typography>
      <Typography variant="h6" marginBottom={2}>Rival eligió: {opponentChoice}</Typography>
      <Typography variant="h6">{result}</Typography>
      
      <Button variant="outlined" onClick={onReset} sx={{ marginTop: 3 }}>
        Jugar otra vez
      </Button>
    </Box>
  );
};

export default Game;
