import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, Divider, Box, IconButton, Snackbar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { epochToDate } from '../utils/dateUtils';
import { timezones } from '../utils/timezones';
import { getLastUsedUnit, setLastUsedUnit, getLastUsedTimezone, setLastUsedTimezone } from '../utils/userPreferences';

const EpochConverter = () => {
  const [epoch, setEpoch] = useState('');
  const [unit, setUnit] = useState(() => getLastUsedUnit());
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [timezone, setTimezone] = useState(() => getLastUsedTimezone());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  // Save preferences when unit or timezone changes
  useEffect(() => {
    setLastUsedUnit(unit);
  }, [unit]);

  useEffect(() => {
    setLastUsedTimezone(timezone);
  }, [timezone]);

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
          <Typography variant="h6">Epoch to Human Date</Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Epoch Timestamp"
            variant="outlined"
            value={epoch}
            onChange={(e) => {
              const val = e.target.value.trim();
              setEpoch(val);
              // Auto-detect unit based on numeric length
              if (/^-?\d+$/.test(val)) {
                const len = val.replace(/^-/, '').length;
                let inferred = unit;
                if (len <= 10) inferred = 's';
                else if (len <= 13) inferred = 'ms';
                else if (len <= 16) inferred = 'μs';
                else inferred = 'ns';
                if (inferred !== unit) setUnit(inferred);
              }
            }}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2"><strong>UTC:</strong> {result.utc}</Typography>
              <IconButton size="small" onClick={() => handleCopy(result.utc)} aria-label="copy-utc"><ContentCopyIcon fontSize="small" /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2"><strong>Local:</strong> {result.local}</Typography>
              <IconButton size="small" onClick={() => handleCopy(result.local)} aria-label="copy-local"><ContentCopyIcon fontSize="small" /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2"><strong>ISO 8601:</strong> {result.iso}</Typography>
              <IconButton size="small" onClick={() => handleCopy(result.iso)} aria-label="copy-iso"><ContentCopyIcon fontSize="small" /></IconButton>
            </Box>
          </Box>
        )}
      </CardContent>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} message={snackbarMsg} />
    </Card>
  );
};

export default EpochConverter;
