import BoardCard from "./BoardCard";


function BoardList({ list, onAddCard }) {

    return (
        <div className="board-list">

            <div className="board-list-header">
                <h3>{list.name}</h3>

                <button type="button" className="list-menu-button">⋯</button>
            </div>


            <div className="board-list-cards">
                {list.cards?.length === 0 ? (
                    <p className="empty-list-message">No cards yet.</p>
                ) : (
                    list.cards?.map((card) => (
                        <BoardCard key={card._id} card={card}/>
                    ))
                )}
            </div>


            <button type="button" className="add-card-button" onClick={() => onAddCard(list._id)}>+ Add Card</button>

        </div>
    );

}


export default BoardList;