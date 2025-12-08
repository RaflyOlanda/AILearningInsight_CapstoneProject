import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/dashboardlayout';
import Card from '../../components/ui/card';
import { useUser } from '../../context/usercontext';
import { useFetch } from '../../hooks/usefetch';
import { FaCheckCircle } from 'react-icons/fa';

const CoursesPage = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const { data, loading, error } = useFetch(
    userId ? `/dashboard/learning-history/${userId}` : null
  );

  const courses = Array.isArray(data) ? data : [];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* List */}
        <div>
          {loading && (
            <div className="text-sm text-gray-500 px-5 py-6">Loading your courses…</div>
          )}
          {error && (
            <div className="text-sm text-red-600 px-5 py-6">{String(error)}</div>
          )}
          {!loading && !error && courses.length === 0 && (
            <div className="text-sm text-gray-500 px-5 py-6">No registered courses yet.</div>
          )}

          {!loading && !error && courses.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {courses.map((c) => (
                <li key={`${c.journey_id}-${c.course_title}`} className="px-5 py-5">
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-[15px] leading-6">{c.course_title}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default CoursesPage;
