import React from 'react';
import Card from '../../components/ui/card';
import { FaChevronRight } from 'react-icons/fa';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
	const navigate = useNavigate();
	const { userId } = useUser();
	const { data: courses, loading } = useFetch(
		userId ? `/dashboard/learning-history/${userId}` : null
	);

	const courseItems = (courses && Array.isArray(courses) ? courses : [])
		.slice(0, 5)
		.map(course => ({
			name: course.course_title,
			id: course.journey_id
		}));

	return (
		<Card className="card-shadow rounded-xl overflow-hidden h-[270px]">
			<div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
				<div className="font-semibold text-sm text-gray-800">Courses</div>
				<button onClick={() => navigate('/courses')} className="text-[11px] text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
					View All &gt;
				</button>
			</div>
			<div className="p-0 space-y-0 divide-y divide-gray-100 overflow-y-auto" style={{ maxHeight: '212px' }}>
				{loading ? (
					<div className="text-xs text-gray-500 p-4 text-center">Loading courses...</div>
				) : courseItems.length > 0 ? (
					courseItems.map((c, idx) => (
						<button key={idx} onClick={() => navigate('/courses')} className="w-full flex items-center justify-between hover:bg-gray-50 text-gray-700 text-[12px] font-medium py-3 px-4 transition bg-white border-0">
							<span className="truncate text-left" title={c.name}>{c.name}</span>
							<FaChevronRight size={12} className="text-gray-400 flex-shrink-0 ml-2" />
						</button>
					))
				) : (
					<div className="text-xs text-gray-500 p-4 text-center">No courses yet</div>
				)}
			</div>
		</Card>
	);
};

export default CourseList;
