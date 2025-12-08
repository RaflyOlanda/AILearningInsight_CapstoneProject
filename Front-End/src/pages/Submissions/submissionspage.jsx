import React from 'react';
import DashboardLayout from '../../components/layouts/dashboardlayout';
import Card from '../../components/ui/card';
import { useUser } from '../../context/usercontext';
import { useFetch } from '../../hooks/usefetch';
import { useNavigate } from 'react-router-dom';

const SubmissionsPage = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const { data, loading, error } = useFetch(
    userId ? `/dashboard/learning-history/${userId}` : null
  );
  const items = Array.isArray(data) ? data : [];

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">All Submissions</h1>
        <button onClick={() => navigate('/dashboard')} className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Back to Dashboard</button>
      </div>
      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="font-semibold text-sm">Submissions</div>
          <div className="text-[11px] text-gray-500">Total: {items.length}</div>
        </div>
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading submissions…</div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-600">{String(error)}</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">No submissions yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="text-left px-4 py-2 font-semibold">Course</th>
                  <th className="text-left px-4 py-2 font-semibold">Score</th>
                  <th className="text-left px-4 py-2 font-semibold">Study Duration (h)</th>
                  <th className="text-left px-4 py-2 font-semibold">Enrolled</th>
                  <th className="text-left px-4 py-2 font-semibold">Times</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((r) => (
                  <tr key={`${r.journey_id}-${r.date}`} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800 truncate" title={r.course_title}>{r.course_title}</td>
                    <td className="px-4 py-2 text-gray-700">{Number(r.score) > 0 ? Number(r.score) : 'no submission'}</td>
                    <td className="px-4 py-2 text-gray-700">{Number(r.duration) > 0 ? Number(r.duration) : 'less than 1 hour'}</td>
                    <td className="px-4 py-2 text-gray-500">{r.date ? new Date(r.date).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-4 py-2 text-gray-700">{Number(r.enrolling_times) || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default SubmissionsPage;
