import React, { useState } from 'react';
function App() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div className="dashboard-container">
      <h1>Hello World</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
