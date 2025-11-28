// src/modules/performance-graph/WeeklyPerformanceChart.jsx
import React from 'react';
import Card from '../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', a: 40, b: 100, c: 90 },
  { name: 'Week 2', a: 60, b: 80, c: 70 },
  { name: 'Week 3', a: 50, b: 60, c: 100 },
  { name: 'Week 4', a: 90, b: 85, c: 80 },
  { name: 'Week 5', a: 30, b: 70, c: 60 },
];

const WeeklyPerformanceChart = () => {
  return (
    <Card className="p-4 shadow-soft rounded-xl border border-gray-200">
      <div className="text-sm font-semibold mb-1">Performance Graph</div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
            <Tooltip />
            <Line type="monotone" dataKey="a" stroke="#5B9BD5" strokeWidth={2.5} dot={{ r: 2.5 }} />
            <Line type="monotone" dataKey="b" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 2.5 }} />
            <Line type="monotone" dataKey="c" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 2.5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
export default WeeklyPerformanceChart;