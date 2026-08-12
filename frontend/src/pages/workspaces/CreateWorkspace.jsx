import { useState } from "react";

import { useNavigate } from "react-router-dom";

import workspaceService from "../../services/workspaceService";

function CreateWorkspace(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        description:""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            setLoading(true);
            setError("");

            const workspace = await workspaceService.createWorkspace(formData);
            // navigate(`/workspaces/${workspace._id}`);
            navigate("/dashboard");
        }

        catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Failed to create workspace.");
        }

        finally {
            setLoading(false);
        }
    };

    return (

        <div className="form-page">

            <div className="form-container">

                <h1>Create Workspace</h1>
                <p className="form-description">Create a workspace to organize your projects and team</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Workspace Name</label>
                        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter workspace name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Enter workspace description" rows="5" />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate("/dashboard")} disabled={loading}>Cancel</button>
                        <button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Workspace"}
                        </button>
                    </div>

                </form>

            </div>

        </div>

    );
}

export default CreateWorkspace;