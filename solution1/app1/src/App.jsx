import './App.css'
import DashboardWidget from './components/DashboardWidget'

function App() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard Application</h1>
      <p>This is a standalone micro-frontend that can be integrated into the shell application.</p>
      
      <div className="dashboard-grid">
        <DashboardWidget />
        <div className="dashboard-widget">
          <h2>Analytics</h2>
          <p>Your analytics data will appear here</p>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '40%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '50%' }}></div>
          </div>
        </div>
        <div className="dashboard-widget">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>User login - 5 minutes ago</li>
            <li>Report generated - 1 hour ago</li>
            <li>Settings updated - 3 hours ago</li>
            <li>New account created - 1 day ago</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
