import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, Divider, Box, IconButton, Snackbar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { dateToEpoch } from '../utils/dateUtils';
import { timezones } from '../utils/timezones';
import { getLastUsedUnit, setLastUsedUnit, getLastUsedTimezone, setLastUsedTimezone } from '../utils/userPreferences';

const HumanConverter = () => {
  const [dateTime, setDateTime] = useState('');
  const [unit, setUnit] = useState(getLastUsedUnit() || 's');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [timezone, setTimezone] = useState(getLastUsedTimezone() || 'Asia/Kolkata');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    setLastUsedUnit(unit);
  }, [unit]);

  useEffect(() => {
    setLastUsedTimezone(timezone);
  }, [timezone]);

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

  const showCopyToast = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarOpen(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => showCopyToast('Copied!'));
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2"><strong>Epoch Timestamp:</strong> {result}</Typography>
              <IconButton size="small" onClick={() => handleCopy(result)} aria-label="copy-epoch"><ContentCopyIcon fontSize="small" /></IconButton>
            </Box>
          </Box>
        )}
      </CardContent>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} message={snackbarMsg} />
    </Card>
  );
};

export default HumanConverter;
