import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isConnected={isConnected} onToggleConnection={handleToggleConnection} />
      <Dashboard isConnected={isConnected} />
    </div>
  );
}

export default App;