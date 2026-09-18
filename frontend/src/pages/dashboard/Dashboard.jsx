import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import workspaceService from "../../services/workspaceService";
import { useAuth } from "../../context/AuthContext";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

function Dashboard(){

    const navigate = useNavigate();

    const { user } = useAuth();

    const [workspaces, setWorkspaces] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

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

    useEffect(() => {
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
                    <LoadingState message="Loading your workspaces..." />
                )}

                {!loading && error && (
                    <ErrorState
                        title="Unable to load workspaces"
                        message={error}
                        onRetry={fetchWorkspaces}
                    />
                )}

                {!loading && !error && workspaces.length === 0 && (
                    <EmptyState
                        title="No workspaces yet"
                        message="Create your first workspace to get started."
                    />
                )}

                {!loading && !error && workspaces.length > 0 && (
                    <div className="workspace-grid">
                        {workspaces.map((workspace) => (
                            <div className="workspace-card" key={workspace._id} onClick={() => navigate(`/workspaces/${workspace._id}`)}>
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