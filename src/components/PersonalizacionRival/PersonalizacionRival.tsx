import React from "react";
import { Avatar, Typography, Box } from "@mui/material";

// Lista de nombres aleatorios para el oponente
const opponentNames = [
  "Robo-001", "MenteMaquina", "AI-X", "Circuito", "ByteBot", "Dr. Compus", "Neura", "Cyber-X"
];

// Lista de URLs de avatares aleatorios para el oponente
const opponentAvatars = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg"
];

const RandomOpponent: React.FC = () => {
  // Generamos un nombre y una imagen aleatoria para el oponente
  const randomName = opponentNames[Math.floor(Math.random() * opponentNames.length)];
  const randomAvatar = opponentAvatars[Math.floor(Math.random() * opponentAvatars.length)];

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" padding={2}>
      <Avatar alt={randomName} src={randomAvatar} sx={{ width: 80, height: 80, marginBottom: 1 }} />
      <Typography variant="h6">{randomName}</Typography>
    </Box>
  );
};

export default RandomOpponent;
