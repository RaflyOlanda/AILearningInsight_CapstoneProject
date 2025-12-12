import React from 'react';
import Card from '../../components/ui/card';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';
import { useNavigate } from 'react-router-dom';

const LeaderboardCard = () => {
  const navigate = useNavigate();
  const { userId, user } = useUser();
  const { data: leaderboard, loading } = useFetch('/dashboard/leaderboard');

  const leaderboardArray = (leaderboard && Array.isArray(leaderboard)) ? leaderboard : [];
  const topUsers = leaderboardArray.slice(0, 5);

  const getMedalColor = (rank) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-700';
    if (rank === 2) return 'bg-gray-200 text-gray-700';
    if (rank === 3) return 'bg-orange-100 text-orange-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <Card className="p-0 shadow-soft rounded-xl border border-gray-200 overflow-hidden h-[275px] w-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="font-semibold text-sm">Leaderboard</div>
        <button onClick={() => navigate('/leaderboard')} className="text-[11px] text-blue-600 hover:text-blue-700 cursor-pointer">View All &gt;</button>
      </div>
      <ul className="divide-y divide-gray-100 overflow-y-auto flex-1 min-h-0 max-h-[260px]">
        {loading ? (
          <li className="px-4 py-3 text-center text-xs text-gray-500">Loading leaderboard...</li>
        ) : topUsers.length > 0 ? (
          <>
            {topUsers.map((u) => (
              <li key={u.rank} className="px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full ${getMedalColor(u.rank)}`}>
                    {u.rank}
                  </span>
                  <span className="truncate text-[13px] text-gray-700">{u.name}</span>
                </div>
                <span className="text-[11px] font-semibold text-gray-500">{u.xp} XP</span>
              </li>
            ))}
          </>
        ) : (
          <li className="px-4 py-3 text-center text-xs text-gray-500">No data</li>
        )}
      </ul>
    </Card>
  );
};
export default LeaderboardCard;