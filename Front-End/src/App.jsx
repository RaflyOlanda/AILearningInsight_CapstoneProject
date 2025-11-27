import React from 'react';
import DashboardPage from './pages/Dashboard/dashboardpage';

function App() {
  // Hanya me-render DashboardPage secara langsung.
  // Catatan: Dalam proyek nyata, ini akan diganti dengan <AppRouter />
  return (
    <DashboardPage />
  );
}

export default App;