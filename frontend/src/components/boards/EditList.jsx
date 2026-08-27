import { useState } from "react";

function EditList({list, onClose, onUpdate}){
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

        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit List</h2>
                    <button type="button" className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="edit-list-name">List Name</label>
                        <input id="edit-list-name" type="text" value={name} onChange={(event) => setName(event.target.value)} autoFocus />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="primary-button">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditList;