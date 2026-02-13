import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  // Authentication removed - all endpoints are now public
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
