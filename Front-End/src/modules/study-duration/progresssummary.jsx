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
  const { data: dailyCheckpointResp, loading: checkpointLoading } = useFetch(
    userId ? `/dashboard/daily-checkpoint/${userId}` : null
  );
  const dailyCheckpoint = dailyCheckpointResp?.data || dailyCheckpointResp || [];

  
  const streakCount = (dailyCheckpoint || []).filter(d => d.color === 'green').length;

  const checkpointDays = (dailyCheckpoint || []).slice(0, 7).map((d) => {
    const colorClass = d.color === 'green' ? 'bg-green-500' : d.color === 'red' ? 'bg-red-500' : 'bg-gray-300';
    const label = d.status === 'current' ? 'Last Enrolled Day' : d.status === 'past' ? 'Past' : 'Future';
    return { color: colorClass, status: label };
  });

  

  return (
    <div className="space-y-4">
      <Card className="p-4 rounded-xl min-h-24">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Last Course Enrolled</h3>
        {courseLoading ? (
          <div className="w-full bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg">Loading...</div>
        ) : lastCourse ? (
          <>
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg transition text-left px-2 border-0 mb-2" title={lastCourse.course_name}>
              {lastCourse.course_name?.substring(0, 35)}
            </button>
            <div className="flex justify-between items-center text-[11px]">
              <span className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">100% Complete</span>
              <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium cursor-pointer">
                <span>Continue</span>
                <FaPlayCircle size={12} />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg">No course enrolled</div>
        )}
      </Card>
      <Card className="p-4 rounded-xl min-h-24">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Study Duration</h3>
        {studyLoading ? (
          <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
        ) : studyData ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-base font-semibold text-gray-800">Total: {studyData.total_hours || 0}h</span>
            </div>
            {/* Removed horizontal progress bar; focusing on mini bars */}
            {/* Mini trend 7 hari (bar sederhana) */}
            {/* 10 kelas terkini: bar besar, tooltip detail */}
            {Array.isArray(studyData.last_10_classes) && studyData.last_10_classes.length > 0 && (
              <div className="mt-3">
                <div className="flex items-end gap-2 w-full">
                  {studyData.last_10_classes.map((d, idx, arr) => {
                    const max = Math.max(...arr.map(x => Number(x.hours) || 0));
                    const val = Number(d.hours) || 0;
                    const height = max > 0 ? Math.max(24, Math.round((val / max) * 72)) : 24;
                    const dateLabel = d.last_enrolled_date ? new Date(d.last_enrolled_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
                    const journeyName = d.journey_name || 'Kelas';
                    return (
                      <div key={idx} className="relative group flex-1 flex flex-col items-center justify-end">
                        <div className="bg-green-500 w-3 rounded-md" style={{ height: `${height}px` }}></div>
                        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 whitespace-normal rounded-md bg-gray-900 text-white text-[11px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg text-center min-w-[150px] max-w-[220px] z-20 group-hover:z-30">
                          <div className="font-semibold leading-tight break-words">{journeyName}</div>
                          <div className="text-[10px] text-gray-200 leading-tight break-words">{dateLabel}</div>
                          <div className="text-[10px] text-gray-200 leading-tight">Durasi: {val}h</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-xs text-gray-500">No data available</div>
        )}
      </Card>
      <Card className="p-4 rounded-xl min-h-24">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Daily Checkpoint</h3>
        {checkpointLoading ? (
          <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-red-500 font-extrabold text-2xl leading-none">{streakCount}</div>
              <div className="text-red-500 font-semibold text-sm">Streak</div>
            </div>
            <div className="flex items-center space-x-1">
              {checkpointDays.map((day, index) => (
                <div
                  key={index}
                  className={`${day.color} h-5 w-2 rounded-sm`}
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