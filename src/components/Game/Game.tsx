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
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);

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

    // Actualizar el contador
    if (gameResult === 'Ganaste') setWins((prev) => prev + 1);
    if (gameResult === 'Perdiste') setLosses((prev) => prev + 1);
    if (gameResult === 'Empate') setTies((prev) => prev + 1);

    // Notificación
    toast(gameResult === 'Empate' ? 'Es un empate' : `¡${gameResult}!`, {
      position: 'top-center',
      type: gameResult === 'Empate' ? 'info' : gameResult === 'Ganaste' ? 'success' : 'error',
    });
  };

  const handleResetScoreboard = () => {
    setWins(0);
    setLosses(0);
    setTies(0);
  };

  return (
    <Box display="flex" justifyContent="center" padding={3}>
      {/* Columna izquierda: Juego */}
      <Box display="flex" flexDirection="column" alignItems="center" padding={3} borderRight={1} borderColor="grey.300">
        <Avatar alt={playerName} src={playerPhoto} sx={{ width: 100, height: 100, marginBottom: 2 }} />
        <Typography variant="h5" marginBottom={2}>{playerName}</Typography>

        <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
          {choices.map((choice) => (
            <Button key={choice} variant="contained" onClick={() => handleChoice(choice)}>
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

      {/* Columna derecha: Contador */}
      <Box display="flex" flexDirection="column" alignItems="center" padding={3} width="300px">
        <Typography variant="h5" marginBottom={2} textAlign="center">Marcador</Typography>

        {/* Contador del jugador con avatar y número alineados en la misma línea */}
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar alt={playerName} src={playerPhoto} sx={{ width: 30, height: 30 }} />
          <Typography variant="h6">Jugador:</Typography>
          <Typography variant="h6">{wins}</Typography>
        </Box>

        {/* Contador de la máquina con icono y número alineados en la misma línea */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">🤖  Máquina:</Typography>
          <Typography variant="h6">{losses}</Typography>
        </Box>

        {/* Contador de empates */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Empates:</Typography>
          <Typography variant="h6">{ties}</Typography>
        </Box>

        <Button variant="contained" color="secondary" onClick={handleResetScoreboard} sx={{ marginTop: 2 }}>
          Reiniciar Marcador
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
