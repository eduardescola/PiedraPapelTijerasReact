import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Avatar, Box, Typography } from '@mui/material';

interface ProfileFormProps {
  onStartGame: (name: string, photo: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPhotoCaptured, setIsPhotoCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Maneja el cambio en el nombre
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // Activa la cámara
  const startCamera = async () => {
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play(); // Asegúrate de que el video empiece a reproducirse
        };
        setIsCameraActive(true);
      }
    }
  };

  // Captura una imagen del video
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Establecer las dimensiones del canvas para que coincidan con el video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Dibujar el contenido del video en el canvas
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Convertir la imagen a base64 y guardarla como la foto del perfil
        const photoUrl = canvasRef.current.toDataURL();
        setPhoto(photoUrl); // Guardamos la imagen tomada como foto de perfil
        setIsPhotoCaptured(true); // Indicamos que la foto ha sido tomada
      }
    }
  };

  // Detener la cámara
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Asegurarnos de limpiar el flujo cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
      <Typography variant="h4" marginBottom={2}>Perfil del Jugador</Typography>

      {photo ? (
        <Avatar alt="Perfil" src={photo} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      ) : (
        <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />
      )}

      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
      />

      {!isCameraActive && !isPhotoCaptured && (
        <Button variant="contained" onClick={startCamera} sx={{ marginTop: 2 }}>
          Activar Cámara
        </Button>
      )}

      {isCameraActive && !isPhotoCaptured && (
        <>
          <Box marginTop={2}>
            <video ref={videoRef} width="100%" height="auto" />
          </Box>
          <Button variant="contained" onClick={capturePhoto} sx={{ marginTop: 2 }}>
            Capturar Foto
          </Button>
          <Button variant="outlined" onClick={stopCamera} sx={{ marginTop: 2 }}>
            Detener Cámara
          </Button>
        </>
      )}

      {isPhotoCaptured && (
        <Button
          variant="contained"
          onClick={() => onStartGame(name, photo || '')}
          disabled={!name || !photo}
          sx={{ marginTop: 2 }}
        >
          Iniciar Juego
        </Button>
      )}

      {!isPhotoCaptured && (
        <Button
          variant="contained"
          onClick={() => onStartGame(name, photo || '')}
          disabled={!name || !photo}
          sx={{ marginTop: 2 }}
        >
          Iniciar Juego
        </Button>
      )}
    </Box>
  );
};

export default ProfileForm;
