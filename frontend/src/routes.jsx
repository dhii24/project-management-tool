import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/common/NotFound";

function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
                
                {/* Authentication Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Route>

                {/* Application Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Route>

                <Route path="*" element={<NotFound/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;