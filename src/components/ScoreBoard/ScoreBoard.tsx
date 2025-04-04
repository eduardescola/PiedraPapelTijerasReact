import { Avatar, Box, Button, Typography } from "@mui/material";

interface ScoreboardProps {
  name: string;
  photo: string;
  wins: number;
  losses: number;
  ties: number;
  percent: number;
  onReset: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ name, photo, wins, losses, ties, percent, onReset }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    padding={3}
    width="300px"
  >
    <Typography variant="h5" marginBottom={2} minWidth="200px" textAlign="center"  sx={{ backgroundColor: '#ff0606', padding: '8px', borderRadius: '8px'}}>
      ⚔ Marcador ⚔
    </Typography>

    <Box display="flex" alignItems="center" gap={1} sx={{ width: '100%' }}>
      <Avatar alt={name} src={photo} sx={{ width: 30, height: 30 }} />
      <Typography variant="h6">{name}:</Typography>
      <Typography variant="h6">{wins}</Typography>
    </Box>

    <Box display="flex" alignItems="center" gap={1} sx={{ width: '100%' }}>
      <Typography variant="h6" minWidth="100px">🤖 Máquina:</Typography>
      <Typography variant="h6">{losses}</Typography>
    </Box>

    <Box display="flex" alignItems="center" gap={1} sx={{ width: '100%' }}>
      <Typography variant="h6" minWidth="100px">Empates:</Typography>
      <Typography variant="h6">{ties}</Typography>
    </Box>

    <Box display="flex" alignItems="center" gap={1} sx={{ width: '100%' }}>
      <Typography variant="h6" minWidth="100px">% de victorias:</Typography>
      <Typography variant="h6">{percent}</Typography>
    </Box>

    <Button variant="contained" color="secondary" onClick={onReset} sx={{ marginTop: 2 }}>
      Reiniciar Marcador
    </Button>
  </Box>
);
