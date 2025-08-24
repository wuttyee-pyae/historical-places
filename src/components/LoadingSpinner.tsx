import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center p-10 glass-card max-w-sm w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-400 mx-auto mb-6"></div>
        <p className="mt-4 text-xl font-semibold text-indigo-200">Journeying through time...</p>
      </div>
    </div>
  );
};

export default React.memo(LoadingSpinner);
