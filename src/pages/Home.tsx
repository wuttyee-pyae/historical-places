import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoricalPlaces } from '../data/places';
import { toggleFavorite, setPlaces, selectPlaces } from '../store/placesSlice'; 
import '../App.css';
import type { HistoricalPlace } from '../types/HistoricalPlace';
import LoadingSpinner from '../components/LoadingSpinner'; 
import ErrorDisplay from '../components/ErrorDisplay'; 
import AppHeader from '../components/AppHeader'; 
import HeroCard from '../components/HeroCard'; 
import FeatureCard from '../components/FeatureCard'; 
import BottomGridCard from '../components/BottomGridCard'; 
import { motion } from 'framer-motion'; 

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const places = useSelector(selectPlaces);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [randomIndices, setRandomIndices] = useState<{ 
    heroPlaceIndex: number | null;
    rightColumnPlaceIndex1: number | null;
    rightColumnPlaceIndex2: number | null;
  }>({ heroPlaceIndex: null, rightColumnPlaceIndex1: null, rightColumnPlaceIndex2: null });


  const generateRandomIndices = React.useCallback((currentPlaces: HistoricalPlace[]) => {
    if (currentPlaces.length === 0) {
      return { heroPlaceIndex: null, rightColumnPlaceIndex1: null, rightColumnPlaceIndex2: null };
    }
    const generateUniqueIndex = (excludeIndices: number[]) => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * currentPlaces.length);
      } while (excludeIndices.includes(randomIndex));
      return randomIndex;
    };
    const newHeroIndex = 0; 
    const newRightColumnIndex1 = generateUniqueIndex([newHeroIndex]);
    const newRightColumnIndex2 = generateUniqueIndex([newHeroIndex, newRightColumnIndex1]);
    return { heroPlaceIndex: newHeroIndex, rightColumnPlaceIndex1: newRightColumnIndex1, rightColumnPlaceIndex2: newRightColumnIndex2 };
  }, []);

  useEffect(() => {
    const getPlacesAndSetRandomIndices = async () => {
      try {
        setLoading(true); 
        const data = await fetchHistoricalPlaces();
        const initialPlaces = data.map(place => ({ ...place, visited: false, favorite: false }));
        dispatch(setPlaces(initialPlaces));

        // Generate and set random indices ONLY ONCE after initial data fetch
        if (initialPlaces.length > 0) {
          const newRandomIndices = generateRandomIndices(initialPlaces);
          setRandomIndices(newRandomIndices);
        }
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch historical places data.');
        setLoading(false);
      }
    };

    if (places?.length === 0) {
      getPlacesAndSetRandomIndices();
    } else if (randomIndices.heroPlaceIndex === null) {
      const newRandomIndices = generateRandomIndices(places);
      setRandomIndices(newRandomIndices);
      setLoading(false); 
    } else {
      setLoading(false);
    }

  }, [dispatch, places?.length, generateRandomIndices]); 

  const { heroPlaceIndex, rightColumnPlaceIndex1, rightColumnPlaceIndex2 } = randomIndices;

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id)); 
  };

  const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const displayedPlaceIds = [
    heroPlaceIndex !== null ? places[heroPlaceIndex].id : null,
    rightColumnPlaceIndex1 !== null ? places[rightColumnPlaceIndex1].id : null,
    rightColumnPlaceIndex2 !== null ? places[rightColumnPlaceIndex2].id : null,
  ].filter((id): id is number => id !== null);

  // Filter out the displayed places from the main list for the bottom grid
  const bottomGridPlaces = places.filter(place => !displayedPlaceIds.includes(place.id));

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay errorMessage={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <motion.div
      className="app"
      initial={{ y: 50, opacity: 0 }} // Start slightly below and transparent
      animate={{ y: 0, opacity: 1 }}   // Animate to original position and full opacity
      transition={{ duration: 0.7, ease: "easeOut" }} // Smooth transition
    >
      {/* Header Section */}
      <AppHeader formattedTime={formattedTime} formattedDate={formattedDate} />

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section - Top Left */}
        {heroPlaceIndex !== null && places[heroPlaceIndex] && (
          <HeroCard 
            place={places[heroPlaceIndex]} 
            onToggleFavorite={handleToggleFavorite}
            onExploreClick={(id) => navigate(`/place/${id}`)}
          />
        )}

        {/* Right Column - Two Cards */}
        <div className="right-column" style={{ display: "flex", gap: "2rem" }}>
          <h3>Suggested Places</h3>
          {rightColumnPlaceIndex1 !== null && places[rightColumnPlaceIndex1] && (
            <FeatureCard 
              place={places[rightColumnPlaceIndex1]}
              onToggleFavorite={handleToggleFavorite}
              onExploreClick={(id) => navigate(`/place/${id}`)}
            />
          )}
          {rightColumnPlaceIndex2 !== null && places[rightColumnPlaceIndex2] && (
            <FeatureCard 
              place={places[rightColumnPlaceIndex2]}
              onToggleFavorite={handleToggleFavorite}
              onExploreClick={(id) => navigate(`/place/${id}`)}
            />
          )}
        </div>

      </main>

      {/* Bottom Grid - Remaining Places */}
      <h2 className="bottom-grid-title" style={{padding: "0 6rem"}}>More Wonders to Discover</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          padding: "2rem 6rem"
        }}
      >
        {bottomGridPlaces.map((place) => (
          <BottomGridCard 
            key={place.id}
            place={place}
            onToggleFavorite={handleToggleFavorite}
            onExploreClick={(id) => navigate(`/place/${id}`)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Home;