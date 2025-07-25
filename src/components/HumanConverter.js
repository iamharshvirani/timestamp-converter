import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, Divider, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { dateToEpoch } from '../utils/dateUtils';
import { timezones } from '../utils/timezones';

const HumanConverter = () => {
  const [dateTime, setDateTime] = useState('');
  const [unit, setUnit] = useState('s');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  const handleConvert = () => {
    if (!dateTime) {
      setError('Please enter a valid date and time');
      setResult(null);
      return;
    }

    try {
      const converted = dateToEpoch(dateTime, unit, timezone);
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
          <Typography variant="h6">Human Date to Epoch</Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Date and Time"
            variant="outlined"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            placeholder="Enter date and time (e.g., YYYY-MM-DDTHH:MM:SS)"
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
          Convert to Epoch
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        {result && (
          <Box sx={{ marginTop: 2, opacity: 1, visibility: 'visible' }}>
            <Typography variant="subtitle2" gutterBottom>Conversion Result</Typography>
            <Typography variant="body2"><strong>Epoch Timestamp:</strong> {result}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default HumanConverter;
