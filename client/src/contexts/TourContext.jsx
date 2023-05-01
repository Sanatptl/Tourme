import { useContext, createContext, useState } from 'react';

const TourContext = createContext(null);

export default function TourProvider({ children }) {
  const [showTour, setShowTour] = useState(false);
  const [tourDetails, setTourDetails] = useState(
    JSON.parse(localStorage.getItem('tour')) || {}
  );

  const value = { showTour, setShowTour, tourDetails, setTourDetails };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export const useTours = () => useContext(TourContext);
