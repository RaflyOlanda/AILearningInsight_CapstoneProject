import React from 'react';
import { UserProvider } from './context/usercontext';
import AppRouter from './router/approuter';

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;