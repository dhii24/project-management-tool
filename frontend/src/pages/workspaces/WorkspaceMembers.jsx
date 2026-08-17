import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import workspaceService from "../../services/workspaceService";

function WorkspaceMembers(){

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
                <div>
                    <h1>Members</h1>
                    <p>Manage members of{" "}
                        <strong>
                            {workspace.name}
                        </strong>
                    </p>
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

    );

}

export default WorkspaceMembers;