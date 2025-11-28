import React from 'react';
// Mengimpor komponen Card reusable
import Card from '../../components/ui/card'; 
// Mengimpor ikon untuk tombol "continue" dan checkpoint
import { FaPlayCircle, FaCheckSquare } from 'react-icons/fa'; 

const ProgressSummary = () => {
  
  // Data dummy untuk checkpoint (5 hari terakhir)
  // Warna hijau untuk complete, abu-abu untuk incomplete/future
  const checkpointDays = [
    { color: 'bg-green-500', status: 'Complete' },
    { color: 'bg-green-500', status: 'Complete' },
    { color: 'bg-green-500', status: 'Complete' },
    { color: 'bg-gray-300', status: 'Incomplete' },
    { color: 'bg-gray-300', status: 'Incomplete' },
  ];

  return (
    // Stack tiga kartu kiri, dibuat lebih pendek agar kolom tengah lebih menonjol
    <div className="space-y-2.5">
      
      {/* 1. KARTU: Last Course Enrolled */}
      <Card className="p-2.5 card-shadow rounded-xl">
        <h3 className="text-gray-600 text-xs font-semibold mb-1">Last Course Enrolled</h3>
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-1.5 rounded-lg transition" aria-label="Belajar Fundamental React">
          Belajar Fundamental React
        </button>
        <div className="flex justify-between items-center text-[11px] mt-1.5">
          <span className="inline-block bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-semibold">Status: Uncompleted</span>
          <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium">
            <span>Click to continue</span>
            <FaPlayCircle size={14} />
          </button>
        </div>
      </Card>

      {/* 2. KARTU: Study Duration */}
      <Card className="p-2.5 card-shadow rounded-xl">
        <h3 className="text-gray-500 text-xs font-medium mb-2 uppercase">Study Duration</h3>
        
        <div className="flex justify-between items-center mb-1">
          <span className="text-xl font-bold text-gray-800">70%</span>
          <span className="text-xs font-medium text-gray-500">Average duration of another students</span>
        </div>
        
        {/* Progress Bar (Tailwind) */}
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          {/* Inner bar dengan lebar 70% */}
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </Card>

      {/* 3. KARTU: Daily Checkpoint */}
      <Card className="p-2.5 card-shadow rounded-xl">
        <h3 className="text-gray-500 text-xs font-medium mb-2 uppercase">Daily Checkpoint</h3>
        
        <div className="flex justify-between items-center">
          
          {/* Bagian Streak/Tanggal */}
          <div className="flex flex-col">
            <div className="text-rose-600 font-extrabold text-xl leading-none">0 Streak</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Today is 16 October 2025</p>
          </div>
          
          {/* Checkpoint Visual Bars */}
          <div className="flex space-x-0.5">
            {checkpointDays.map((day, index) => (
              <div 
                key={index} 
                className={`${day.color} h-5 w-1.5 rounded-sm transition duration-150`}
                title={day.status} // Tooltip menunjukkan status
              ></div>
            ))}
          </div>
        </div>
      </Card>
      
    </div>
  );
};

export default ProgressSummary;