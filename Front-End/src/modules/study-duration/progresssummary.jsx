import React from 'react';
// Mengimpor komponen Card reusable
import Card from '../../components/ui/Card'; 
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
    // Wadah utama yang menampung ketiga kartu (menggunakan space-y untuk jarak vertikal)
    <div className="space-y-4">
      
      {/* 1. KARTU: Last Course Enrolled */}
      <Card className="p-4">
        <h3 className="text-gray-500 text-xs font-medium mb-1 uppercase">Last Course Enrolled</h3>
        <p className="text-lg font-semibold mb-3">Belajar Fundamental React</p>
        
        <div className="flex justify-between items-center text-sm">
          {/* Badge Status */}
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold text-xs">
            Status: Uncompleted
          </div>
          
          {/* Link Continue */}
          <button className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium transition duration-150">
            Click to continue 
            <FaPlayCircle className="ml-2" size={14} />
          </button>
        </div>
      </Card>

      {/* 2. KARTU: Study Duration */}
      <Card className="p-4">
        <h3 className="text-gray-500 text-xs font-medium mb-3 uppercase">Study Duration</h3>
        
        <div className="flex justify-between items-center mb-1">
          <span className="text-2xl font-bold text-gray-800">70%</span>
          <span className="text-xs font-medium text-gray-500">Average duration of another students</span>
        </div>
        
        {/* Progress Bar (Tailwind) */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          {/* Inner bar dengan lebar 70% */}
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </Card>

      {/* 3. KARTU: Daily Checkpoint */}
      <Card className="p-4">
        <h3 className="text-gray-500 text-xs font-medium mb-3 uppercase">Daily Checkpoint</h3>
        
        <div className="flex justify-between items-center">
          
          {/* Bagian Streak/Tanggal */}
          <div className="flex flex-col">
            <div className="text-red-600 font-extrabold text-2xl leading-none">0 Streak</div>
            <p className="text-xs text-gray-500 mt-1">Today is 16 October 2025</p>
          </div>
          
          {/* Checkpoint Visual Bars */}
          <div className="flex space-x-1">
            {checkpointDays.map((day, index) => (
              <div 
                key={index} 
                className={`${day.color} h-8 w-2 rounded-sm transition duration-150`}
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