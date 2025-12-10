import React from 'react';
import DashboardLayout from '../../components/layouts/dashboardlayout';
import Card from '../../components/ui/card';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';
import { FaCrown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Avatar = ({ name, src, size = 40 }) => {
  if (src) {
    return <img src={src} alt={name} className={`rounded-full object-cover`} style={{ width: size, height: size }} />;
  }
  const initial = (name || '?').charAt(0).toUpperCase();
  return (
    <div className="rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold" style={{ width: size, height: size, fontSize: size/2.8 }}>
      {initial}
    </div>
  );
};

const RankPill = ({ rank, children }) => {
  let cls = 'bg-white';
  if (rank === 1) cls = 'bg-yellow-400 text-black';
  else if (rank === 2) cls = 'bg-white';
  else if (rank === 3) cls = 'bg-orange-400 text-white';
  return (
    <div className={`flex items-center justify-between rounded-full px-4 py-3 shadow-sm ${cls}`}>
      {children}
    </div>
  );
};

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const { data, loading, error } = useFetch('/dashboard/leaderboard');
  const list = Array.isArray(data) ? data : [];

  const topThree = list.slice(0, 3);
  const topFive = list.slice(0, 5);
  const topTen = list.slice(0, 10);
  const you = list.find(u => String(u.user_id) === String(userId));
  
  const { data: youData } = useFetch(you || !userId ? '' : `/dashboard/leaderboard/me/${userId}`);
  const youDisplay = you || youData || null;

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Leaderboard</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid gap-6">
        <Card className="p-6 bg-gradient-to-b from-sky-200/70 to-white">
          <div className="flex items-end justify-center gap-6 sm:gap-10">
            {([3,1,0,2,4].map(i => topFive[i]).filter(Boolean)).map((p, idx) => {
              const heights = [110, 150, 200, 150, 110];
              const h = heights[idx];
              const rank = p.rank ?? (idx+1);
              const ringCls = rank===1 ? 'ring-amber-300/80' : rank===2 ? 'ring-slate-300/80' : rank===3 ? 'ring-orange-300/80' : 'ring-gray-300/70';
              return (
                <div key={rank} className="flex flex-col items-center">
                  <div className={`text-sm font-semibold ${rank===1? 'text-amber-500':'text-white/90'}`}>{rank}</div>
                  <div className={`relative -mb-4 mt-1 p-1 rounded-full ring-2 ${ringCls} bg-white`}>
                    <Avatar name={p.name} src={p.avatar} size={rank===1?60:48} />
                  </div>
                  <div
                    className="w-16 sm:w-20 bg-gradient-to-t from-rose-300 to-pink-300"
                    style={{
                      height: h,
                      clipPath: 'polygon(50% 0%, 100% 20%, 100% 100%, 0 100%, 0 20%)',
                      borderRadius: '0 0 12px 12px'
                    }}
                  />
                  <div className="mt-2 text-[13px] font-semibold text-gray-800 max-w-[84px] text-center truncate">
                    {p.name}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="p-4">
          {loading && <div className="text-sm text-gray-500">Loading leaderboard…</div>}
          {error && <div className="text-sm text-red-600">{String(error)}</div>}
          {!loading && !error && (
            <>
              <ul className="space-y-3">
                {topTen.map((u) => (
                  <li key={u.rank}>
                    <div className={`flex items-center justify-between rounded-full px-4 py-3 shadow-sm ${u.rank <= 3 ? 'bg-gradient-to-r ' + (u.rank === 1 ? 'from-yellow-400 to-amber-300' : u.rank === 2 ? 'from-slate-100 to-white' : 'from-orange-400 to-amber-400') : 'bg-white'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-black/10 text-xs flex items-center justify-center font-semibold">{u.rank}</div>
                        <Avatar name={u.name} src={u.avatar} size={u.rank <= 3 ? 28 : 40} />
                        <span className={`truncate text-sm ${String(u.user_id) === String(userId) ? 'font-semibold text-indigo-700' : 'text-gray-800'}`}>
                          {String(u.user_id) === String(userId) ? 'You' : u.name}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">{u.xp} pts</div>
                    </div>
                  </li>
                ))}
              </ul>
              {youDisplay && (
                <div className="mt-6">
                  <div className="text-xs text-gray-500 mb-2">Posisi kamu saat ini</div>
                  <div className="flex items-center justify-between rounded-full px-4 py-3 shadow-sm bg-white">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-semibold">{youDisplay.rank}</div>
                      <Avatar name={youDisplay.name} src={youDisplay.avatar} />
                      <span className="truncate text-sm font-semibold text-indigo-700">You</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">{youDisplay.xp} pts</div>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
