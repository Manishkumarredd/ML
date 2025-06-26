import React from 'react';
import { Smartphone, Watch, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isConnected: boolean;
  onToggleConnection: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isConnected, onToggleConnection }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Watch className="h-8 w-8 text-primary-600" />
              <Smartphone className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HealthSync</h1>
              <p className="text-xs text-gray-500">Smart Health Tracker</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleConnection}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isConnected
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span>Disconnected</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};