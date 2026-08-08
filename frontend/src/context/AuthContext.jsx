import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {

        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

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