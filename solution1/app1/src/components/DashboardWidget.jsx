import { useState } from 'react'
import '../App.css'

const DashboardWidget = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="dashboard-widget">
      <h2>Dashboard Widget</h2>
      <p>This component is loaded from the Dashboard micro-frontend</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          This counter is maintained in the Dashboard micro-frontend's state
        </p>
      </div>
    </div>
  )
}

export default DashboardWidget 