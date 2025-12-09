import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaRegUserCircle, FaChevronDown, FaTrophy, FaMedal, FaStar, FaTimes, FaTachometerAlt, FaCog, FaSignOutAlt, FaLock } from 'react-icons/fa';
import './navbar.css';
import StarBorder from '../ui/starborder';
import DicodingLogo from '../../assets/images/dicoding.png';
import KnowledgeSeekerBadge from '../../assets/images/Knowledge Seeker (tier 1).png';
import SkillExplorerBadge from '../../assets/images/Skill Explorer (tier 2).png';
import CreativePractitionerBadge from '../../assets/images/Creative Practitioner (tier 3).png';
import InsightSpecialistBadge from '../../assets/images/Insight Specialist (tier 4).png';
import MasterofLearningBadge from '../../assets/images/Master of Learning (tier 5).png';
import { useUser } from '../../context/usercontext';
import { useFetch } from '../../hooks/usefetch';
import { getLevelInfo, getUnlockedTierFromXp, XP_PER_TIER } from '../../lib/levels';
import LoginModal from '../ui/loginmodal';


const BADGE_DATA = [
  { id: 'seeker', name: 'Knowledge Seeker', tier: 1, image: KnowledgeSeekerBadge, color: '#f59e0b' }, 
  { id: 'explorer', name: 'Skill Explorer', tier: 2, image: SkillExplorerBadge, color: '#94a3b8' }, 
  { id: 'creative', name: 'Creative Practitioner', tier: 3, image: CreativePractitionerBadge, color: '#fbbf24' },
  { id: 'insight', name: 'Insight Specialist', tier: 4, image: InsightSpecialistBadge, color: '#10b981' }, 
  { id: 'master', name: 'Master of Learning', tier: 5, image: MasterofLearningBadge, color: '#8b5cf6' }, 
];


