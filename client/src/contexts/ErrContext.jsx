import { useState, useContext, createContext } from 'react';

const ErrContext = createContext(null);

export default function ErrProvider({ children }) {
  const [msg, setMsg] = useState('');
  const [showErr, setShowErr] = useState(false);
  const value = { msg, setMsg, showErr, setShowErr };
  return <ErrContext.Provider value={value}>{children}</ErrContext.Provider>;
}

export const useErr = () => useContext(ErrContext);
