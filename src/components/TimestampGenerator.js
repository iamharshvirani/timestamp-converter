import React, { useState } from 'react';
import { getCurrentTimestamp, dateToEpoch } from '../utils/dateUtils';
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Fade,
  Divider,
  Grid,
} from '@mui/material';
import { Timer, Update } from '@mui/icons-material';

const TimestampGenerator = () => {
  const [unit, setUnit] = useState('s');
  const [currentTimestamp, setCurrentTimestamp] = useState(null);
  const [customDate, setCustomDate] = useState('');
  const [customTimestamp, setCustomTimestamp] = useState(null);

  const handleGetCurrentTimestamp = () => {
    setCurrentTimestamp(getCurrentTimestamp(unit));
  };

  const generateCustomTimestamp = () => {
    if (!customDate) return;
    setCustomTimestamp(dateToEpoch(customDate, unit));
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Timer sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            Timestamp Generator
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Current Timestamp Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Update sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                <Typography variant="subtitle1" color="primary">
                  Current Timestamp
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'background.paper' }}
                >
                  <MenuItem value="s">Seconds</MenuItem>
                  <MenuItem value="ms">Milliseconds</MenuItem>
                  <MenuItem value="μs">Microseconds</MenuItem>
                  <MenuItem value="ns">Nanoseconds</MenuItem>
                </Select>
              </Box>
              <Button 
                variant="contained" 
                onClick={handleGetCurrentTimestamp}
                fullWidth
                sx={{ height: 48 }}
              >
                Get Current Timestamp
              </Button>
              <Fade in={currentTimestamp !== null}>
                <Box 
                  sx={{ 
                    mt: 2,
                    p: 2, 
                    borderRadius: 2,
                    backgroundColor: 'rgba(236, 240, 241, 0.6)',
                  }}
                >
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {currentTimestamp}
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* Custom Timestamp Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timer sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                <Typography variant="subtitle1" color="primary">
                  Custom Timestamp
                </Typography>
              </Box>
              <TextField
                label="Custom Date and Time"
                type="datetime-local"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { backgroundColor: 'background.paper' }
                }}
              />
              <Button 
                variant="contained"
                onClick={generateCustomTimestamp}
                fullWidth
                sx={{ height: 48 }}
              >
                Generate Timestamp
              </Button>
              <Fade in={customTimestamp !== null}>
                <Box 
                  sx={{ 
                    mt: 2,
                    p: 2, 
                    borderRadius: 2,
                    backgroundColor: 'rgba(236, 240, 241, 0.6)',
                  }}
                >
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {customTimestamp}
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TimestampGenerator;
