import React, { useState, useRef, useEffect } from 'react';

import { FaRegUserCircle, FaChevronDown, FaTrophy, FaMedal, FaStar, FaTimes } from 'react-icons/fa'; 


import StarBorder from '../ui/starborder'; 


import DicodingLogo from '../../assets/images/dicoding.png'; 
import KnowledgeSeekerBadge from '../../assets/images/Knowledge Seeker (tier 1).png';
import SkillExplorerBadge from '../../assets/images/Skill Explorer (tier 2).png';
import CreativePractitionerBadge from '../../assets/images/Creative Practitioner (tier 3).png';
import InsightSpecialistBadge from '../../assets/images/Insight Specialist (tier 4).png';
import MasterofLearningBadge from '../../assets/images/Master of Learning (tier 5).png';


import { useUser } from '../../context/usercontext';
import { useFetch } from '../../hooks/usefetch';


const BADGE_DATA = [
  { id: 'seeker', name: 'Knowledge Seeker', tier: 1, image: KnowledgeSeekerBadge, color: '#f59e0b' }, 
  { id: 'explorer', name: 'Skill Explorer', tier: 2, image: SkillExplorerBadge, color: '#94a3b8' }, 
  { id: 'creative', name: 'Creative Practitioner', tier: 3, image: CreativePractitionerBadge, color: '#fbbf24' },
  { id: 'insight', name: 'Insight Specialist', tier: 4, image: InsightSpecialistBadge, color: '#10b981' }, 
  { id: 'master', name: 'Master of Learning', tier: 5, image: MasterofLearningBadge, color: '#8b5cf6' }, 
];


// --- KOMPONEN MODAL BADGE BARU ---
const BadgeSelectorModal = ({ isOpen, onClose, currentBadge, onSelect }) => {
  if (!isOpen) return null;

  return (
    // Overlay 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        
        {/* Header Modal */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Pilih Badge Anda</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Daftar Badge */}
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          {BADGE_DATA.map((badge) => (
            <div
              key={badge.id}
              onClick={() => onSelect(badge)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-150 border-2 ${
                currentBadge.id === badge.id 
                  ? 'bg-indigo-50 border-indigo-500' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
            >
              {/* Gambar Badge: w-10 h-10 agar menonjol di modal */}
              <img src={badge.image} alt={badge.name} className="w-10 h-10 mr-4 object-contain" />
              
              <span className="font-semibold text-gray-800 flex-grow">{badge.name}</span>
              <span className="text-xs text-gray-500 mr-2">Tier {badge.tier}</span>
              
              {currentBadge.id === badge.id && (
                <FaStar className="text-indigo-500" /> 
              )}
            </div>
          ))}
        </div>
        
        {/* Footer Modal */}
        <div className="p-4 border-t text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};


// --- KOMPONEN NAVBAR UTAMA ---
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false); 
  // Inisialisasi dengan Master of Learning (Tier 5)
  const [activeBadge, setActiveBadge] = useState(BADGE_DATA.find(b => b.id === 'master') || BADGE_DATA[0]); 
  
  const dropdownRef = useRef(null); 
  const { userId } = useUser();
  const { data: profile } = useFetch(userId ? `/dashboard/learning-profile/${userId}` : null);
  const xp = Number(profile?.xp) || 0;
  const xpFormatted = xp.toLocaleString('id-ID');

  // Fungsi untuk menutup dropdown ketika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handler untuk memilih badge dan menutup modal
  const handleBadgeSelect = (badge) => {
    setActiveBadge(badge);
    // Tambahkan logika penyimpanan badge di sini jika diperlukan
    setIsBadgeModalOpen(false);
  };
  
  // Handler untuk membuka modal badge
  const openBadgeModal = (e) => {
      e.stopPropagation(); 
      setIsDropdownOpen(false); 
      setIsBadgeModalOpen(true);
  }

  return (
    // 1. Navbar Container
    <nav className="flex justify-between items-center px-6 py-1.5 bg-white border-b border-gray-200 h-16 shadow-sm relative z-10">
      
      {/* 1.1 Left Section (Logo) */}
      <div className="flex items-center">
        <img 
          src={DicodingLogo} 
          alt="Dicoding Logo" 
          className="h-8 w-auto mr-7" 
        />
      </div>

      {/* 1.2 Right Section */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}> 
        
        {/* --- BADGE SELECTOR BUTTON DENGAN STARBORDER --- */}
        <StarBorder
          as="button"
          onClick={openBadgeModal}
          className="hidden sm:inline-block border-none inline-flex" 
          // Warna animasi sesuai badge aktif
          color={activeBadge.color || '#a78bfa'} 
          speed="4s" 
        >
          {/* Konten Anak: Gambar Badge (w-6 h-6) dan Nama */}
          <img src={activeBadge.image} alt={activeBadge.name} className="w-6 h-6 object-contain" />
          <span className="text-sm font-medium">
            {activeBadge.name}
          </span>
        </StarBorder>
        
        {/* Profile Container: Diklik untuk toggle dropdown */}
        <div 
          className="flex items-center gap-2 cursor-pointer transition duration-150 p-1 rounded-lg hover:bg-gray-50" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FaRegUserCircle className="text-[32px] text-[#333366]" /> 
          <FaChevronDown 
            size={10} 
            className={`text-[#333366] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {/* --- Dropdown Menu --- */}
        {isDropdownOpen && ( 
          <div className="absolute top-full right-0 mt-2.5 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] z-20 overflow-hidden">
            <div className="flex items-center px-4 py-3 text-gray-700 text-sm cursor-pointer transition duration-200 hover:bg-gray-50">
              <FaTrophy className="text-[#fdd835] mr-3 text-lg" /> 0 Points
            </div>
            <div className="flex items-center px-4 py-3 text-gray-700 text-sm cursor-pointer transition duration-200 hover:bg-gray-50">
              <FaMedal className="text-[#42a5f5] mr-3 text-lg" /> {xpFormatted} XP
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex items-center px-4 py-3 text-gray-700 text-sm cursor-pointer transition duration-200 hover:bg-gray-50">
              <FaRegUserCircle className="text-gray-600 mr-3 text-lg" /> Dashboard
            </div>
            <div className="flex items-center px-4 py-3 text-gray-700 text-sm cursor-pointer transition duration-200 hover:bg-gray-50">
              <FaRegUserCircle className="text-gray-600 mr-3 text-lg" /> Settings
            </div>
          </div>
        )}
      </div>

      {/* --- RENDER MODAL BADGE --- */}
      <BadgeSelectorModal 
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        currentBadge={activeBadge}
        onSelect={handleBadgeSelect}
      />
    </nav>
  );
};

export default Navbar;