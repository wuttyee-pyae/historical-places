import React from 'react';

interface ErrorDisplayProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center p-10 glass-card max-w-md w-full">
        <div className="text-red-400 text-6xl mb-6">⚠️</div>
        <h2 className="text-3xl font-bold text-white mb-3">Exploration Halted!</h2>
        <p className="text-red-200 text-lg mb-6">{errorMessage}</p>
        <button 
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={onRetry}
        >
          Retry Expedition
        </button>
      </div>
    </div>
  );
};

export default React.memo(ErrorDisplay);
