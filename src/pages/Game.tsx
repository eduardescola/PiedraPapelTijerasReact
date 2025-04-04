// Game.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import {PlayerInfo} from '../components/PlayerInfo/PlayerInfo';
import {ChoiceButtons} from '../components/ChoiceButton/ChoiceButton';
import {ResultDisplay} from '../components/ResultDisplay/ResultDisplay';
import {Scoreboard} from '../components/ScoreBoard/ScoreBoard';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState('');
  const [playerChoice, setPlayerChoice] = useState('');
  const [opponentChoice, setOpponentChoice] = useState('');
  const [result, setResult] = useState('');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);
  const [victoryPercen, setVictoryPercen] = useState(0);

  const choices = ['Piedra', 'Papel', 'Tijera'];

  useEffect(() => {
    const storedData = localStorage.getItem('playerData');
    if (!storedData) {
      navigate('/')
      return
    };
    const { name, photo } = JSON.parse(storedData);
    setPlayerName(name);
    setPlayerPhoto(photo);

    const storedResults = localStorage.getItem('playerResults');
    if (storedResults) {
      const { wins, losses, ties } = JSON.parse(storedResults);
      setWins(wins);
      setLosses(losses);
      setTies(ties);
    }
  }, [navigate]);

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
    const opponent = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(choice, opponent);

    setPlayerChoice(choice);
    setOpponentChoice(opponent);
    setResult(result);

    let newWins = wins;
    let newLosses = losses;
    let newTies = ties;

    if (result === 'Ganaste') newWins++;
    if (result === 'Perdiste') newLosses++;
    if (result === 'Empate') newTies++;

    setWins(newWins);
    setLosses(newLosses);
    setTies(newTies);

    const totalGames = newWins + newLosses + newTies;
    setVictoryPercen(Number(((newWins / totalGames) * 100).toFixed(2)));

    // Guardar en localStorage
    localStorage.setItem('playerResults', JSON.stringify({
      wins: newWins,
      losses: newLosses,
      ties: newTies,
    }));

    toast(result === "Empate" ? "😐 ¡Es un empate!" : result === "Ganaste" ? "🏆 ¡Has ganado!" : "💀 Perdiste...", {
      position: "bottom-right",
      autoClose: 2000,
      style: {
        background: result === "Ganaste" ? "#28a745" : result === "Empate" ? "#ffc107" : "#dc3545",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });
  };

  const resetScoreboard = () => {
    setWins(0);
    setLosses(0);
    setTies(0);
    setVictoryPercen(0);
    localStorage.removeItem('playerResults');
  };

  const resetGame = () => {
    localStorage.removeItem('playerData');
    localStorage.removeItem('playerResults');
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="center" padding={3}>
      <Box display="flex" flexDirection="column" alignItems="center" padding={3} borderRight={1} borderColor="grey.300">
        <PlayerInfo name={playerName} photo={playerPhoto} />
        <ChoiceButtons choices={choices} onSelect={handleChoice} />
        <ResultDisplay playerChoice={playerChoice} opponentChoice={opponentChoice} result={result} />
        <Button variant="outlined" onClick={resetGame} sx={{ marginTop: 3 }}>Jugar otra vez</Button>
      </Box>

      <Scoreboard
        name={playerName}
        photo={playerPhoto}
        wins={wins}
        losses={losses}
        ties={ties}
        percent={victoryPercen}
        onReset={resetScoreboard}
      />
    </Box>
  );
};

export default Game;
