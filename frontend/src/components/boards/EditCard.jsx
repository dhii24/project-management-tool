import { useState } from "react";

function EditCard({card, onClose, onUpdate}){
    const [title, setTitle] = useState(card.title || "");

    const [description, setDescription] = useState(card.description || "");

    const [priority, setPriority] = useState(card.priority || "medium");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!title.trim()){
            return;
        }

        await onUpdate({
            title: title.trim(),
            description: description.trim(),
            priority
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Card</h2>
                    <button type="button" className="modal-class" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="edit-card-title">Title</label>
                        <input id="edit-card-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-card-description">Description</label>
                        <textarea id="edit-card-description" value={description} onChange={(event) => setDescription(event.target.value)} rows="4" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-card-priority">Priority</label>
                        <select id="edit-card-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
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

export default EditCard;