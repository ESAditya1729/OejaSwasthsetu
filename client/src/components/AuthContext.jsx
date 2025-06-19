import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";

const AuthContext = createContext();
const BASE_URL = "http://localhost:5000"; // Update this in production

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isValidJWT = (token) => {
    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      return false;
    }
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (e) {
      return false;
    }
  };

  const fetchUserProfile = async () => {
    if (!isValidJWT(token)) {
      console.warn("Invalid or expired token, logging out.");
      logout();
      setIsLoadingUser(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid token or user fetch failed.");
      }

      const data = await response.json();

      const fullProfilePicURL = data.profilePicURL
        ? `${BASE_URL}${data.profilePicURL}`
        : null;

      const userData = {
        id: data.id,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        phone: data.phoneNumber,
        profilePicURL: fullProfilePicURL,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout(); // Clear invalid token
    } finally {
      setIsLoadingUser(false);
    }
  };

  const login = (newToken) => {
    if (!isValidJWT(newToken)) {
      console.error("Attempted to login with invalid token:", newToken);
      return;
    }
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      console.log("✅ Token found, fetching user profile...");
      fetchUserProfile();
    } else {
      setIsLoadingUser(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser, // Added for upload updates
        isLoadingUser,
        fetchUserProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
