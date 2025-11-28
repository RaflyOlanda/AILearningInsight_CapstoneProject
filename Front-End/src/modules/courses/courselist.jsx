import React from 'react';
import Card from '../../components/ui/card';
import { FaChevronRight } from 'react-icons/fa';

const courses = [
	'Memulai Pemrogramman Python',
	'Belajar Fundamental React',
	'Web Development',
	'Memulai Pemrogramman Python',
	'Memulai Pemrogramman Python',
];

const CourseList = () => {
	return (
		<Card className="card-shadow rounded-xl">
			<div className="px-3 py-2.5 border-b border-gray-200 flex items-center justify-between">
				<div className="font-semibold text-sm">Courses</div>
				<button className="text-[11px] text-gray-500 hover:text-gray-700">View All &gt;</button>
			</div>
			<div className="p-2 space-y-1.5">
				{courses.map((c, idx) => (
					<button key={idx} className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition">
						<span className="truncate text-left">{c}</span>
						<FaChevronRight size={12} />
					</button>
				))}
			</div>
		</Card>
	);
};

export default CourseList;
