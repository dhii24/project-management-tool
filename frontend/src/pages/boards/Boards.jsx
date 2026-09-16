import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import boardService from "../../services/boardService";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

function Boards(){

    const { workspaceId } = useParams();

    const [boards, setBoards] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchBoards = async () => {
        try{
            setLoading(true);
            setError("");

            const data = await boardService.getBoardsByWorkspace(workspaceId);
            setBoards(data);
        }

        catch(error){
            console.error(error);
            
            setError(
                error.response?.data?.message || "Failed to load boards."
            );
        }

        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!workspaceId) {
            return;
        }

        fetchBoards();
    }, [workspaceId]);

    if(loading){
        return (
            <LoadingState message="Loading boards..." />
        );
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load boards"
                message={error}
                onRetry={fetchBoards}
            />
        );
    }

    return (
        <div className="workspace-page">
            <div className="workspace-page-header">
                <div>
                    <h1>Boards</h1>
                    <p>Manage your project boards.</p>
                </div>

                <Link to={`/workspaces/${workspaceId}/boards/create`} className="primary-button">Create Board</Link>
            </div>

            {boards.length === 0 ? (
                <div className="empty-state">
                    <EmptyState
                        title="No boards yet"
                        message="Create your first board to start organizing your work."
                    />
                    <Link to={`/workspaces/${workspaceId}/boards/create`} className="primary-button">Create Board</Link>
                </div>
            ) : (
                <div className="boards-grid">
                    {boards.map((board) => (
                        <Link key={board._id} to={`/workspaces/${workspaceId}/boards/${board._id}`} className="board-card">
                            <h3>{board.name}</h3>
                            <p>{board.description || "No description"}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Boards;