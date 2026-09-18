import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import workspaceService from "../../services/workspaceService";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

function WorkspaceOverview(){

    const { workspaceId } = useParams();

    const [workspace, setWorkspace] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

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

    useEffect(() => {
        if(!workspaceId){
            return;
        }

        fetchWorkspace();
    }, [workspaceId]);
    
    if (loading) {
        return (
            <LoadingState message="Loading workspace..." />
        );
    }


    if (error) {
        return (
            <ErrorState
                title="Unable to load workspace"
                message={error}
                onRetry={fetchWorkspace}
            />
        );
    }

    if (!workspace) {
        return (
            <EmptyState
                title="Workspace not found"
                message="The requested workspace could not be found."
            />
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
                    <h3>Members</h3>
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