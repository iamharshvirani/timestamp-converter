import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, Divider, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { epochToDate } from '../utils/dateUtils';
import { timezones } from '../utils/timezones';

const EpochConverter = () => {
  const [epoch, setEpoch] = useState('');
  const [unit, setUnit] = useState('s');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  const handleConvert = () => {
    if (!epoch) {
      setError('Please enter a valid epoch timestamp');
      setResult(null);
      return;
    }

    try {
      const converted = epochToDate(epoch, unit, timezone);
      if (converted) {
        setResult(converted);
        setError('');
      } else {
        setError('Invalid date or conversion error');
        setResult(null);
      }
    } catch (err) {
      setError('An error occurred during conversion');
      setResult(null);
    }
  };

  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
          <AccessTimeIcon fontSize="large" />
          <Typography variant="h6">Epoch to Human Date</Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Epoch Timestamp"
            variant="outlined"
            value={epoch}
            onChange={(e) => setEpoch(e.target.value)}
            type="number"
            placeholder="Enter timestamp..."
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select
              labelId="unit-select-label"
              value={unit}
              label="Unit"
              onChange={(e) => setUnit(e.target.value)}
              data-testid="unit-selector"
            >
              <MenuItem value="s">Seconds</MenuItem>
              <MenuItem value="ms">Milliseconds</MenuItem>
              <MenuItem value="μs">Microseconds</MenuItem>
              <MenuItem value="ns">Nanoseconds</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="timezone-select-label">Timezone</InputLabel>
            <Select
              labelId="timezone-select-label"
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button fullWidth variant="contained" color="primary" onClick={handleConvert}>
          Convert to Date
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        {result && (
          <Box sx={{ marginTop: 2, opacity: 1, visibility: 'visible' }}>
            <Typography variant="subtitle2" gutterBottom>Conversion Results</Typography>
            <Typography variant="body2"><strong>UTC:</strong> {result.utc}</Typography>
            <Typography variant="body2"><strong>Local:</strong> {result.local}</Typography>
            <Typography variant="body2"><strong>ISO 8601:</strong> {result.iso}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EpochConverter;
