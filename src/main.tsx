import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store'; // Update import path to new store
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Wrap App with PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
