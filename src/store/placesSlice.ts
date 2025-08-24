import { createSlice } from '@reduxjs/toolkit';
import type { HistoricalPlace } from '../types/HistoricalPlace';
import { createSelector } from 'reselect';
import type { RootState } from '../store';

interface PlacesState {
  places: HistoricalPlace[];
}

const initialState: PlacesState = {
  places: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    toggleVisited: (state, action: { payload: number }) => {
      const id = action.payload;
      const place = state.places.find(p => p.id === id);
      if (place) {
        place.visited = !place.visited;
      }
    },
    toggleFavorite: (state, action: { payload: number }) => {
      const id = action.payload;
      const place = state.places.find(p => p.id === id);
      if (place) {
        place.visited = !place.visited; // As per your previous clarification, toggle 'visited' for favorite
      }
    },
    setPlaces: (state, action: { payload: HistoricalPlace[] }) => {
      state.places = action.payload;
    },
  },
});

export const { toggleVisited, toggleFavorite, setPlaces } = placesSlice.actions;
export default placesSlice.reducer;


const selectPlacesState = (state: RootState) => state.places || initialState;
export const selectPlaces = createSelector(
  [selectPlacesState],
  (placesState) => placesState.places
);
