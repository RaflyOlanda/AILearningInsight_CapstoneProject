import React from 'react';
import Card from '../../components/ui/card'; 
import { FaPlayCircle, FaCheckSquare } from 'react-icons/fa'; 
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';

const ProgressSummary = () => {
  const { userId } = useUser();
  const { data: lastCourse, loading: courseLoading } = useFetch(
    userId ? `/dashboard/last-course/${userId}` : null
  );
  const { data: studyData, loading: studyLoading } = useFetch(
    userId ? `/dashboard/study-duration/${userId}` : null
  );
  const { data: dailyCheckpoint, loading: checkpointLoading } = useFetch(
    userId ? `/dashboard/daily-checkpoint/${userId}` : null
  );

  let streakCount = 0;
  if (dailyCheckpoint && dailyCheckpoint.length > 0) {
    const today = new Date();
    for (let i = 0; i < dailyCheckpoint.length; i++) {
      const checkDate = new Date(dailyCheckpoint[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      if (checkDate.toDateString() === expectedDate.toDateString()) {
        streakCount++;
      } else {
        break;
      }
    }
  }

  const checkpointDays = Array.from({ length: 5 }, (_, i) => {
    if (dailyCheckpoint && i < dailyCheckpoint.length) {
      return { color: 'bg-green-500', status: 'Complete' };
    }
    return { color: 'bg-gray-300', status: 'Incomplete' };
  });

  const todayDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-4">
      {/* 1. KARTU: Last Course Enrolled */}
      <Card className="p-4 rounded-xl">
        <h3 className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wide">Last Course Enrolled</h3>
        {courseLoading ? (
          <div className="w-full bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg">Loading...</div>
        ) : lastCourse ? (
          <>
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg transition text-left px-2 border-0 mb-2" title={lastCourse.course_name}>
              {lastCourse.course_name?.substring(0, 35)}
            </button>
            <div className="flex justify-between items-center text-[11px]">
              <span className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">{Math.min(Math.round(lastCourse.progress), 100)}% Complete</span>
              <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                <span>Continue</span>
                <FaPlayCircle size={12} />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg">No course enrolled</div>
        )}
      </Card>

      {/* 2. KARTU: Study Duration */}
      <Card className="p-4 rounded-xl">
        <h3 className="text-gray-600 text-xs font-semibold mb-3 uppercase tracking-wide">Study Duration</h3>
        {studyLoading ? (
          <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
        ) : studyData ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-gray-800">{Math.min(studyData.achievement_percent || 0, 100)}%</span>
              <span className="text-xs font-medium text-gray-500">Total: {studyData.total_hours || 0}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(studyData.achievement_percent || 0, 100)}%` }}></div>
            </div>
          </>
        ) : (
          <div className="text-xs text-gray-500">No data available</div>
        )}
      </Card>

      {/* 3. KARTU: Daily Checkpoint */}
      <Card className="p-4 rounded-xl">
        <h3 className="text-gray-600 text-xs font-semibold mb-3 uppercase tracking-wide">Daily Checkpoint</h3>
        {checkpointLoading ? (
          <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-red-500 font-extrabold text-lg leading-none">{streakCount} <span className="text-xs font-semibold">Streak</span></div>
              <p className="text-[11px] text-gray-500 mt-1">Today is {todayDate}</p>
            </div>
            <div className="flex space-x-1">
              {checkpointDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`${day.color} h-5 w-2 rounded-sm transition duration-150`}
                  title={day.status}
                ></div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};


export default ProgressSummary;