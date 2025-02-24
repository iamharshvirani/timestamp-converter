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
import { AccessTime } from '@mui/icons-material';

const EpochConverter = () => {
  const [timestamp, setTimestamp] = useState('');
  const [unit, setUnit] = useState('s');
  const [result, setResult] = useState(null);

  const convertEpoch = () => {
    if (!timestamp) return;

    let epochMs;
    switch (unit) {
      case 's':
        epochMs = timestamp * 1000;
        break;
      case 'ms':
        epochMs = Number(timestamp);
        break;
      case 'μs':
        epochMs = Number(timestamp) / 1000;
        break;
      case 'ns':
        epochMs = Number(timestamp) / 1000000;
        break;
      default:
        epochMs = Number(timestamp);
    }

    const dt = DateTime.fromMillis(epochMs);
    setResult({
      utc: dt.toUTC().toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'),
      local: dt.toLocal().toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'),
      iso: dt.toISO(),
    });
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            Epoch to Human Date
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Epoch Timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            type="number"
            fullWidth
            variant="outlined"
            placeholder="Enter timestamp..."
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
          onClick={convertEpoch} 
          fullWidth
          sx={{
            mb: 3,
            height: 48,
          }}
        >
          Convert to Date
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
              Conversion Results
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>UTC:</strong> {result?.utc}
              </Typography>
              <Typography variant="body2">
                <strong>Local:</strong> {result?.local}
              </Typography>
              <Typography variant="body2">
                <strong>ISO 8601:</strong> {result?.iso}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </CardContent>
    </Card>
  );
};

export default EpochConverter;
