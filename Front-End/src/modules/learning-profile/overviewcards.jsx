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

  const completionPercentRaw = Number(lastCourse?.progress) || 0;
  const completionPercent = Math.max(0, Math.min(100, completionPercentRaw));
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
      <Card className="p-4 shadow-soft rounded-xl border border-gray-200 flex items-center gap-4 min-h-[96px]">
        {studyLoading || courseLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
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
              <div className="font-semibold">{Math.round(completionPercent)}% Completed</div>
              <div className="text-xs text-gray-500">Total: {studyData?.total_hours || 0}h</div>
            </div>
          </>
        )}
      </Card>

      {/* Container 2: Average Submission Rating with stars */}
      <Card className="p-4 shadow-soft rounded-xl border border-gray-200 min-h-[96px]">
        {courseLoading ? (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center text-yellow-500 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <FaStar 
                  key={i} 
                  className={i <= fullStars ? 'text-yellow-500' : i === fullStars + 1 && hasHalfStar ? 'text-yellow-300' : 'text-gray-300'}
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold">Average Submission Rating</div>
              <div className="text-xs text-gray-500">{avgRating.toFixed(1)} / 5</div>
              <button
                type="button"
                onClick={() => navigate('/submissions')}
                className="mt-1.5 text-[11px] text-blue-600 hover:text-blue-800 font-medium"
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
