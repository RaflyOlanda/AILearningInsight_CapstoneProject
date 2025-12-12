import React from 'react';
import DashboardLayout from '../../components/layouts/dashboardlayout';
import Card from '../../components/ui/card';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';
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

  const topFive = list.slice(0, 5);
  const topTen = list.slice(0, 10);
  const you = list.find(u => String(u.user_id) === String(userId));
  // Fallback: fetch current user's global rank if not present in top list
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
        {/* Podium */}
        <Card className="p-6 bg-gradient-to-b from-slate-50 to-card">
          <div className="flex items-end justify-center gap-6 sm:gap-10">
            {([3, 1, 0, 2, 4].map(i => topFive[i]).filter(Boolean)).map((p, idx) => {
              const heights = [120, 160, 200, 160, 120];
              const h = heights[idx];
              const rank = p.rank ?? (idx + 1);
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
                  <div className="text-xs font-semibold text-muted-foreground mb-1">{rank}</div>
                  <div className={`relative -mb-3 mt-1 p-1.5 rounded-full ring-2 ${ringTone} bg-white shadow-md`}>
                    <Avatar name={p.name} src={p.avatar} size={rank === 1 ? 60 : 50} />
                  </div>
                  <div
                    className={`w-14 sm:w-16 rounded-t-xl shadow-md ${columnTone}`}
                    style={{ height: h, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}
                  />
                  <div className="mt-3 text-[13px] font-semibold text-slate-800 max-w-[88px] text-center truncate">
                    {p.name}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Full list */}
        <Card className="p-4">
          {loading && <div className="text-sm text-gray-500">Loading leaderboard…</div>}
          {error && <div className="text-sm text-red-600">{String(error)}</div>}
          {!loading && !error && (
            <>
              {/* Top 10 */}
              <ul className="space-y-3">
                {topTen.map((u) => {
                  const isCurrentUser = String(u.user_id) === String(userId);
                  const baseRow = 'flex items-center justify-between rounded-xl px-4 py-3 border shadow-sm transition-all hover:shadow-md';
                  const highlight = u.rank === 1
                    ? 'bg-yellow-50 border-yellow-300 shadow-yellow-100'
                    : u.rank === 2
                      ? 'bg-slate-50 border-slate-300 shadow-slate-100'
                      : u.rank === 3
                        ? 'bg-orange-50 border-orange-300 shadow-orange-100'
                        : 'bg-card border-border';
                  return (
                    <li key={u.rank}>
                      <div className={`${baseRow} ${highlight}`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-white ${
                            u.rank === 1 ? 'bg-yellow-500' : u.rank === 2 ? 'bg-slate-500' : u.rank === 3 ? 'bg-orange-500' : 'bg-slate-400'
                          }`}>{u.rank}</div>
                          <Avatar name={u.name} src={u.avatar} size={u.rank <= 3 ? 34 : 38} />
                          <span className={`truncate text-sm font-medium ${
                            u.rank === 1 ? 'text-yellow-700' : u.rank === 2 ? 'text-slate-700' : u.rank === 3 ? 'text-orange-700' : isCurrentUser ? 'text-primary font-semibold' : 'text-foreground'
                          }`}>
                            {isCurrentUser ? 'You' : u.name}
                          </span>
                        </div>
                        <div className={`text-sm font-bold ${
                          u.rank === 1 ? 'text-yellow-600' : u.rank === 2 ? 'text-slate-600' : u.rank === 3 ? 'text-orange-600' : 'text-foreground/70'
                        }`}>{u.xp} pts</div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Current user section (always shown when available) */}
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
