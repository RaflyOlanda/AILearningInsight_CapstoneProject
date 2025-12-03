import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/dashboardpage';
import LandingPage from '../pages/Landing/landingpage';
import { useUser } from '../context/usercontext';

function ProtectedRoute({ children }) {
	const { userId } = useUser();
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

