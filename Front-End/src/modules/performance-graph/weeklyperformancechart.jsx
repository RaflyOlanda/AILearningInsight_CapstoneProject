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
    { name: 'Course 1', Hours: 40, Duration: 100 },
    { name: 'Course 2', Hours: 60, Duration: 80 },
    { name: 'Course 3', Hours: 50, Duration: 60 },
    { name: 'Course 4', Hours: 90, Duration: 85 },
    { name: 'Course 5', Hours: 30, Duration: 70 },
  ];

  const hasSeries = Array.isArray(chartData?.series) && chartData.series.length >= 2
    && Array.isArray(chartData.series[0]?.data) && Array.isArray(chartData.series[1]?.data)
    && (chartData.series[0].data.some(n => Number(n) > 0) || chartData.series[1].data.some(n => Number(n) > 0));

  const data = hasSeries && Array.isArray(chartData?.labels) && chartData.labels.length > 0
    ? chartData.labels.map((label, idx) => ({
        name: label,
        Hours: Number(chartData.series[0]?.data[idx]) || 0,
        Duration: Number(chartData.series[1]?.data[idx]) || 0,
      }))
    : defaultData;

  const description = chartData?.description || '';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && Array.isArray(payload) && payload.length) {
      const hours = payload.find(p => p.dataKey === 'Hours')?.value ?? 0;
      const duration = payload.find(p => p.dataKey === 'Duration')?.value ?? 0;
      const gap = Number(duration) - Number(hours);
      return (
        <div className="rounded-xl bg-white shadow-lg border border-gray-200 px-4 py-3">
          <div className="text-sm font-semibold text-gray-800 mb-1">{label}</div>
          <div className="text-[12px]">
            <div className="text-green-600 font-semibold">Durasi (aktual): <span className="font-bold">{duration} jam</span></div>
            <div className="text-blue-600 font-semibold">Rekomendasi (jam): <span className="font-bold">{hours} jam</span></div>
            <div className="text-gray-700 font-semibold mt-1">Selisih (Durasi − Rekomendasi): <span className="font-bold">{gap > 0 ? `+${gap}` : gap} jam</span></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 shadow-soft rounded-xl border border-gray-200 h-[290px] overflow-hidden">
      <div className="text-sm font-semibold mb-3">Performance Graph</div>
      {description && (
        <div className="text-[11px] text-gray-500 mb-3 line-clamp-2" title={description}>{description}</div>
      )}
      <div className="w-full h-[210px] pr-2 mt-2" style={{ minWidth: 200, minHeight: 200 }}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={false} tickLine={false} stroke="#9CA3AF" padding={{ left: 0, right: 14 }} />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickMargin={6} domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D1D5DB', strokeDasharray: '4 4' }} />
              <Line type="monotone" dataKey="Hours" stroke="#5B9BD5" strokeWidth={2.5} strokeLinecap="round" dot={{ r: 2.5 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="Duration" stroke="#22C55E" strokeWidth={2.5} strokeLinecap="round" dot={{ r: 2.5 }} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
export default WeeklyPerformanceChart;