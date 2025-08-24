import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoricalPlaces } from '../data/places';
import { toggleFavorite, setPlaces, selectPlaces } from '../store/placesSlice'; // Update import for actions and add selector
import type { RootState } from '../store'; // Update import for RootState
import '../App.css';
import type { HistoricalPlace } from '../types/HistoricalPlace';
import FavoriteButton from '../components/FavoriteButton'; // Import the new component
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component
import ErrorDisplay from '../components/ErrorDisplay'; // Import the ErrorDisplay component
import AppHeader from '../components/AppHeader'; // Import the AppHeader component
import HeroCard from '../components/HeroCard'; // Import the HeroCard component
import FeatureCard from '../components/FeatureCard'; // Import the FeatureCard component
import BottomGridCard from '../components/BottomGridCard'; // Import the BottomGridCard component

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const places = useSelector(selectPlaces);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // State to store randomized indices, set only once on initial load
  const [randomIndices, setRandomIndices] = useState<{ 
    heroPlaceIndex: number | null;
    rightColumnPlaceIndex1: number | null;
    rightColumnPlaceIndex2: number | null;
  }>({ heroPlaceIndex: null, rightColumnPlaceIndex1: null, rightColumnPlaceIndex2: null });
  // Remove randomIndicesReady state, it was adding unnecessary complexity
  // const [randomIndicesReady, setRandomIndicesReady] = useState<boolean>(false);

  // Helper function to generate unique random indices
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
    const newHeroIndex = 0; // Reverted to generate a random index
    const newRightColumnIndex1 = generateUniqueIndex([newHeroIndex]);
    const newRightColumnIndex2 = generateUniqueIndex([newHeroIndex, newRightColumnIndex1]);
    return { heroPlaceIndex: newHeroIndex, rightColumnPlaceIndex1: newRightColumnIndex1, rightColumnPlaceIndex2: newRightColumnIndex2 };
  }, []);

  useEffect(() => {
    const getPlacesAndSetRandomIndices = async () => {
      try {
        setLoading(true); // Ensure loading is true while fetching
        const data = await fetchHistoricalPlaces();
        const initialPlaces = data.map(place => ({ ...place, visited: false, favorite: false }));
        dispatch(setPlaces(initialPlaces));

        // Generate and set random indices ONLY ONCE after initial data fetch
        if (initialPlaces.length > 0) {
          const newRandomIndices = generateRandomIndices(initialPlaces);
          setRandomIndices(newRandomIndices);
        }
        setLoading(false); // Only set to false after places and random indices are ready
      } catch (err) {
        setError('Failed to fetch historical places data.');
        setLoading(false);
      }
    };

    // This useEffect will run only once on mount, or when places.length becomes 0 again
    if (places?.length === 0) {
      getPlacesAndSetRandomIndices();
    } else if (randomIndices.heroPlaceIndex === null) {
      // If places are loaded (e.g., from persistence) but randomIndices are not set
      const newRandomIndices = generateRandomIndices(places);
      setRandomIndices(newRandomIndices);
      setLoading(false); // Set loading to false now that indices are generated
    } else {
      setLoading(false);
    }

  }, [dispatch, places?.length, generateRandomIndices]); // Safely access places?.length

  // Destructure random indices from state
  const { heroPlaceIndex, rightColumnPlaceIndex1, rightColumnPlaceIndex2 } = randomIndices;

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id)); // Dispatch Redux action
  };

  const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  // Get the IDs of the places currently displayed in the hero and right-column sections
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
    <div className="app">
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
    </div>
  );
};

export default Home;