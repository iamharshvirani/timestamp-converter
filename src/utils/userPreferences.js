// Utility functions for managing user preferences in localStorage

export const getUserPreference = (key, defaultValue) => {
  const saved = localStorage.getItem(`timestamp-converter-${key}`);

  // If nothing stored, return default immediately
  if (saved === null) {
    return defaultValue;
  }

  // Attempt to parse JSON-encoded values first
  try {
    return JSON.parse(saved);
  } catch (error) {
    // For legacy values that were stored as raw strings (not JSON encoded),
    // simply return the raw value instead of discarding the preference.
    console.warn(`Preference ${key} is not valid JSON, falling back to raw string value.`, error);
    return saved;
  }
};

export const setUserPreference = (key, value) => {
  try {
    localStorage.setItem(`timestamp-converter-${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving preference ${key}:`, error);
  }
};

export const removeUserPreference = (key) => {
  try {
    localStorage.removeItem(`timestamp-converter-${key}`);
  } catch (error) {
    console.warn(`Error removing preference ${key}:`, error);
  }
};

// Specific preference getters/setters
export const getLastUsedUnit = () => getUserPreference('lastUnit', 's');
export const setLastUsedUnit = (unit) => setUserPreference('lastUnit', unit);

export const getLastUsedTimezone = () => getUserPreference('lastTimezone', 'Asia/Kolkata');
export const setLastUsedTimezone = (timezone) => setUserPreference('lastTimezone', timezone);
