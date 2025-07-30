import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeContextProvider, useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import EpochConverter from './components/EpochConverter';
import HumanConverter from './components/HumanConverter';
import TimestampGenerator from './components/TimestampGenerator';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  const mode = isDarkMode ? 'dark' : 'light';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'light'
          ? 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)'
          : 'linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)',
        transition: 'all 0.3s ease-in-out',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ position: 'fixed', top: 16, right: 16 }}>
          <ThemeToggle />
        </Box>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 4,
            background: mode === 'light'
              ? 'linear-gradient(45deg, #2c3e50 30%, #34495e 90%)'
              : 'linear-gradient(45deg, #3498db 30%, #2ecc71 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Timestamp Converter
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <EpochConverter />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <HumanConverter />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <TimestampGenerator />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