// --- KOMPONEN MODAL BADGE BARU ---
const BadgeSelectorModal = ({ isOpen, onClose, currentBadge, onSelect, unlockedTier = 1, levelInfo }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    // Overlay 
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-1000 p-4" role="dialog" aria-modal="true">
      
      {/* Modal Content */}
      <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto relative">
        
        {/* Header Modal */}
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-bold">Pilih Badge Anda</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition" aria-label="Tutup">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Daftar Badge */}
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          {BADGE_DATA.map((badge) => {
            const locked = Number(badge.tier) > Number(unlockedTier);
            const requiredLevel = Number(badge.tier) * 10;
            const requiredXp = Number(badge.tier) * XP_PER_TIER;
            const userXp = Number(levelInfo?.xp || 0);
            const pct = Math.min(100, Math.floor((userXp / requiredXp) * 100));
            const xpNeeded = Math.max(0, requiredXp - userXp);
            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (!locked) onSelect(badge);
                }}
                className={`group p-3 rounded-lg transition duration-150 border ${
                  locked
                    ? 'bg-muted border-border cursor-not-allowed'
                    : currentBadge.id === badge.id
                      ? 'bg-accent border-primary cursor-pointer'
                      : 'bg-card hover:bg-muted border-border cursor-pointer'
                }`}
                title={locked ? `Terkunci — butuh Level ${requiredLevel} (${requiredXp.toLocaleString('id-ID')} XP)` : ''}
              >
                {/* Top row */}
                <div className="flex items-center">
                  <img src={badge.image} alt={badge.name} className={`w-10 h-10 mr-4 object-contain ${locked ? 'grayscale' : ''}`} />
                  <div className="flex flex-col grow min-w-0">
                    <span className={`font-semibold truncate ${locked ? 'text-muted-foreground' : ''}`}>{badge.name}</span>
                    <span className="text-xs text-muted-foreground">Tier {badge.tier}</span>
                  </div>
                  {!locked && currentBadge.id === badge.id && (
                    <FaStar className="text-indigo-500" />
                  )}
                  {locked && (
                    <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <FaLock />
                      <span>Level {requiredLevel}</span>
                    </div>
                  )}
                </div>

                {/* Bottom progress for locked */}
                {locked && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-muted-foreground" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">Butuh {xpNeeded.toLocaleString('id-ID')} XP lagi</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Footer Modal */}
        <div className="p-4 border-t border-border text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};


// --- KOMPONEN NAVBAR UTAMA ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // dropdown profile
  const [loginOpen, setLoginOpen] = useState(false); // modal login
  const [badgeOpen, setBadgeOpen] = useState(false); // modal pilih badge
  const [currentBadge, setCurrentBadge] = useState(BADGE_DATA[0]);
  const dropdownRef = useRef(null); // klik di luar dropdown
  const { userId, logout } = useUser();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { data: profile } = useFetch(userId ? `/dashboard/learning-profile/${userId}` : null);
  const xp = Number(profile?.xp) || 0;
  const levelInfo = getLevelInfo(xp);
  const unlockedTier = getUnlockedTierFromXp(xp);
  const xpFormatted = xp.toLocaleString('id-ID');

  // Fungsi untuk menutup dropdown ketika klik di luar
  // Persist selected badge
  useEffect(() => {
    try {
      const raw = localStorage.getItem('selectedBadge');
      if (raw) {
        const parsed = JSON.parse(raw);
        const found = BADGE_DATA.find(b => b.id === parsed.id) || BADGE_DATA[0];
        setCurrentBadge(found);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (currentBadge) localStorage.setItem('selectedBadge', JSON.stringify(currentBadge));
    } catch {}
  }, [currentBadge]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fungsi untuk mengganti status buka/tutup
  const toggleDropdown = () => setIsOpen(prev => !prev);

  // Close with Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isAuthenticated = Boolean(userId || token);

  return (
    <nav className="navbar-container flex items-center justify-between w-full px-4 py-2 sticky top-0 z-50">
      <div className="navbar-left-section flex items-center gap-2">
        <img
          src={DicodingLogo}
          alt="Dicoding Logo"
          className="navbar-logo-image"
          onClick={() => { window.location.href = '/'; }}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="navbar-right-section flex items-center gap-3 relative ml-auto" ref={dropdownRef}>
        

        {!isAuthenticated ? (
          <button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm" onClick={() => setLoginOpen(true)}>
            Masuk
          </button>
        ) : (
          <>
            {/* Badge toggle only after login */}
            {(() => {
              const displayBadge = currentBadge && currentBadge.tier <= unlockedTier ? currentBadge : null;
              return (
                <StarBorder
                  as="button"
                  className="mr-3 hidden sm:inline-block align-middle"
                  color="#6366F1"
                  speed="8s"
                  thickness={1}
                  onClick={() => setBadgeOpen(true)}
                  title="Pilih badge"
                >
                  {displayBadge ? (
                    <>
                      <img src={displayBadge.image} alt={displayBadge.name} className="w-5 h-5 object-contain" />
                      <span className="text-sm">{displayBadge.name}</span>
                    </>
                  ) : (
                    <span className="text-sm">Pilih badge</span>
                  )}
                </StarBorder>
              );
            })()}
            {/* Profile Container: Diklik untuk toggle dropdown */}
            <div className="navbar-profile-container flex items-center gap-1 px-2 py-1 rounded-full" onClick={toggleDropdown} role="button" aria-haspopup="menu" aria-expanded={isOpen}>
              <FaRegUserCircle className="profile-avatar" />
              <FaChevronDown size={10} className={`navbar-dropdown-icon ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* --- Dropdown Menu (Popup) --- */}
            {isOpen && (
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-item">
                  <FaTrophy className="dropdown-icon-trophy" /> Level {levelInfo.level} / 50
                </div>
                <div className="dropdown-item">
                  <FaMedal className="dropdown-icon-medal" /> {xpFormatted} XP
                </div>
                <div className="px-4 py-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: `${Math.round(levelInfo.levelProgress * 100)}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-gray-500">Progress level: {Math.round(levelInfo.levelProgress * 100)}%</div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" role="menuitem" onClick={() => { setBadgeOpen(true); setIsOpen(false); }}>
                  <FaStar className="dropdown-icon-generic" /> Pilih Badge
                </div>
                <div className="dropdown-item" role="menuitem" onClick={() => { setIsOpen(false); window.location.href = '/dashboard'; }}>
                  <FaTachometerAlt className="dropdown-icon-generic" /> Dashboard
                </div>
                <div className="dropdown-item" role="menuitem" onClick={() => { setIsOpen(false); /* open settings placeholder */ }}>
                  <FaCog className="dropdown-icon-generic" /> Settings
                </div>
                <div className="dropdown-divider"></div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    window.location.href = '/';
                  }}
                >
                  <FaSignOutAlt className="dropdown-icon-generic" /> Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Login Modal when logged out */}
      {!isAuthenticated && (
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      )}

      {/* Badge selector modal */}
      <BadgeSelectorModal
        isOpen={badgeOpen}
        onClose={() => setBadgeOpen(false)}
        currentBadge={currentBadge}
        onSelect={(badge) => { setCurrentBadge(badge); setBadgeOpen(false); }}
        unlockedTier={unlockedTier}
        levelInfo={levelInfo}
      />
    </nav>
  );
};

export default Navbar;