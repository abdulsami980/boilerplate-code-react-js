// src/context/AuthProvider.jsx
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // prevent flicker on refresh

  // 🧱 Static test credentials
  const STATIC_CREDENTIALS = {
    email: "abdulsamiimran786@gmail.com",
    password: "123",
    role: "admin",
  };

  // ✅ Login function
  const login = (email, password) => {
    if (
      email === STATIC_CREDENTIALS.email &&
      password === STATIC_CREDENTIALS.password
    ) {
      const userData = { email, role: STATIC_CREDENTIALS.role };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      return true;
    } else {
      alert("Invalid credentials");
      return false;
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  // ✅ Restore session on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 🧠 Debug logging (optional)
  useEffect(() => {
    if (user) {
      console.log("✅ User logged in:", user);
    } else {
      console.log("🚪 User logged out or not authenticated");
    }
  }, [user]);

  // 🧭 Avoid rendering children until auth state restored
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="animate-pulse">Restoring session…</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
