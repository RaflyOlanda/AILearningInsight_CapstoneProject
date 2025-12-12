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


const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 relative">
        <p className="text-xs text-gray-500 mb-2">Page &gt; <span className="text-gray-700 font-medium">Dashboard</span> &gt;</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <ThemeSwitcher position="absolute" top="top-10" right="right-0" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-max items-start content-start">
        <div className="lg:col-span-3 space-y-6">
          <ProgressSummary /> 
          <CourseList />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <LearnerTypeWidget />
          <WeeklyPerformanceChart />
        </div>
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