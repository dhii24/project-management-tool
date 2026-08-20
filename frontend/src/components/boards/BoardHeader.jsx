function BoardHeader({ board, onAddList }) {

    return (
        <div className="board-header">

            <div className="board-header-content">
                <h1>{board.name}</h1>
                <p>
                    {board.description || "No description provided."}
                </p>

            </div>

            <button type="button" className="primary-button" onClick={onAddList}>+ Add List</button>

        </div>
    );
}

export default BoardHeader;