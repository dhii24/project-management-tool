function BoardCard({ card }) {

    return (
        <div className="board-card-item">

            <div className="board-card-content">
                <h4>{card.title}</h4>

                {card.description && (
                    <p>{card.description}</p>
                )}
            </div>


            {card.priority && (
                <span className="card-priority">{card.priority}</span>
            )}

        </div>

    );

}


export default BoardCard;