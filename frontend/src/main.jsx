import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/globals.css";
import "./styles/auth.css";
import "./styles/components.css";

import AppRoutes from "./routes";

ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <AppRoutes />

    </React.StrictMode>

);