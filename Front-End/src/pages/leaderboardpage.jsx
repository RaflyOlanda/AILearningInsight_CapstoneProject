import React from 'react';
import DashboardLayout from '../components/layouts/dashboardlayout';
import Card from '../components/ui/card';
import { useFetch } from '../hooks/usefetch';
import { useUser } from '../context/usercontext';
import { useTheme } from '../context/themecontext';
import { useNavigate } from 'react-router-dom';
import { GiCrown } from 'react-icons/gi';

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
  const { theme } = useTheme();
  const { data, loading, error } = useFetch('/dashboard/leaderboard');
  const list = Array.isArray(data) ? data : [];
  const getCrownClass = (rank) => {
    if (rank === 1) return 'text-[#FFD700]';   
    if (rank === 2) return 'text-[#708090]';    
    if (rank === 3) return 'text-[#CD7F32]';    
    return 'text-gray-500';
  };
  const topFive = list.slice(0, 5);
  const topTen = list.slice(0, 10);
  const you = list.find(u => String(u.user_id) === String(userId));
  const { data: youData } = useFetch(you || !userId ? '' : `/dashboard/leaderboard/me/${userId}`);
  const youDisplay = you || youData || null;

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className={`text-xl font-semibold ${
          theme === 'particles' ? 'text-white' : 
          theme === 'retro' ? 'text-white' : 
          'text-gray-800'
        }`}>Leaderboard</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
            theme === 'particles' ? 'border-gray-500 text-white hover:bg-gray-700' :
            theme === 'retro' ? 'border-white/30 text-white hover:bg-white/10' :
            'border-gray-300 text-gray-800 hover:bg-gray-50'
          }`}
        >
          Back to Dashboard
        </button>
      </div>
      <div className="grid gap-6">
        <Card className={`p-6 ${
          theme === 'particles' ? 'bg-gradient-to-b from-slate-700 to-card' : 
          theme === 'retro' ? 'bg-gradient-to-b from-blue-900/20 to-card' : 
          'bg-gradient-to-b from-slate-50 to-card'
        }`}>
          <div className="flex items-end justify-center gap-6 sm:gap-10">
            {([3, 1, 0, 2, 4].map(i => topFive[i] ? { ...topFive[i], actualRank: i + 1 } : null).filter(Boolean)).map((p, idx) => {
              const heights = [100, 160, 200, 140, 80];
              const h = heights[idx];
              const rank = p.actualRank;
              const ringTone = rank === 1 ? 'ring-yellow-400' : rank === 2 ? 'ring-slate-400' : rank === 3 ? 'ring-orange-400' : 'ring-slate-300';
              const columnTone = rank === 1
                ? 'bg-gradient-to-t from-yellow-500 to-yellow-400 text-white'
                : rank === 2
                  ? 'bg-gradient-to-t from-slate-400 to-slate-300 text-white'
                  : rank === 3
                    ? 'bg-gradient-to-t from-orange-500 to-orange-400 text-white'
                    : 'bg-gradient-to-t from-slate-200 to-slate-100 text-slate-700';
              return (
                <div key={rank} className="flex flex-col items-center">
                  {rank <= 3 && (
                    <div className={`mb-2 text-4xl ${getCrownClass(rank)}`}>
                      <GiCrown />
                    </div>
                  )}
                  <div className={`relative -mb-3 mt-1 p-1.5 rounded-full ring-2 ${ringTone} bg-white shadow-md`}>
                    <Avatar name={p.name} src={p.avatar} size={rank === 1 ? 60 : 50} />
                  </div>
                  <div
                    className={`w-14 sm:w-16 rounded-t-xl shadow-md ${columnTone}`}
                    style={{ height: h, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}
                  />
                  <div className={`mt-3 text-[13px] font-semibold ${
                    theme === 'particles' ? 'text-white' : 
                    theme === 'retro' ? 'text-white' : 
                    'text-slate-800'
                  } max-w-[88px] text-center truncate`}>
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
                {topTen.map((u, index) => {
                  const rank = index + 1;
                  const isCurrentUser = String(u.user_id) === String(userId);
                  let rowClass = 'flex items-center justify-between rounded-xl px-4 py-3 border shadow-sm transition-all hover:shadow-md';
                  if (theme === 'particles') {
                    if (rank === 1) rowClass += ' bg-yellow-700/40 border-yellow-600/70 text-white';
                    else if (rank === 2) rowClass += ' bg-slate-600/60 border-slate-500/70 text-white';
                    else if (rank === 3) rowClass += ' bg-orange-700/40 border-orange-600/70 text-white';
                    else rowClass += ' bg-slate-700/50 border-slate-600 text-white';
                  } else if (theme === 'retro') {
                    if (rank === 1) rowClass += ' bg-yellow-600/30 border-yellow-500/70 text-white';
                    else if (rank === 2) rowClass += ' bg-slate-500/40 border-slate-400/70 text-white';
                    else if (rank === 3) rowClass += ' bg-orange-600/30 border-orange-500/70 text-white';
                    else rowClass += ' bg-blue-900/30 border-blue-700/50 text-white';
                  } else {
                    if (rank === 1) rowClass += ' bg-yellow-50 border-yellow-300 shadow-yellow-100';
                    else if (rank === 2) rowClass += ' bg-gray-100 border-gray-400 shadow-gray-20';
                    else if (rank === 3) rowClass += ' bg-orange-50 border-orange-300 shadow-orange-100';
                    else rowClass += ' bg-card border-border';
                  }
                  return (
                    <li key={index}>
                      <div className={rowClass}>
                        <div className="flex items-center gap-3 min-w-0">
                          {rank <= 3 ? (
                            <div className={`text-xl drop-shadow-md ${getCrownClass(rank)}`}>
                              <GiCrown />
                            </div>
                          ) : (
                            <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-white bg-slate-400`}>{rank}</div>
                          )}
                          <Avatar name={u.name} src={u.avatar} size={rank <= 3 ? 34 : 38} />
                          <span className={`truncate text-sm font-medium ${
                            theme === 'particles' ? 'text-white' :
                            theme === 'retro' ? 'text-white' :
                            rank === 1 ? 'text-yellow-700' : rank === 2 ? 'text-slate-700' : rank === 3 ? 'text-orange-700' : isCurrentUser ? 'text-primary font-semibold' : 'text-foreground'
                          }`}>
                            {isCurrentUser ? 'You' : u.name}
                          </span>
                        </div>
                        <div className={`text-sm font-bold ${
                          theme === 'particles' ? 'text-white' :
                          theme === 'retro' ? 'text-white' :
                          rank === 1 ? 'text-yellow-600' : rank === 2 ? 'text-slate-600' : rank === 3 ? 'text-orange-600' : 'text-foreground/70'
                        }`}>{u.xp} pts</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {youDisplay && (
                <div className="mt-6">
                  <div className={`text-xs mb-2 ${
                    theme === 'particles' ? 'text-gray-400' :
                    theme === 'retro' ? 'text-gray-300' :
                    'text-gray-500'
                  }`}>Posisi kamu saat ini</div>
                  <div className={`flex items-center justify-between rounded-full px-4 py-3 shadow-sm ${
                    theme === 'particles' ? 'bg-slate-700 border border-slate-600' :
                    theme === 'retro' ? 'bg-blue-900/40 border border-blue-700/50' :
                    'bg-white'
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold ${
                        theme === 'particles' ? 'bg-indigo-600 text-white' :
                        theme === 'retro' ? 'bg-indigo-600 text-white' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>{youDisplay.rank}</div>
                      <Avatar name={youDisplay.name} src={youDisplay.avatar} />
                      <span className={`truncate text-sm font-semibold ${
                        theme === 'particles' ? 'text-white' :
                        theme === 'retro' ? 'text-white' :
                        'text-indigo-700'
                      }`}>You</span>
                    </div>
                    <div className={`text-sm font-semibold ${
                      theme === 'particles' ? 'text-white' :
                      theme === 'retro' ? 'text-white' :
                      'text-gray-700'
                    }`}>{youDisplay.xp} pts</div>
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
