import React from "react";
import ReactDOM from "react-dom/client";

import AppRoutes from "./routes";

import { AuthProvider } from "./context/AuthContext.jsx";

import "./styles/globals.css";
import "./styles/auth.css";
import "./styles/components.css";


ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </React.StrictMode>
    
);