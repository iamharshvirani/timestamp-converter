import React, { useState } from 'react';
import { DateTime } from 'luxon';
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
} from '@mui/material';
import { Schedule } from '@mui/icons-material';

const HumanConverter = () => {
  const [dateTime, setDateTime] = useState('');
  const [unit, setUnit] = useState('s');
  const [result, setResult] = useState(null);

  const convertToEpoch = () => {
    if (!dateTime) return;

    const dt = DateTime.fromISO(dateTime);
    let timestamp;

    switch (unit) {
      case 's':
        timestamp = Math.floor(dt.toMillis() / 1000);
        break;
      case 'ms':
        timestamp = dt.toMillis();
        break;
      case 'μs':
        timestamp = dt.toMillis() * 1000;
        break;
      case 'ns':
        timestamp = dt.toMillis() * 1000000;
        break;
      default:
        timestamp = dt.toMillis();
    }

    setResult(timestamp);
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Schedule sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            Human Date to Epoch
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Date and Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              sx: { backgroundColor: 'background.paper' }
            }}
          />
          <Select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            sx={{ 
              minWidth: 130,
              backgroundColor: 'background.paper'
            }}
          >
            <MenuItem value="s">Seconds</MenuItem>
            <MenuItem value="ms">Milliseconds</MenuItem>
            <MenuItem value="μs">Microseconds</MenuItem>
            <MenuItem value="ns">Nanoseconds</MenuItem>
          </Select>
        </Box>

        <Button 
          variant="contained" 
          onClick={convertToEpoch} 
          fullWidth
          sx={{
            mb: 3,
            height: 48,
          }}
        >
          Convert to Timestamp
        </Button>

        <Fade in={result !== null}>
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: 'rgba(236, 240, 241, 0.6)',
            }}
          >
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Conversion Result
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {result}
            </Typography>
          </Box>
        </Fade>
      </CardContent>
    </Card>
  );
};

export default HumanConverter;
