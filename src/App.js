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
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%)',
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
            color: mode === 'light'
              ? '#2c3e50'
              : '#ffffff',
            fontWeight: 'bold',
            textShadow: mode === 'light'
              ? '2px 2px 4px rgba(0,0,0,0.1)'
              : '2px 2px 8px rgba(0,0,0,0.3)',
            letterSpacing: '0.5px',
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
