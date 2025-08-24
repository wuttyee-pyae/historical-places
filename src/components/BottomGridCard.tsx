import React from 'react';
import type { HistoricalPlace } from '../types/HistoricalPlace';
import FavoriteButton from './FavoriteButton';

interface BottomGridCardProps {
  place: HistoricalPlace;
  onToggleFavorite: (id: number) => void;
  onExploreClick: (id: number) => void;
}

const BottomGridCard: React.FC<BottomGridCardProps> = ({ place, onToggleFavorite, onExploreClick }) => {
  return (
    <div key={place.id} className="bottom-grid-card glass-card" style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="bottom-grid-card-image"
        style={{
          backgroundImage: `url(${place.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: '100%',
          borderRadius: "12px 12px 0 0",
        }}
      ></div>
      <div className="bottom-grid-card-content" style={{ padding: "1rem", flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
        <h3 className="bottom-grid-card-title" style={{ fontSize: "1.25rem", fontWeight: "bold", margin: "0.5rem 0" }}>{place.name}</h3>
        <p className="bottom-grid-card-location" style={{ color: "#888", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
          📍 {place.location} • {place.year > 0 ? `${place.year} AD` : `${Math.abs(place.year)} BC`}
        </p>
        <p className="bottom-grid-card-description truncate-description">{place.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" , marginTop : '30px' }}>
          <button className="bottom-grid-button" onClick={() => onExploreClick(place.id)}>Explore Now →</button>
          <FavoriteButton
            isFavorite={!!place.visited}
            onClick={() => onToggleFavorite(place.id)}
            title={place.visited ? "Remove from favorites" : "Mark as favorite"}
            className="position-right" 
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomGridCard);
