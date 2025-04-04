// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileForm from '../pages/ProfileForm';
import Game from '../pages/Game';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Piedra, Papel o Tijera</Typography>
        <ThemeSwitch />
      </Box>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Container>
      <ToastContainer />
    </Router>
  );
};

export default App;
