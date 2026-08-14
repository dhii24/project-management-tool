import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import workspaceService from "../../services/workspaceService";

function WorkspaceDetails(){

    const { workspaceId } = useParams();

    const navigate = useNavigate();

    const [workspace, setWorkspace] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [memberId, setMemberId] = useState("");

    const [addingMember, setAddingMember] = useState(false);

    const [memberError, setMemberError] = useState("");

    const [memberSuccess, setMemberSuccess] = useState("");

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


    const handleAddMember = async (event) => {
        event.preventDefault();

        try {
            setAddingMember(true);
            setMemberError("");
            setMemberSuccess("");

            const updatedWorkspace = await workspaceService.addMember(workspaceId, {userId: memberId});

            setWorkspace(updatedWorkspace);

            setMemberId("");

            setMemberSuccess("Member added successfully");
        }

        catch(error) {
            console.error(error);

            setMemberError(
                error.response?.data?.message || "Failed to add member"
            );
        }

        finally {
            setAddingMember(false);
        }

    };


    return (

        <div className="workspace-details">

            <div className="workspace-details-header">
                <div>
                    <Link to ="/dashboard" className="back-link">←Back to Dashboard</Link>
                    <h1>{workspace.name}</h1>
                    <p>
                        {workspace.description || "No description provided."}
                    </p>
                </div>
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
                <h2>Workspace</h2>
                <p>Your boards and project activity will appear here.</p>
            </div>


            <div className="members-section">
                <div className="members-header">
                    <div>
                        <h2>Members</h2>
                        <p>Manage members of this workspace.</p>
                    </div>
                </div>

                {memberError && (
                    <div className="error-message">{memberError}</div>
                )}

                {memberSuccess && (
                    <div className="success-message">{memberSuccess}</div>
                )}

                <form className="add-member-form" onSubmit={handleAddMember}>
                    <input type="text" value={memberId} onChange={(event) => setMemberId(event.target.value)} placeholder="Enter user ID" required />
                    <button type="submit" disabled={addingMember}>
                        {addingMember ? "Adding..." : "Add Member"}
                    </button>
                </form>

                <div className="members-list">
                    {workspace.members?.length === 0 ? (
                        <p className="empty-message">
                            No members found.
                        </p>
                    ) : (
                        workspace.members?.map((member) => (
                            <div className="member-card" key={member._id}>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <p>{member.email}</p>
                                </div>

                                <span className="member-role">
                                    {member.role}
                                </span>
                            </div>
                        ))
                    )
                    }
                </div>
            </div>

        </div>
    );
}

export default WorkspaceDetails;