/**
 * Utility functions for storing and retrieving QR history in browser localStorage.
 */

const STORAGE_KEY = 'qr_studio_history_v1';
const MAX_HISTORY_ITEMS = 30;

/**
 * Loads saved QR history items from localStorage.
 * @returns {Array} Array of history objects
 */
export const loadHistory = () => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return [];
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load QR history from localStorage:', error);
    return [];
  }
};

/**
 * Saves a new QR entry to the top of the history list.
 * @param {object} newItem
 * @returns {Array} Updated history array
 */
export const saveHistoryItem = (newItem) => {
  try {
    const current = loadHistory();
    // Filter out potential duplicate payloads if saved recently to avoid clutter
    const filtered = current.filter(item => item.payload !== newItem.payload || item.type !== newItem.type);
    
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save QR item to localStorage:', error);
    return loadHistory();
  }
};

/**
 * Deletes a single history item by ID.
 * @param {string} id 
 * @returns {Array} Updated history array
 */
export const deleteHistoryItem = (id) => {
  try {
    const current = loadHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete history item:', error);
    return loadHistory();
  }
};

/**
 * Clears all saved QR history.
 * @returns {Array} Empty array
 */
export const clearAllHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history from localStorage:', error);
  }
  return [];
};
