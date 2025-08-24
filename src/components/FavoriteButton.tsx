import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  title: string;
  className?: string; 
  style?: React.CSSProperties; 
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick, title, className, style }) => {
  return (
    <button
      className={`favorite-button ${className || ''} ${isFavorite ? " favorite" : ""}`}
      onClick={onClick}
      title={title}
      style={style}
    >
      {isFavorite ? (
        <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
          <path d="M12 17.75l-6.172 3.245 1.179-6.881-5-4.868 6.9-1.002L12 2.25l3.093 6.994 6.9 1.002-5 4.868 1.179 6.881z" />
        </svg>
      ) : (
        <svg width="24" height="24" fill="none" stroke="#8B5CF6" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 17.75l-6.172 3.245 1.179-6.881-5-4.868 6.9-1.002L12 2.25l3.093 6.994 6.9 1.002-5 4.868 1.179 6.881z" />
        </svg>
      )}
      <span className="span-sm">Favorite</span>
    </button>
  );
};

export default React.memo(FavoriteButton);
