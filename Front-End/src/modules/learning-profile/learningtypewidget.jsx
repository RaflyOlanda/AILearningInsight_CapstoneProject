// src/modules/learning-profile/LearnerTypeWidget.jsx
import React from 'react';
import Card from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Reflective', value: 40 },
  { name: 'Active', value: 35 },
  { name: 'Sensing', value: 25 },
];

const COLORS = ['#FF4FA3', '#5B9BD5', '#F2C94C'];

const LearnerTypeWidget = () => {
  return (
    <Card className="p-6 shadow-soft rounded-xl border border-gray-200 min-h-[380px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left: Pie chart with labels like mockup */}
        <div className="h-72 lg:h-full flex flex-col justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={52}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 text-center mt-1">visualisasi pie chart berdasarkan kuantifikasi model ai machine learning</p>
        </div>

        {/* Right: Title and description */}
        <div>
          <h2 className="text-[18px] font-semibold text-gray-800 mb-1.5">Kamu adalah tipe Fast Learner, Khalil!</h2>
          <p className="text-[13px] leading-snug text-gray-600 mb-2.5">Seorang fast learner memiliki 3 kelebihan dan 3 kekurangan yang wajib kamu ketahui yaitu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Kelebihan</h3>
              <ol className="text-[13px] leading-snug text-gray-600 list-decimal ml-4 space-y-1">
                <li>Cepat memahami konsep baru</li>
                <li>Mudah beradaptasi dengan perubahan</li>
                <li>Efisien dalam belajar dan memecahkan masalah</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Kekurangan</h3>
              <ol className="text-[13px] leading-snug text-gray-600 list-decimal ml-4 space-y-1">
                <li>Cenderung mengabaikan detail kecil</li>
                <li>Cepat bosan jika materi terlalu lambat</li>
                <li>Retensi jangka panjang bisa lebih lemah</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default LearnerTypeWidget;