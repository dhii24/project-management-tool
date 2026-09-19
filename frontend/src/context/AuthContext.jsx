import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser);
    } 

    catch (error) {
        console.error("Failed to load stored user:", error);

        localStorage.removeItem("user");
        return null;
    }
};

const getStoredToken = () => {
    return localStorage.getItem("token");
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser);
    const [token, setToken] = useState(getStoredToken);

    const login = (userData, authToken) => {
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;

    return (

        <AuthContext.Provider value={{user, token, login, logout, isAuthenticated}} >
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};