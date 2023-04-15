import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/users/isLoggedIn', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
          setIsLoggedIn(true);
        }
        console.log(res);
      });
  }, []);

  const value = {
    user,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
