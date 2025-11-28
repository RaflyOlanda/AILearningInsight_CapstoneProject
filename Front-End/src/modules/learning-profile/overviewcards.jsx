import React from 'react';
import Card from '../../components/ui/card';
import { PieChart, Pie, Cell } from 'recharts';
import { FaStar } from 'react-icons/fa';

const donutData = [
  { name: 'Completed', value: 60 },
  { name: 'Remaining', value: 40 },
];
const COLORS = ['#22C55E', '#E5E7EB'];

const OverviewCards = () => {
  return (
    <div className="space-y-4">
      {/* Container 1: Completed Courses donut */}
      <Card className="p-4 shadow-soft rounded-xl border border-gray-200 flex items-center gap-4 min-h-[96px]">
        <div className="w-20 h-20">
          <PieChart width={80} height={80}>
            <Pie data={donutData} innerRadius={24} outerRadius={38} paddingAngle={2} dataKey="value">
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="text-sm">
          <div className="font-semibold">60% Completed Courses</div>
        </div>
      </Card>

      {/* Container 2: Average Submission Rating with stars above text */}
      <Card className="p-4 shadow-soft rounded-xl border border-gray-200 min-h-[96px]">
        <div className="flex items-center text-yellow-500 mb-2">
          {[1,2,3,4].map(i => <FaStar key={i} />)}
          <FaStar className="text-gray-300" />
        </div>
        <div className="text-sm">
          <div className="font-semibold">Average Submission Rating</div>
          <div className="text-xs text-gray-500">4.5 / 5</div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewCards;
