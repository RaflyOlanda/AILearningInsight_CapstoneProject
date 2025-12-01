import React from 'react';
import Card from '../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';

const WeeklyPerformanceChart = () => {
  const { userId } = useUser();
  const { data: chartData, loading } = useFetch(
    userId ? `/dashboard/performance-chart/${userId}` : null
  );

  const defaultData = [
    { name: 'Week 1', Score: 40, Duration: 100 },
    { name: 'Week 2', Score: 60, Duration: 80 },
    { name: 'Week 3', Score: 50, Duration: 60 },
    { name: 'Week 4', Score: 90, Duration: 85 },
    { name: 'Week 5', Score: 30, Duration: 70 },
  ];

  const data = chartData?.series ? 
    (chartData.labels || []).map((label, idx) => ({
      name: label,
      Score: chartData.series[0]?.data[idx] || 0,
      Duration: chartData.series[1]?.data[idx] || 0
    })) 
    : defaultData;

  return (
    <Card className="p-4 shadow-soft rounded-xl border border-gray-200">
      <div className="text-sm font-semibold mb-1">Performance Graph</div>
      <div className="w-full h-60" style={{ minWidth: '300px', minHeight: '240px' }}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Line type="monotone" dataKey="Score" stroke="#5B9BD5" strokeWidth={2.5} dot={{ r: 2.5 }} />
              <Line type="monotone" dataKey="Duration" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 2.5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
export default WeeklyPerformanceChart;