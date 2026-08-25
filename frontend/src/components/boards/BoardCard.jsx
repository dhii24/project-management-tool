function BoardCard({ card, onClick }) {

    return (
        <div className="board-card-item">

            <div className="board-card-content" onClick={() => onClick(card)}>
                <h4>{card.title}</h4>

                {card.description && (
                    <p>{card.description}</p>
                )}
            </div>


            {card.priority && (
                <span className={`priority priority-${card.priority}`}>{card.priority}</span>
            )}

        </div>

    );

}


export default BoardCard;