import React from 'react';
import DashboardLayout from '../../components/layouts/dashboardlayout'; 
import ProgressSummary from '../../modules/study-duration/progresssummary'; 
import LearnerTypeWidget from '../../modules/learning-profile/learningtypewidget';
import OverviewCards from '../../modules/learning-profile/overviewcards';
import OverviewRecommendation from '../../modules/learning-profile/overviewrecommendation';
import LeaderboardCard from '../../modules/leaderboard/leaderboardcard'; 
import WeeklyPerformanceChart from '../../modules/performance-graph/weeklyperformancechart'; 
import CourseList from '../../modules/courses/courselist';
// RecommendationCard removed from bottom section as requested

const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Page Title & Breadcrumb (minimal) */}
      <div className="mb-4 text-xs text-gray-500">Page &gt; <span className="text-gray-700 font-medium">Dashboard</span> &gt;</div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h1>

      {/* Main Grid: 3 columns like mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-5 auto-rows-min items-start">
        
        {/* Kolom 1 Kiri: Progress Summary & Courses */}
        <div className="lg:col-span-1 space-y-4">
          {/* 1. Progress Summary (3 kartu pertama) */}
          <ProgressSummary /> 
          
          {/* 2. Courses List */}
          <CourseList />
        </div>

        {/* Kolom 2 Tengah/Kanan (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Row 1: Learner Type left, Overview Cards right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <LearnerTypeWidget />
            </div>
            <div className="md:col-span-1 space-y-6">
              <OverviewCards />
              <OverviewRecommendation />
            </div>
          </div>

          {/* Row 2: Performance Graph + Leaderboard side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2"><WeeklyPerformanceChart /></div>
            <div className="md:col-span-1 flex flex-col">
              <LeaderboardCard />
              {/* Spacer to align bottoms across columns */}
              <div className="mt-auto"></div>
            </div>
          </div>

          {/* Row 3 removed: no recommendation below leaderboard */}
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;