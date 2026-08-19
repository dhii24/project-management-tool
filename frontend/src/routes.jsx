import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/common/NotFound";
import CreateWorkspace from "./pages/workspaces/CreateWorkspace";
import WorkspaceLayout from "./layouts/WrokspaceLayout";
import WorkspaceOverview from "./pages/workspaces/WorkspaceOverview";
import WorkspaceMembers from "./pages/workspaces/WorkspaceMembers";
import Boards from "./pages/boards/Boards";
import CreateBoard from "./pages/boards/CreateBoard";
import BoardDetails from "./pages/boards/BoardDetails";

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
                        <Route path="/workspaces/:workspaceId" element={<WorkspaceLayout />}>
                            <Route index element={<WorkspaceOverview />} />
                            <Route path="boards" element={<Boards />} />
                            <Route path="boards/create" element={<CreateBoard />} />
                            <Route path="boards/:boardId" element={<BoardDetails />} />
                            <Route path="members" element={<WorkspaceMembers />} />
                            <Route path="settings" element={
                                <div>
                                    Settings coming soon...
                                </div>
                            } />
                        </Route>
                    </Route>
                </Route>

                 {/* 404 */}
                <Route path="*" element={<NotFound/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;