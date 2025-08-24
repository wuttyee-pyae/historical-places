import React from 'react';
import type { HistoricalPlace } from '../types/HistoricalPlace';
import FavoriteButton from './FavoriteButton';

interface FeatureCardProps {
  place: HistoricalPlace;
  onToggleFavorite: (id: number) => void;
  onExploreClick: (id: number) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ place, onToggleFavorite, onExploreClick }) => {
  return (
    <div
      className="feature-card glass-card"
      style={{
        position: "relative",
        backgroundImage: `url(${place.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        minHeight: "260px",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(44, 62, 80, 0.7)",
          zIndex: 1
        }}
      />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", width: "100%" }}>
        <h3 className="feature-title" style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{place.name}</h3>
        <p className="feature-description truncate-description" style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>{place.location} • {place.year > 0 ? `${place.year} AD` : `${Math.abs(place.year)} BC`}</p>
        
        <button className="hero-button" onClick={() => onExploreClick(place.id)}>Explore Now →</button> <br/>
        <FavoriteButton
          isFavorite={!!place.visited}
          onClick={() => onToggleFavorite(place.id)}
          title={place.visited ? "Remove from favorites" : "Mark as favorite"}
          className="feature-button"
        />
      </div>
    </div>
  );
};

export default React.memo(FeatureCard);
