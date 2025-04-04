import { Button, Box } from "@mui/material";

interface ChoiceButtonsProps {
  choices: string[];
  onSelect: (choice: string) => void;
}

export const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onSelect }) => (
  <Box display="flex" justifyContent="space-between" gap={2} marginBottom={2}>
    {choices.map((choice) => (
      <Button key={choice} variant="contained" onClick={() => onSelect(choice)}>
        {choice}
      </Button>
    ))}
  </Box>
);