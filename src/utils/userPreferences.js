// Utility functions for managing user preferences in localStorage

export const getUserPreference = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(`timestamp-converter-${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.warn(`Error reading preference ${key}:`, error);
    return defaultValue;
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
