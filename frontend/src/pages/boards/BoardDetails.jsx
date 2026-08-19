import { useParams } from "react-router-dom";

function BoardDetails(){

    const { workspaceId, boardId } = useParams();

    return (
        <div className="workspace-page">
            <div className="workspace-page-header">
                <h1>Board</h1>
                <p>Workspace ID: {" "} {workspaceId} </p>
                <p>Board ID: {" "} {boardId}</p>
            </div>

            <div className="board-placeholder">
                Board interface will be built here.
            </div>
        </div>
    );
}

export default BoardDetails;