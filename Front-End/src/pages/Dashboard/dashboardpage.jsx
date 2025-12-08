import React from 'react';
import DashboardLayout from '../../components/layouts/dashboardlayout'; 
import ProgressSummary from '../../modules/study-duration/progresssummary'; 
import LearnerTypeWidget from '../../modules/learning-profile/learningtypewidget';
import OverviewCards from '../../modules/learning-profile/overviewcards';
import OverviewRecommendation from '../../modules/learning-profile/overviewrecommendation';
import LeaderboardCard from '../../modules/leaderboard/leaderboardcard'; 
import WeeklyPerformanceChart from '../../modules/performance-graph/weeklyperformancechart'; 
import CourseList from '../../modules/courses/courselist';
import ThemeSwitcher from '../../components/ui/themeswitcher';
// RecommendationCard removed from bottom section as requested

const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 relative">
        <p className="text-xs text-gray-500 mb-2">Page &gt; <span className="text-gray-700 font-medium">Dashboard</span> &gt;</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        {/* Floating theme switcher in the top-right area */}
        <ThemeSwitcher position="absolute" top="top-10" right="right-0" />
      </div>

      {/* Main Grid: 12-column layout for precise control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-max items-start content-start">
        
        {/* Kolom 1 Kiri: Progress Summary & Courses */}
        <div className="lg:col-span-3 space-y-6">
          {/* 1. Progress Summary (3 kartu pertama) */}
          <ProgressSummary /> 
          
          {/* 2. Courses List */}
          <CourseList />
        </div>

        {/* Kolom 2 Tengah: Main content area */}
        <div className="lg:col-span-6 space-y-6">
          <LearnerTypeWidget />
          <WeeklyPerformanceChart />
        </div>

        {/* Kolom 3 Kanan: Side widgets */}
        <div className="lg:col-span-3 space-y-6">
          <OverviewCards />
          <OverviewRecommendation />
          <LeaderboardCard />
        </div>
        
      </div>
    </DashboardLayout>
  );
};


export default DashboardPage;