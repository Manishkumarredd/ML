import React from 'react';
import { AlertTriangle, Info, AlertCircle, X, Trophy, Heart, Apple, Dumbbell, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const AlertsPanel: React.FC = () => {
  const { alerts, dismissAlert } = useStore();

  const getAlertIcon = (type: string, category: string) => {
    if (type === 'achievement') return Trophy;
    
    switch (category) {
      case 'health': return Heart;
      case 'nutrition': return Apple;
      case 'fitness': return Dumbbell;
      case 'hydration': return Droplets;
      default:
        switch (type) {
          case 'critical': return AlertCircle;
          case 'warning': return AlertTriangle;
          case 'info': return Info;
          default: return Info;
        }
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'achievement':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Alerts</h3>
        <div className="text-center py-8">
          <div className="text-green-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-500">All systems normal</p>
          <p className="text-sm text-gray-400 mt-1">Your AI health assistant is monitoring everything</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Alerts</h3>
        <span className="text-sm text-gray-500">{alerts.length} active</span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type, alert.category);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-4 rounded-lg border ${getAlertStyles(alert.type)} relative`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                    
                    {alert.recommendations && (
                      <div className="mt-2">
                        <p className="text-xs font-medium opacity-75 mb-1">Recommendations:</p>
                        <ul className="text-xs opacity-75 space-y-1">
                          {alert.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <span>•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <p className="text-xs mt-2 opacity-75">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};