import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import boardService from "../../services/boardService";

function Boards(){

    const { workspaceId } = useParams();

    const [boards, setBoards] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
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
        
        fetchBoards();
    }, [workspaceId]);

    if(loading){
        return (
            <div className="page-message">
                Loading boards...
            </div>
        );
    }

    if(error){
        return (
            <div className="page-message">
                <p className="error-message">
                    {error}
                </p>
            </div>
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
                    <h2>No boards yet</h2>
                    <p>Create your first board to start managing your project.</p>
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