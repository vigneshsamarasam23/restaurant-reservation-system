import { createContext, useContext, useState } from "react";
import {
  authLogin as authLoginAPI,
  authSignup as authSignupAPI,
} from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await authLoginAPI(email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      return { success: true, user: response.user };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await authSignupAPI(name, email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      return { success: true, user: response.user };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.message || "Signup failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
