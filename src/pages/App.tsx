// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileForm from '../pages/ProfileForm';
import Game from '../pages/Game';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import { CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import '../traducciones/i18n';

const App = () => {
  const { t, i18n } = useTranslation();
  return (
    <Router>
      <CssBaseline />
      <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{t('gameTitle')}</Typography>
        <ThemeSwitch />
      </Box>
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => i18n.changeLanguage('es')}>Español</Button>
        <Button variant="contained" onClick={() => i18n.changeLanguage('en')}>English</Button>
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
