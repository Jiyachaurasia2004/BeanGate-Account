import { createContext, useContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null); // Example user state
    const serverUrl = "http://localhost:3000"; // Your server URL

    // Store token in localStorage and state
    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    // Logout function
    const LogoutToken = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ isLoggedIn, LogoutToken, storeTokenInLs, user, setUser, serverUrl }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
