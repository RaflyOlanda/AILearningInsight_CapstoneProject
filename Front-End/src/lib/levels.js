


export const TOTAL_LEVELS = 50;
export const LEVELS_PER_TIER = 10;
export const TOTAL_TIERS = TOTAL_LEVELS / LEVELS_PER_TIER; 
export const XP_PER_TIER = 6000;
export const XP_PER_LEVEL = XP_PER_TIER / LEVELS_PER_TIER; 
export const MAX_XP = XP_PER_TIER * TOTAL_TIERS; 

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}


export function getLevelInfo(rawXp) {
  const xp = Number(rawXp) || 0;
  const cappedXp = Math.min(xp, MAX_XP);

  
  
  const levelIndex = Math.min(Math.floor(cappedXp / XP_PER_LEVEL), TOTAL_LEVELS - 1); 
  const level = levelIndex + 1; 

  const tier = clamp(Math.ceil(level / LEVELS_PER_TIER), 1, TOTAL_TIERS); 

  const currentLevelBaseXp = levelIndex * XP_PER_LEVEL; 
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
    level, 
    tier, 
    xpIntoLevel,
    xpForThisLevel,
    levelProgress, 
    currentLevelBaseXp,
    nextLevelBaseXp,
    xpIntoTier,
    xpForThisTier,
    tierProgress, 
    currentTierBaseXp,
    nextTierBaseXp,
    xpToMax,
  };
}

export function getUnlockedTierFromLevel(level) {
  
  
  return clamp(Math.floor(Number(level) / LEVELS_PER_TIER), 0, TOTAL_TIERS);
}

export function getUnlockedTierFromXp(xp) {
  const { level } = getLevelInfo(xp);
  return getUnlockedTierFromLevel(level);
}
