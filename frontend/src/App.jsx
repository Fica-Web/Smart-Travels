import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './route/Router';
import './App.css';

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      
    </div>
  )
}

export default App
