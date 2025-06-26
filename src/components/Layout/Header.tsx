import React from 'react';
import { Brain, Smartphone, Watch, Wifi, WifiOff, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const Header: React.FC = () => {
  const { isDeviceConnected, setDeviceConnection, alerts, user } = useStore();
  const unreadAlerts = alerts.filter(alert => alert.actionRequired).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-wellness-heart rounded-full animate-pulse-slow"></div>
              </div>
              <Watch className="h-6 w-6 text-primary-500" />
              <Smartphone className="h-5 w-5 text-primary-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WellnessAI</h1>
              <p className="text-xs text-gray-500">AI-Powered Health Platform</p>
            </div>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadAlerts}
                  </span>
                )}
              </button>
            </div>

            {/* Device Connection */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDeviceConnection(!isDeviceConnected)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDeviceConnected
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              {isDeviceConnected ? (
                <>
                  <Wifi className="h-4 w-4" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  <span>Connect Device</span>
                </>
              )}
            </motion.button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};