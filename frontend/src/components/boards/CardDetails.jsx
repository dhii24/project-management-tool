function CardDetails({card, onClose, onEdit, onDelete}){
    if(!card)
        return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="card-details-modal" onClick={(event) =>event.stopPropagation()}>
                <div className="modal-header">
                    <h2>{card.title}</h2>
                    <button type="button" className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="card-details-content">
                    <div className="card-detail-section">
                        <h4>Description</h4>
                        <p>{card.description || "No description providede."}</p>
                    </div>

                    <div className="card-detail-row">
                        <div>
                            <span className="detail-label">Priority</span>
                            <span className={`priority priority-${card.priority}`}>
                                {card.priority || "Not set"}
                            </span>
                        </div>
                    </div>

                    {card.dueDate && (
                        <div className="card-detail-section">
                            <span className="detail-label">Due Date</span>
                            <p>{new Date(card.dueDate).toLocaleDateString()}</p>
                        </div>
                    )}

                    {card.createdAt && (
                        <div className="card-details-section">
                            <span className="detail-label">Created</span>
                            <p>{new Date(card.createdAt).toLocaleTimeString()}</p>
                        </div>
                    )}

                    {card.updatedAt && (
                        <div className="card-details-section">
                            <span className="detail-label">Last updated</span>
                            <p>{new Date(card.updatedAt).toLocaleTimeString()}</p>
                        </div>
                    )}
                </div>

                <div className="card-details-actions">
                    <button type="button" className="secondary-button" onClick={() => onEdit(card)}>Edit</button>
                    <button type="button" className="danger-button" onClick={() => onDelete(card)}>Delete</button>
                </div>
                
            </div>
        </div>
    );
}

export default CardDetails;