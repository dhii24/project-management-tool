import { useState } from "react";

function EditList({list, onClose, onUpdate, loading}){
    const [name, setName] = useState(list.name || "");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!name.trim()){
            return;
        }

        await onUpdate({
            name: name.trim()
        });
    };

    return (

        <div className="modal-overlay"  onClick={loading ? undefined : onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit List</h2>
                    <button type="button" className="modal-close" onClick={onClose} disabled={loading}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="edit-list-name">List Name</label>
                        <input id="edit-list-name" type="text" value={name} onChange={(event) => setName(event.target.value)} autoFocus disabled={loading}/>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="primary-button" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditList;