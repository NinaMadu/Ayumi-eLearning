import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';
import UserRoutes from './UserRoutes';
import InstructorRoutes from './InstructorRoutes';

function App() {
  return (
    <BrowserRouter>
      <CommonRoutes />
      <UserRoutes />
      <InstructorRoutes />
    </BrowserRouter>
  );
}

export default App;
