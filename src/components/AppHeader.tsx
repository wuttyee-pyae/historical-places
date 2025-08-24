import React from 'react';

interface AppHeaderProps {
  formattedTime: string;
  formattedDate: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ formattedTime, formattedDate }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">Myanmar Historical Places</h1>
        <p className="app-subtitle">Discover the rich heritage and ancient wonders of Myanmar</p>
        <div className="current-time">{formattedTime}</div>
        <div className="current-date">{formattedDate}</div>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
