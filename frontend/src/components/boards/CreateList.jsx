import { useState } from "react";

function CreateList({ onClose, onCreate, loading }) {

    const [name, setName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!name.trim()){
            return;
        }

        await onCreate({
            name: name.trim()
        });
    };


    return (

        <div className="modal-overlay">

            <div className="modal">
                
                <div className="modal-header">
                    <h2>Create List</h2>
                    <button type="button" className="modal-close" onClick={onClose}>×</button>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="list-name">List Name</label>
                        <input id="list-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter list name" autoFocus/>
                    </div>


                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="primary-button" disabled={loading}>{loading ? "Creating..." : "Create List"}</button>
                    </div>
                </form>
            </div>

        </div>

    );

}


export default CreateList;