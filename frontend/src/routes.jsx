import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/common/NotFound";
import CreateWorkspace from "./pages/workspaces/CreateWorkspace";
import WorkspaceDetails from "./pages/workspaces/WorkspaceDetails";

function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
                
                {/* Authentication Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Route>

                {/* Protected Application Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/workspaces/create" element={<CreateWorkspace />} />
                        <Route path="/workspaces/:workspaceId" element={<WorkspaceDetails />} />
                    </Route>
                </Route>

                 {/* 404 */}
                <Route path="*" element={<NotFound/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;