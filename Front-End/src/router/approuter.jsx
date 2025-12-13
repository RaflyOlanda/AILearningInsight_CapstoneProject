import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/dashboardpage';
import CoursesPage from '../pages/coursespage';
import LeaderboardPage from '../pages/leaderboardpage';
import SubmissionsPage from '../pages/submissionspage';
import LandingPage from '../pages/landingpage';
import { useUser } from '../context/usercontext';

function ProtectedRoute({ children }) {
	const { userId, token, loading } = useUser();
	if (loading) return null;
	if (!userId && !token) return <Navigate to="/" replace />;
	return children;
}

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/courses"
					element={
						<ProtectedRoute>
							<CoursesPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/leaderboard"
					element={
						<ProtectedRoute>
							<LeaderboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/submissions"
					element={
						<ProtectedRoute>
							<SubmissionsPage />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

