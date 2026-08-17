import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import workspaceService from "../../services/workspaceService";

function WorkspaceOverview(){

    const { workspaceId } = useParams();

    const navigate = useNavigate();

    const [workspace, setWorkspace] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWorkspace = async () => {
            try{
                setLoading(true);
                setError("");

                const data = await workspaceService.getWorkspaceById(workspaceId);

                setWorkspace(data);
            }

            catch(error){
                console.error(error);

                setError(
                    error.response?.data?.message || 'Failed to load workspace'
                );
            }

            finally{
                setLoading(false);
            }
        }

        fetchWorkspace();

    }, [workspaceId]);

    
    if(loading){
        return (
            <div className="page-message">
                Loading workspace...
            </div>
        );
    }


    if(error){
        return (
            <div className="page-message">
                <p className="error-message">{error}</p>
                <button type="button" onClick={() => navigate("/dashboard")}>Back to dashboard</button>
            </div>
        );
    }

    if(!workspace){
        return(
            <div className="page-message">
                Workspace not found.
            </div>
        );
    }


    return (

        <div className="workspace-page">

            <div className="workspace-page-header">
                <h1>{workspace.name}</h1>
                <p>
                    {workspace.description || "No description provided."}
                </p>
            </div>

            <div className="workspace-info-grid">
                <div className="info-card">
                    <h3>Owner</h3>
                    <p>
                        {workspace.owner?.name || "Unknown"}
                    </p>
                    <small>
                        {workspace.owner?.email}
                    </small>
                </div>

                <div className="info-card">
                    <h3>Member</h3>
                    <p>
                        {workspace.members?.length || 0}
                    </p>
                </div>

                <div className="info-card">
                    <h3>Boards</h3>
                    <p>0</p>
                    <small>
                        Boards will be added soon
                    </small>
                </div>
            </div>

            <div className="workspace-content">
                <h2>Welcome to your workspace</h2>
                <p>Manage your boards, team members and project activity from this workspace.</p>
            </div>
        </div>
    );
}

export default WorkspaceOverview;