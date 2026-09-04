function BoardCard({ card, lists, onClick, onMove }) {

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

            <div className="card-move-section">
                <select value="" onChange={(event) => {
                    const targetListId = event.target.value;
                    if(!targetListId){
                        return;
                    }
                    onMove(card,targetListId);
                }}>
                    <option value="">Move to...</option>
                    {lists.filter(list => list._id !== card.list).map(list => (
                        <option key={list._id} value={list._id}>{list.name}</option>
                        ))
                    }
                </select>
            </div>

        </div>

    );

}


export default BoardCard;