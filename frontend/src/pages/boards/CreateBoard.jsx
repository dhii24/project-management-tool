import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import boardService from "../../services/boardService";

function CreateBoard(){

    const { workspaceId } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            setLoading(true);
            setError("");
  
            const board =  await boardService.createBoard(workspaceId, {name, description});

            navigate(`/workspaces/${workspaceId}/boards/${board._id}`);
        }

        catch(error){   
            console.error(error);
            setError(
                error.response?.data?.message || "Failed to create board."
            );
        }

        finally{
            setLoading(false);
        }
    };

    return (

        <div className="workspace-page">

            <div className="workspace-page-header">
                <h1>Create Board</h1>
                <p>Create a board for your workspace</p>
            </div>

            <form className="form-card" onSubmit={handleSubmit}>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="title">Board Name</label>
                    <input id="title" type="text" value={name} onChange={(event) => 
                        setName(event.target.value)
                    }
                    placeholder="e.g. Website Development" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Describe this board" rows="5"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate(`/workspaces/${workspaceId}/boards`)}>Cancel</button>
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Board"}
                    </button>
                </div>

            </form>

        </div>

    );
}

export default CreateBoard;