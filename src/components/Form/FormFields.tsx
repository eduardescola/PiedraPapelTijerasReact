import type React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CameraComponent from "./CameraComponent/Camera";
import AvatarUpload from "./AvatarUpload/AvatarUpload";
import { useState } from "react";

interface FormFieldsProps {
  onStartGame: (name: string, photo: string) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ onStartGame }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
      <Typography variant="h4" marginBottom={2}>
        Perfil del Jugador
      </Typography>

      <AvatarUpload onPhotoSelected={setPhoto} />
      <CameraComponent onPhotoCapture={setPhoto} />

      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={() => onStartGame(name, photo || "")}
        disabled={!name || !photo}
        sx={{ marginTop: 2 }}
      >
        Iniciar Juego
      </Button>
    </Box>
  );
};

export default FormFields;