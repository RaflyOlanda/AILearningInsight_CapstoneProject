// src/modules/leaderboard/LeaderboardCard.jsx
import React from 'react';
import Card from '../../components/ui/card';

const mockLeaders = [
  { rank: 1, name: 'Rafly Pratama Olanda', xp: '21000' },
  { rank: 2, name: 'Khalil Pradipta Lee', xp: '20000' },
  { rank: 3, name: 'Farhan Imandudin', xp: '19900' },
  { rank: 4, name: 'Democa Gaardy Nugroho', xp: '19400' },
  { rank: 5, name: 'Rofi Chaulee', xp: '19358' },
];

const youEntry = { rank: 6, name: 'You', xp: '18000' };

const LeaderboardCard = () => {
  return (
    <Card className="p-0 shadow-soft rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="font-semibold text-sm">Leaderboard</div>
        <button className="text-[11px] text-gray-500 hover:text-gray-700">View All &gt;</button>
      </div>
      <ul className="divide-y divide-gray-100">
        {mockLeaders.map((u) => (
          <li key={u.rank} className="px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full ${u.rank === 1 ? 'bg-yellow-100 text-yellow-700' : u.rank === 2 ? 'bg-gray-200 text-gray-700' : u.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>{u.rank}</span>
              <span className="truncate text-[13px] text-gray-700">{u.name}</span>
            </div>
            <span className="text-[11px] font-semibold text-gray-500">{u.xp} XP</span>
          </li>
        ))}
        {/* Your credential entry */}
        <li key="you" className="px-4 py-2.5 flex items-center justify-between bg-indigo-50/40">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full bg-indigo-100 text-indigo-700">{youEntry.rank}</span>
            <span className="truncate text-[13px] font-semibold text-indigo-700">{youEntry.name}</span>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600">{youEntry.xp} XP</span>
        </li>
      </ul>
    </Card>
  );
};
export default LeaderboardCard;