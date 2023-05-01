import { useState, useContext, createContext } from 'react';

const ErrContext = createContext(null);

export default function ErrProvider({ children }) {
  const [error, setError] = useState(null);
  const value = { error, setError };
  return <ErrContext.Provider value={value}>{children}</ErrContext.Provider>;
}

export const useErr = () => useContext(ErrContext);
