function BoardCard({ card, onClick, onDragStart,  onDragOver, moving }) {

    return (
        <div 
            className="board-card-item"
            draggable={!moving}
            onDragStart={(event) => onDragStart(event, card)}
            onDragOver={(event) => onDragOver(event, card._id)}
            onClick={() => onClick(card)}>

            <div className="board-card-content">
                <h4>{card.title}</h4>

                {card.description && (
                    <p>{card.description}</p>
                )}
            </div>

            {card.priority && (
                <span className={`priority priority-${card.priority}`}>
                    {card.priority}
                </span>
            )}

            {moving && (
                <span className="card-moving-text">
                    Moving...
                </span>
            )}

        </div>
    );
}

export default BoardCard;