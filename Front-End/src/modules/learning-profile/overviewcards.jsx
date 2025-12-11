import React from 'react';
import Card from '../../components/ui/card';
import { PieChart, Pie, Cell } from 'recharts';
import { FaStar } from 'react-icons/fa';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#22C55E', '#E5E7EB'];

const OverviewCards = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const { data: studyData, loading: studyLoading } = useFetch(
    userId ? `/dashboard/study-duration/${userId}` : null
  );
  const { data: lastCourse, loading: courseLoading } = useFetch(
    userId ? `/dashboard/last-course/${userId}` : null
  );
  const { data: historyData, loading: historyLoading } = useFetch(
    userId ? `/dashboard/learning-history/${userId}` : null
  );

  // Simple completion percent: rows with last_enrolled_at present over total rows
  const historyItems = Array.isArray(historyData) ? historyData : [];
  const totalRows = historyItems.length;
  const completedRows = totalRows;
  const completionPercent = totalRows > 0 ? 100 : 0;
  const donutData = [
    { name: 'Completed', value: completionPercent },
    { name: 'Remaining', value: 100 - completionPercent },
  ];

  const avgRating = lastCourse?.avg_submission_ratings 
    ? parseFloat(lastCourse.avg_submission_ratings) 
    : 3.5;
  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 >= 0.5;

  return (
    <div className="space-y-4">
      {/* Container 1: Completed Courses donut */}
      <Card
        className="p-4 shadow-soft rounded-xl border border-gray-200 flex items-center gap-4 min-h-24 relative group"
        title={`${completedRows} dari ${totalRows} kursus selesai`}
      >
        {studyLoading || courseLoading || historyLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
            <div className="pointer-events-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <div className="rounded-md bg-gray-900/90 text-white text-[11px] px-3 py-1 shadow-lg">
                {totalRows > 0 ? (
                  <>
                    <span className="font-semibold">{completedRows}</span>
                    <span className="mx-1">/</span>
                    <span>{totalRows}</span>
                    <span className="ml-1">kursus selesai</span>
                  </>
                ) : (
                  <span>Belum ada data kursus</span>
                )}
              </div>
            </div>
            <div className="w-20 h-20" style={{ minWidth: '80px', minHeight: '80px' }}>
              <PieChart width={80} height={80}>
                <Pie data={donutData} innerRadius={24} outerRadius={38} paddingAngle={2} dataKey="value">
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="text-sm">
              <div className="font-semibold">{completionPercent}% Completed Courses</div>
            </div>
          </>
        )}
      </Card>

      {/* Container 2: Average Submission Rating with stars */}
      <Card className="p-4 shadow-soft rounded-xl border border-gray-200 min-h-24">
        {courseLoading ? (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map(i => {
                if (i <= fullStars) {
                  return <FaStar key={i} className="text-yellow-500" />;
                }
                if (i === fullStars + 1) {
                  const frac = Math.min(1, Math.max(0, avgRating - fullStars));
                  return (
                    <span key={i} className="relative inline-block" style={{ width: '1em', height: '1em' }}>
                      <FaStar className="text-gray-300 absolute left-0 top-0" />
                      <span
                        className="absolute left-0 top-0 overflow-hidden"
                        style={{ width: `${frac * 100}%`, height: '100%' }}
                      >
                        <FaStar className="text-yellow-500" />
                      </span>
                    </span>
                  );
                }
                return <FaStar key={i} className="text-gray-300" />;
              })}
            </div>
            <div className="text-sm">
              <div className="font-semibold">Average Submission Rating</div>
              <div className="text-xs text-gray-500">{avgRating.toFixed(1)} / 5</div>
              <button
                type="button"
                onClick={() => navigate('/submissions')}
                className="mt-1.5 text-[11px] text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
                title="Tap to detail"
              >
                Tap to detail
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default OverviewCards;
