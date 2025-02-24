import React from 'react';
import { Container, Grid, Typography, Box, CssBaseline, createTheme, ThemeProvider, Paper } from '@mui/material';
import EpochConverter from './components/EpochConverter';
import HumanConverter from './components/HumanConverter';
import TimestampGenerator from './components/TimestampGenerator';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#34495e',
    },
    background: {
      default: '#ecf0f1',
      paper: '#ffffff',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
      color: '#2c3e50',
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 500,
      color: '#2c3e50',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(145deg, #ecf0f1 0%, #f5f6fa 100%)',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 4,
              mb: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              align="center"
              sx={{
                mb: 4,
                background: 'linear-gradient(45deg, #2c3e50 30%, #34495e 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Timestamp Converter
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <EpochConverter />
              </Grid>
              <Grid item xs={12} md={6}>
                <HumanConverter />
              </Grid>
              <Grid item xs={12}>
                <TimestampGenerator />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
