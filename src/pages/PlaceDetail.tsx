import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from "../store";
import { motion } from 'framer-motion'; // Import framer-motion

interface PlaceDetailProps {
  // No longer needs places as a prop, will get from Redux
}

const PlaceDetail: React.FC<PlaceDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { places } = useSelector((state: RootState) => state.places);
  const place = places.find(p => p.id === Number(id));

  // Local state for image, updates when place.image changes
  const [imageSrc, setImageSrc] = useState(place?.image);

  useEffect(() => {
    setImageSrc(place?.image);
  }, [place?.image]);

  console.log("Rendering PlaceDetail for place ID:", id, place?.image);

  if (!place) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Place not found</h2>
        <button className="hero-button" onClick={() => navigate("/")}>Back to List</button>
      </div>
    );
  }

  return (
    <motion.div
      className="app"
      initial={{ y: 50, opacity: 0 }} // Start slightly below and transparent
      animate={{ y: 0, opacity: 1 }}   // Animate to original position and full opacity
      transition={{ duration: 0.7, ease: "easeOut" }} // Smooth transition
    >
      <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
        {/* <button className="hero-button" style={{ marginBottom: 24 }} onClick={() => navigate("/")}>← Back</button> */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>{place?.name}</h1>
          <img
            src={imageSrc}
            alt={place?.name}
            style={{ width: "100%", maxHeight: 350, objectFit: "cover", borderRadius: "12px", marginBottom: "1rem" }}
            onError={e => { (e.currentTarget as HTMLImageElement).src = "/images/fallback.jpg"; }}
          />
          <p style={{ color: "#fff", marginBottom: "1rem" }}>{place.description}</p>
          <p style={{ color: "#888", marginBottom: "1rem" }}> <strong>History:</strong></p>
          <p style={{ color: "#fff", marginBottom: "1rem" }}>{place.history}</p>
          <p style={{ color: "#888", marginBottom: "1rem" }}>
            <strong>Location:</strong> {place.location}
          </p>
          <p style={{ color: "#888", marginBottom: "1rem" }}>
            <strong>Year:</strong> {place.year > 0 ? `${place.year} AD` : `${Math.abs(place.year)} BC`}
          </p>
          <button className="hero-button" onClick={() => navigate("/")}>Back</button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceDetail;
