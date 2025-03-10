import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>App1 Demo</h1>
      </header>

      <main className="app-content">
        <div className="page">
          <h2>App1 Component</h2>
          <div className="micro-frontend-container">
            <react-app></react-app>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
