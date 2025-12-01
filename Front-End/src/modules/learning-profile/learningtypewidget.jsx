// src/modules/learning-profile/LearnerTypeWidget.jsx
import React from 'react';
import Card from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'reflective', value: 40, color: '#FF4FA3' }, 
  { name: 'consistent', value: 25, color: '#5B9BD5' }, 
  { name: 'slow', value: 35, color: '#F2C94C' },       
];

const COLORS = data.map(d => d.color);

// Fungsi untuk me-render label di luar Pie Chart dengan garis penghubung
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
  const RADIAN = Math.PI / 180;
  
  // Titik awal garis (di luar donat)
  const outerRadiusLine = outerRadius * 1.05; 
  const lineToX = cx + outerRadiusLine * Math.cos(-midAngle * RADIAN);
  const lineToY = cy + outerRadiusLine * Math.sin(-midAngle * RADIAN);
  
  // Titik akhir garis (dikurangi agar label tidak terpotong)
  const labelRadius = outerRadius * 1.2; 
  const finalX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const finalY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  const textAnchor = finalX > cx ? 'start' : 'end';
  const textX = finalX + (finalX > cx ? 5 : -5);
  const textY = finalY;

  return (
    <g>
      {/* Garis konektor lurus */}
      <line x1={lineToX} y1={lineToY} x2={finalX} y2={finalY} stroke="#333" strokeWidth={1} />
      
      {/* Teks Label */}
      <text 
        x={textX} 
        y={textY} 
        fill="#333" 
        textAnchor={textAnchor} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {data[index].name}
      </text>
    </g>
  );
};

const LearnerTypeWidget = () => {
  return (
    // Card harus fleksibel dan h-full agar bisa meregang setinggi kolom kiri
    <Card className="p-6 shadow-soft rounded-xl border border-gray-200 relative flex flex-col h-full"> 
      
      {/* Area Pie Chart: Menggunakan flex-grow untuk mengisi ruang atas secara penuh */}
      <div className="flex flex-col items-center justify-center relative flex-grow"> 
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50} // Dikecilkan untuk memberi ruang bagi label
              outerRadius={90} // Dikecilkan untuk menghindari pemotongan SVG
              paddingAngle={3} 
              dataKey="value"
              cx="50%"
              cy="50%"
              labelLine={false} 
              label={renderCustomizedLabel} 
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="#fff" 
                  strokeWidth={1} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <p className="text-[10px] text-gray-400 text-center mt-1">visualisasi pie chart berdasarkan klasifikasi model ai machine learning</p>
      </div>

      {/* Area Deskripsi: Di bawah Pie Chart */}
      <div className="pt-4 mt-auto w-full"> 
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
    </Card>
  );
};
export default LearnerTypeWidget;