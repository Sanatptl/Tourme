import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/users/isLoggedIn`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setUser(res.data.data);
          setIsLoggedIn(true);
        }
        // console.log(res);
      })
      .catch((err) => console.log(err));
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
