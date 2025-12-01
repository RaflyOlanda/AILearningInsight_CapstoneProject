import React from 'react';
import { UserProvider } from './context/usercontext';
import DashboardPage from './pages/Dashboard/dashboardpage';

function App() {
  return (
    <UserProvider>
      <DashboardPage />
    </UserProvider>
  );
}

export default App;