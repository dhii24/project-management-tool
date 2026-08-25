import { useState } from "react";

function CreateCard({onClose, onCreate}){
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [priority, setPriority] = useState("medium");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!title.trim()){
            return;
        }

        await onCreate({
            title: title.trim(),
            description: description.trim(),
            priority
        });
    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">
                    <h2>Create Card</h2>
                    <button type="button" className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit = {handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="card-title">Title</label>
                        <input id="card-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter card title" autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card-description">
                            Description
                        </label>
                        <textarea id="card-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter description" rows="4" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card-priority">Priority</label>
                        <select id="card-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="primary-button" >Create Card</button>
                    </div>
                </form>

            </div>

        </div>

    );
}

export default CreateCard;