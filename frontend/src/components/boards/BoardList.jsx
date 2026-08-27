import { useState } from "react";
import BoardCard from "./BoardCard";

function BoardList({ list, onAddCard, onCardClick, onEditList, onDeleteList }) {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="board-list">

            <div className="board-list-header">
                <h3>{list.name}</h3>
                <div className="list-actions">
                    <button type="button" className="list-menu-button" onClick={() => setShowMenu((previous) => !previous)}>⋮</button>

                    {showMenu && (
                        <div className="list-menu">
                            <button type="button" onClick={() => {
                                    setShowMenu(false);
                                    onEditList(list);
                                }}
                            >Edit List</button>

                            <button type="button" className="delete-menu-item" onClick={() => {
                                setShowMenu(false);
                                onDeleteList(list);
                            }}
                            >Delete List</button>
                        </div>
                    )}
                </div>


            </div>


            <div className="board-list-cards">
                {list.cards?.length === 0 ? (
                    <p className="empty-list-message">No cards yet.</p>
                ) : (
                    list.cards?.map((card) => (
                        <BoardCard key={card._id} card={card} onClick={onCardClick}/>
                    ))
                )}
            </div>


            <button type="button" className="add-card-button" onClick={() => onAddCard(list._id)}>+ Add Card</button>

        </div>
    );

}


export default BoardList;