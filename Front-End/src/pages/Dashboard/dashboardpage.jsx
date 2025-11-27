import React from 'react';
import DashboardLayout from '../../components/layouts/dashboardlayout'; 
// -- IMPORT SEMUA MODUL PLACEHOLDER --
import ProgressSummary from '../../modules/study-duration/progresssummary'; 
import LearnerTypeWidget from '../../modules/learning-profile/learningtypewidget';
import LeaderboardCard from '../../modules/leaderboard/leaderboardcard'; 
import WeeklyPerformanceChart from '../../modules/performance-graph/weeklyperformancechart'; 

const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Container Grid: Menerapkan tata letak 3 kolom dari gambar Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-min">
        
        {/* Kolom 1 Kiri: Progress Summary & Courses */}
        <div className="lg:col-span-1 space-y-6">
          {/* 1. Progress Summary (3 kartu pertama) */}
          <ProgressSummary /> 
          
          {/* 2. Courses List Placeholder */}
          <div className="bg-white p-4 shadow rounded-lg h-full min-h-[300px]">
            <h3 className="font-semibold text-lg mb-4">Courses (Placeholder)</h3>
            {/* ... CourseList component di sini ... */}
          </div>
        </div>

        {/* Kolom 2 Tengah/Kanan (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Baris 1: Learner Type & Overview Cards (Grid internal 2 kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LearnerTypeWidget />
            {/* Overview Card (Avg Completed, Avg Rating) & Recommendation Placeholder */}
            <div className="bg-white p-6 shadow rounded-lg flex flex-col justify-between">
              <p className="font-semibold text-xl">60% Completed | 4.5/5 Rating</p>
              <h4 className="mt-4 font-semibold text-gray-700">Rekomendasi Belajar</h4>
              <p className="text-sm text-gray-600">Sebagai Fast Learner, Anda cenderung cepat memahami konsep baru dan mudah beradaptasi...</p>
            </div>
          </div>

          {/* Baris 2: Performance Graph */}
          <div className="bg-white p-6 shadow rounded-lg">
            <WeeklyPerformanceChart />
          </div>
        </div>

        {/* Kolom 3: Leaderboard (Diletakkan di bagian paling kanan di layout desktop) */}
        <div className="lg:col-span-1 space-y-6">
           <LeaderboardCard />
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;