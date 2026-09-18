import { useState } from "react";

function ManageLabels({ card, onClose, onSave, loading }){
    const availableLabels= ["Bug", "Frontend", "Backend", "Urgent", "Enhancement", "Documentation", "Testing"];

    const[selectedLabels, setSelectedLabels] = useState(card.labels || []);

    const handleToggleLabel = (label) => {
        setSelectedLabels((previousLabels) => {
            if(previousLabels.includes(label)){
                return previousLabels.filter((item) => item !== label);
            }

            return [...previousLabels, label];
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSave(selectedLabels);
    };

    return (
        <div className="modal-overlay" onClick={loading ? undefined : onClose}>
            <div className="modal manage-labels-modal" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <h2>Manage Labels</h2>
                    <button type="button" className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="manage-labels-card-title">
                    <strong>{card.title}</strong>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="labels-list">
                        {availableLabels.map((label) => (
                            <label key={label} className="label-option">
                                <input type="checkbox" checked={selectedLabels.includes(label)} onChange={() => handleToggleLabel(label)} disabled={loading}/>
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="primary-button" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManageLabels;