import React, { useState, useRef } from "react";
import { TextField, Button, Avatar, Box, Typography } from "@mui/material";
import Webcam from "react-webcam";

interface ProfileFormProps {
  onStartGame: (name: string, photo: string, opponentName: string, opponentPhoto: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onStartGame }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [opponentName, setOpponentName] = useState(""); // Nombre del oponente
  const [opponentPhoto, setOpponentPhoto] = useState<string | null>(null); // Foto del oponente
  const [isCameraOn, setIsCameraOn] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  // Manejadores de cambios de nombre y foto del jugador
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejadores de cambios de nombre y foto del oponente
  const handleOpponentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpponentName(event.target.value);
  };

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

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImagePreview(imageSrc);
      setPhoto(imageSrc);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
      <Typography variant="h4" marginBottom={2}>Perfil del Jugador</Typography>

      <Avatar alt="Perfil" src={imagePreview || undefined} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Typography variant="body1" marginTop={2}>O usa la cámara:</Typography>
      {isCameraOn && <Webcam ref={webcamRef} screenshotFormat="image/png" className="w-64 h-48 border" />}
      
      <Box display="flex" gap={2} marginTop={2}>
        <Button variant="contained" onClick={() => setIsCameraOn(true)}>Iniciar Cámara</Button>
        <Button variant="outlined" onClick={() => setIsCameraOn(false)}>Parar Cámara</Button>
      </Box>
      
      {isCameraOn && <Button onClick={capturePhoto} variant="outlined" sx={{ marginTop: 1 }}>Tomar Foto</Button>}
      
      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
      />
      
      <Typography variant="h5" marginTop={4}>Perfil del Oponente</Typography>
      
      <TextField
        label="Nombre del Oponente"
        variant="outlined"
        value={opponentName}
        onChange={handleOpponentNameChange}
        fullWidth
        margin="normal"
      />

      <input type="file" accept="image/*" onChange={handleOpponentImageChange} />
      <Avatar alt="Oponente" src={opponentPhoto || undefined} sx={{ width: 100, height: 100, marginBottom: 2, marginTop: 2 }} />

      <Button
        variant="contained"
        onClick={() => onStartGame(name, imagePreview || "", opponentName, opponentPhoto || "")}
        disabled={!name || !photo || !opponentName || !opponentPhoto}
        sx={{ marginTop: 2 }}
      >
        Iniciar Juego
      </Button>
    </Box>
  );
};

export default ProfileForm;
