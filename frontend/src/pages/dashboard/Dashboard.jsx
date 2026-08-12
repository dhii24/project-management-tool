import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";

import workspaceService from "../../services/workspaceService";

import { useAuth } from "../../context/AuthContext";

function Dashboard(){

    const navigate = useNavigate();

    const { user } = useAuth();

    const [workspaces, setWorkspaces] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchWorkspaces = async () => {

            try{
                setLoading(true);
                setError("");
                const data = await workspaceService.getMyWorkspaces();
                setWorkspaces(data);
            }

            catch (error){
                console.error(error);
                setError(
                    error.response?.data?.message || "Failed to load workspaces." 
                );
            }

            finally{
                setLoading(false);
            }
        };

        fetchWorkspaces();

    }, []);

    return (

        <div className="dashboard">


            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.name}!</p>
            </div>


            <section className="workspace-section">
                <div className="section-header">
                    <h2>Your Workspaces</h2>
                    <button type="button" onClick={() => navigate("/workspaces/create")}>+ Create Workspace</button>
                </div>

                {loading && (
                    <p>Loading workspaces...</p>
                )}

                {!loading && error && (
                    <p className="error-message">{error}</p>
                )}

                {!loading && !error && workspaces.length === 0 && (
                    <p>You don't have any workspaces yet.</p>
                )}

                {!loading && !error && workspaces.length > 0 && (
                    <div className="workspace-grid">
                        {workspaces.map((workspace) => (
                            <div className="workspace-card" key={workspace._id}>
                                <h3>{workspace.name}</h3>
                                <p>Owner:{" "} {workspace.owner?.name}</p>
                                <p>Members:{" "} {workspace.members?.length || 0}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>


        </div>

    );
}

export default Dashboard;