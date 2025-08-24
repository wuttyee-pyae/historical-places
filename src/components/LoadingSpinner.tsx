
import React from 'react';
import './LoadingSpinner.css';
import { motion } from 'framer-motion'; // Import motion

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div 
      className="loading-container"
      initial={{ opacity: 0, scale: 0.8 }} // Initial state
      animate={{ opacity: 1, scale: 1 }}   // Animation to state
      transition={{ duration: 0.5 }}     // Transition properties
    >
      <div className="loading-card">
        <div className="spinner-wrapper">
          <span className="spinner-pulse"></span>
          <svg className="spinner-icon" viewBox="0 0 50 50">
            <circle className="spinner-path" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="6" fill="none" />
            <path className="spinner-ring" d="M25 5a20 20 0 0 1 20 20" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="loading-title">Loading Historical Wonders...</h2>
        <p className="loading-message">Journeying through time and space to bring you the best places!</p>
      </div>
    </motion.div>
  );
};

export default React.memo(LoadingSpinner);
