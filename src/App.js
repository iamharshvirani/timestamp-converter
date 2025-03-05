import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EpochConverter from './components/EpochConverter';
import HumanConverter from './components/HumanConverter';
import TimestampGenerator from './components/TimestampGenerator';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2c3e50' : '#3498db',
          },
          secondary: {
            main: mode === 'light' ? '#34495e' : '#2ecc71',
          },
          background: {
            default: mode === 'light' ? '#ecf0f1' : '#1a1a1a',
            paper: mode === 'light' ? '#ffffff' : '#2d2d2d',
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backdropFilter: 'blur(10px)',
                backgroundColor: mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(45, 45, 45, 0.8)',
                transition: 'all 0.3s ease-in-out',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <IconButton
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              color="inherit"
              sx={{
                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                },
              }}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
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
    </ThemeProvider>
  );
}

export default App;
