import React from 'react';
import Card from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';

const COLORS = ['#FF4FA3', '#5B9BD5', '#F2C94C'];

const LearnerTypeWidget = () => {
  const { userId } = useUser();
  const { data: profile, loading } = useFetch(
    userId ? `/dashboard/learning-profile/${userId}` : null
  );

  const pieData = profile?.strengths?.map((strength, idx) => ({
    name: strength,
    value: 33
  })) || [
    { name: 'Strength 1', value: 33 },
    { name: 'Strength 2', value: 34 },
    { name: 'Strength 3', value: 33 }
  ];

  return (
    <Card className="p-6 shadow-soft rounded-xl border border-gray-200 min-h-[380px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left: Pie chart */}
        <div className="h-72 lg:h-full flex flex-col justify-center">
          {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : (
            <>
              <div style={{ width: '100%', height: 280, minWidth: 280 }}>
                <PieChart width={280} height={280}>
                  <Pie
                    data={pieData}
                    innerRadius={52}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-1">visualisasi pie chart berdasarkan kuantifikasi model ai machine learning</p>
            </>
          )}
        </div>

        {/* Right: Title and description */}
        <div>
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : profile ? (
            <>
              <h2 className="text-[18px] font-semibold text-gray-800 mb-1.5">
                Kamu adalah tipe {profile.learner_type}, {profile.display_name}!
              </h2>
              <p className="text-[13px] leading-snug text-gray-600 mb-2.5">
                {profile.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Kelebihan</h3>
                  <ol className="text-[13px] leading-snug text-gray-600 list-decimal ml-4 space-y-1">
                    {(profile.strengths || []).map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Kekurangan</h3>
                  <ol className="text-[13px] leading-snug text-gray-600 list-decimal ml-4 space-y-1">
                    {(profile.weaknesses || []).map((weakness, idx) => (
                      <li key={idx}>{weakness}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No profile data available</p>
          )}
        </div>
      </div>
    </Card>
  );
};
export default LearnerTypeWidget;