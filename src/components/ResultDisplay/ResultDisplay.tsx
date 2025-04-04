import { Typography } from "@mui/material";

interface ResultDisplayProps {
  playerChoice: string;
  opponentChoice: string;
  result: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ playerChoice, opponentChoice, result }) => (
  <>
    <Typography variant="h6" marginBottom={2}>Elegiste: {playerChoice}</Typography>
    <Typography variant="h6" marginBottom={2}>La máquina eligió: {opponentChoice}</Typography>
    <Typography variant="h6">{result}</Typography>
  </>
);
