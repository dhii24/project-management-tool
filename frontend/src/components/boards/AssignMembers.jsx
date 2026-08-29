import { useState } from "react";

function AssignMembers({card, members, onClose, onSave}){
    const [selectedMembers, setSelectedMembers] = useState(
        (card.assignedMembers || []).map(
            (member) => typeof member === "string" ? member : member._id
        )
    );

    const handleToggleMember = (memberId) => {
        setSelectedMembers((previousMembers) => {
            if(previousMembers.includes(memberId)){
                return previousMembers.filter((id) => id !== memberId);
            }

            return [...previousMembers, memberId];
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onSave(selectedMembers);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal assign-members-modal" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <h2>Assign Members</h2>
                    <button type="button" className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="assign-members-card-title">
                    <strong>{card.title}</strong>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="members-list">
                        {members.length === 0 ? (
                            <p>No workspace members found</p>
                        ) : (
                            members.map((member) => (
                                <label key={member._id} className="member-option">
                                    <input type="checkbox" checked={selectedMembers.includes(member._id)} onChange={() => handleToggleMember(member._id)} />
                                    <div>
                                        <strong>{member.name}</strong>
                                        <span>{member.email}</span>
                                    </div>
                                </label>
                            ))
                        )}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="primary-button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssignMembers;