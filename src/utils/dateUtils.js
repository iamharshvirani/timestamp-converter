import { DateTime } from 'luxon';

/**
 * Converts epoch timestamp to date in various formats
 * 
 * @param {string|number} timestamp - The epoch timestamp to convert
 * @param {string} unit - The unit of the timestamp ('s', 'ms', 'μs', 'ns')
 * @param {string} timezone - The timezone to use for the conversion
 * @returns {Object} Object containing date in UTC, local, and ISO formats
 */
export const epochToDate = (timestamp, unit = 's', timezone = 'UTC') => {
  if (!timestamp) return null;

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

  const dt = DateTime.fromMillis(epochMs, { zone: timezone });
  if (!dt.isValid) return null;

  return {
    utc: dt.toUTC().toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'),
    local: dt.toLocal().toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'),
    iso: dt.toISO(),
  };
};

/**
 * Converts a human-readable date to epoch timestamp
 * 
 * @param {string} dateTimeStr - ISO format date string (YYYY-MM-DDTHH:mm)
 * @param {string} unit - The desired unit for output ('s', 'ms', 'μs', 'ns')
 * @param {string} timezone - The timezone to use for the conversion
 * @returns {number|null} The epoch timestamp in specified unit or null if invalid date
 */
export const dateToEpoch = (dateTimeStr, unit = 's', timezone = 'UTC') => {
  if (!dateTimeStr) return null;

  const dt = DateTime.fromISO(dateTimeStr, { zone: timezone });
  if (!dt.isValid) return null;
  
  const milliseconds = dt.toMillis();

  switch (unit) {
    case 's':
      return String(Math.floor(milliseconds / 1000));
    case 'ms':
      return String(milliseconds);
    case 'μs':
      return String(milliseconds * 1000);
    case 'ns':
      return String(milliseconds * 1000000);
    default:
      return String(milliseconds);
  }
};

/**
 * Gets the current timestamp in the specified unit
 * 
 * @param {string} unit - The desired unit ('s', 'ms', 'μs', 'ns')
 * @returns {number} Current timestamp in specified unit
 */
export const getCurrentTimestamp = (unit = 's') => {
  const now = DateTime.now();
  return dateToEpoch(now.toISO(), unit);
};

/**
 * Validates if a string is a valid date in ISO format
 * 
 * @param {string} dateTimeStr - ISO format date string to validate
 * @returns {boolean} Whether the date is valid
 */
export const isValidDate = (dateTimeStr) => {
  if (!dateTimeStr) return false;
  return DateTime.fromISO(dateTimeStr).isValid;
};
