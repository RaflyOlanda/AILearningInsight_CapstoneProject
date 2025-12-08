// Leveling system utilities
// Config: 50 levels, 5 tiers, 6000 XP per tier, 600 XP per level, 30000 XP max

export const TOTAL_LEVELS = 50;
export const LEVELS_PER_TIER = 10;
export const TOTAL_TIERS = TOTAL_LEVELS / LEVELS_PER_TIER; // 5
export const XP_PER_TIER = 6000;
export const XP_PER_LEVEL = XP_PER_TIER / LEVELS_PER_TIER; // 600
export const MAX_XP = XP_PER_TIER * TOTAL_TIERS; // 30000

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

// Compute level, tier, and progress from XP
export function getLevelInfo(rawXp) {
  const xp = Number(rawXp) || 0;
  const cappedXp = Math.min(xp, MAX_XP);

  // Map XP to level 1..50
  // Ensure XP == MAX_XP still returns level 50
  const levelIndex = Math.min(Math.floor(cappedXp / XP_PER_LEVEL), TOTAL_LEVELS - 1); // 0..49
  const level = levelIndex + 1; // 1..50

  const tier = clamp(Math.ceil(level / LEVELS_PER_TIER), 1, TOTAL_TIERS); // 1..5

  const currentLevelBaseXp = levelIndex * XP_PER_LEVEL; // base XP for current level
  const nextLevelBaseXp = Math.min((levelIndex + 1) * XP_PER_LEVEL, MAX_XP);
  const xpIntoLevel = cappedXp - currentLevelBaseXp;
  const xpForThisLevel = nextLevelBaseXp - currentLevelBaseXp || XP_PER_LEVEL;
  const levelProgress = clamp(xpForThisLevel ? xpIntoLevel / xpForThisLevel : 0, 0, 1);

  const currentTierBaseXp = (tier - 1) * XP_PER_TIER;
  const nextTierBaseXp = Math.min(tier * XP_PER_TIER, MAX_XP);
  const xpIntoTier = cappedXp - currentTierBaseXp;
  const xpForThisTier = nextTierBaseXp - currentTierBaseXp || XP_PER_TIER;
  const tierProgress = clamp(xpForThisTier ? xpIntoTier / xpForThisTier : 0, 0, 1);

  const xpToMax = Math.max(0, MAX_XP - cappedXp);

  return {
    xp: cappedXp,
    level, // 1..50
    tier, // 1..5
    xpIntoLevel,
    xpForThisLevel,
    levelProgress, // 0..1
    currentLevelBaseXp,
    nextLevelBaseXp,
    xpIntoTier,
    xpForThisTier,
    tierProgress, // 0..1
    currentTierBaseXp,
    nextTierBaseXp,
    xpToMax,
  };
}

export function getUnlockedTierFromLevel(level) {
  // Unlock tiers at levels 10, 20, 30, 40, 50.
  // For level < 10, unlockedTier = 0 (no badge available yet).
  return clamp(Math.floor(Number(level) / LEVELS_PER_TIER), 0, TOTAL_TIERS);
}

export function getUnlockedTierFromXp(xp) {
  const { level } = getLevelInfo(xp);
  return getUnlockedTierFromLevel(level);
}
