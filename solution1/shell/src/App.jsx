import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Home component for the shell application
const Home = () => (
  <div className="container">
    <h1>Monomedi Shell Application</h1>
    <p>Welcome to the Monomedi shell application. This is the host for all micro-frontends.</p>
    <p>
      Navigate to different applications using the menu above. Each application is developed and deployed independently.
    </p>
  </div>
)

// Lazy load the remote apps
const App1App = lazy(() => import('app1/App'))
const App1Widget = lazy(() => import('app1/DashboardWidget'))
const App2App = lazy(() => import('app2/App'))

// Widget container component
const WidgetsPage = () => (
  <div className="container">
    <h1>Widgets Page</h1>
    <p>This page displays individual widgets from different micro-frontends.</p>
    <div className="widgets-container">
      <Suspense fallback={<div>Loading Dashboard Widget...</div>}>
        <App1Widget />
      </Suspense>
    </div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <div className="shell-container">
        <nav className="shell-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/app1">App 1</Link>
            </li>
            <li>
              <Link to="/app2">App 2</Link>
            </li>
            <li>
              <Link to="/widgets">Widgets</Link>
            </li>
          </ul>
        </nav>

        <div className="shell-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app1/*" element={<App1App />} />
              <Route path="/app2/*" element={<App2App />} />
              <Route path="/widgets" element={<WidgetsPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
