const THEME_STORAGE_KEY = 'userThemes';
const BADGE_STORAGE_KEY = 'selectedBadges';
export const PREFERENCE_EVENT = 'user-preferences-updated';

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const readMap = (storageKey) => {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(storageKey);
  const parsed = safeParse(raw, {});
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    return parsed;
  }
  return {};
};

const writeMap = (storageKey, map) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(map));
  } catch (err) {
    console.warn(`Failed to persist ${storageKey}:`, err);
  }
};

export const readThemeMap = () => readMap(THEME_STORAGE_KEY);

export const readThemeForUser = (userId) => {
  if (typeof window === 'undefined') return null;
  const themes = readThemeMap();
  const stored = userId ? themes[userId] : null;
  return stored || null;
};

export const writeThemeForUser = (userId, theme) => {
  if (typeof window === 'undefined') return;
  try {
    const value = theme || 'default';
    if (userId) {
      const themes = readThemeMap();
      themes[userId] = value;
      writeMap(THEME_STORAGE_KEY, themes);
    }
  } catch (err) {
    console.warn('Failed to write theme preference:', err);
  }
};

export const readBadgeMap = () => readMap(BADGE_STORAGE_KEY);

export const readBadgeForUser = (userId) => {
  if (!userId) return null;
  const badges = readBadgeMap();
  const stored = badges[userId];
  if (!stored) return null;
  if (typeof stored === 'string') return stored;
  if (stored && typeof stored === 'object' && stored.id) return stored.id;
  return null;
};

export const writeBadgeForUser = (userId, badgeId) => {
  if (typeof window === 'undefined' || !userId) return;
  try {
    const badges = readBadgeMap();
    if (badgeId) {
      badges[userId] = badgeId;
    } else {
      delete badges[userId];
    }
    writeMap(BADGE_STORAGE_KEY, badges);
  } catch (err) {
    console.warn('Failed to write badge preference:', err);
  }
};

export const emitPreferencesEvent = (detail = {}) => {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent(PREFERENCE_EVENT, { detail }));
  } catch (err) {
    console.warn('Failed to emit preference event:', err);
  }
};

export const getThemeStorageKey = () => THEME_STORAGE_KEY;
export const getBadgeStorageKey = () => BADGE_STORAGE_KEY;