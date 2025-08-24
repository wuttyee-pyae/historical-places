import React from 'react';
import type { HistoricalPlace } from '../types/HistoricalPlace';
import FavoriteButton from './FavoriteButton';

interface HeroCardProps {
  place: HistoricalPlace;
  onToggleFavorite: (id: number) => void;
  onExploreClick: (id: number) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ place, onToggleFavorite, onExploreClick }) => {
  return (
    <div className="hero-card glass-card" style={{ backgroundImage: `url(${place.image})` , marginTop: '100px' }}>
      <div className="hero-card-content">
        <h2 className="hero-title">{place.name}</h2>
        <p className="hero-description truncate-description">{place.description}</p>
        <div className="flex items-center space-x-4 mt-6">
          <button className="hero-button" onClick={() => onExploreClick(place.id)}>Explore Now →</button>
          <FavoriteButton
            isFavorite={!!place.visited}
            onClick={() => onToggleFavorite(place.id)}
            title={place.visited ? "Remove from favorites" : "Mark as favorite"}
            className="position-right" 
            style={{ marginRight: '8%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroCard);
