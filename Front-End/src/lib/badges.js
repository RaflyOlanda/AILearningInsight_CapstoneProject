import KnowledgeSeekerBadge from '../assets/images/Knowledge Seeker (tier 1).png';
import SkillExplorerBadge from '../assets/images/Skill Explorer (tier 2).png';
import CreativePractitionerBadge from '../assets/images/Creative Practitioner (tier 3).png';
import InsightSpecialistBadge from '../assets/images/Insight Specialist (tier 4).png';
import MasterofLearningBadge from '../assets/images/Master of Learning (tier 5).png';

const BADGE_DATA = [
  { id: 'seeker', name: 'Knowledge Seeker', tier: 1, image: KnowledgeSeekerBadge, color: '#f59e0b' },
  { id: 'explorer', name: 'Skill Explorer', tier: 2, image: SkillExplorerBadge, color: '#94a3b8' },
  { id: 'creative', name: 'Creative Practitioner', tier: 3, image: CreativePractitionerBadge, color: '#fbbf24' },
  { id: 'insight', name: 'Insight Specialist', tier: 4, image: InsightSpecialistBadge, color: '#10b981' },
  { id: 'master', name: 'Master of Learning', tier: 5, image: MasterofLearningBadge, color: '#8b5cf6' },
];

export const findBadgeById = (id) => BADGE_DATA.find((badge) => badge.id === id) || null;

export default BADGE_DATA;
