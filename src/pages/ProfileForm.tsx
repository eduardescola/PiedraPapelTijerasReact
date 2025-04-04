// ProfileForm.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = () => {
    // Guardamos en localStorage
    localStorage.setItem('playerData', JSON.stringify({ name, photo }));
    // Navegamos
    navigate('/game');
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="URL de foto" value={photo} onChange={(e) => setPhoto(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Empezar juego</Button>
    </Box>
  );
};

export default ProfileForm;
