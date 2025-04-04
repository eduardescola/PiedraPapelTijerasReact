import React, { useState } from "react";
import { TextField, Avatar, Typography } from "@mui/material";

interface OpponentProfileProps {
  opponentName: string;
  opponentPhoto: string;
  setOpponentName: React.Dispatch<React.SetStateAction<string>>;
  setOpponentPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const OpponentProfile: React.FC<OpponentProfileProps> = ({
  opponentName,
  opponentPhoto,
  setOpponentName,
  setOpponentPhoto,
}) => {
  // Manejador de cambio de nombre
  const handleOpponentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpponentName(event.target.value);
  };

  // Manejador de cambio de imagen
  const handleOpponentImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setOpponentPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Typography variant="h5" marginTop={4}>
        Perfil del Oponente
      </Typography>
      
      <TextField
        label="Nombre del Oponente"
        variant="outlined"
        value={opponentName}
        onChange={handleOpponentNameChange}
        fullWidth
        margin="normal"
      />

      <input type="file" accept="image/*" onChange={handleOpponentImageChange} />
      
      <Avatar
        alt="Oponente"
        src={opponentPhoto || undefined}
        sx={{ width: 100, height: 100, marginBottom: 2, marginTop: 2 }}
      />
    </div>
  );
};

export default OpponentProfile;
