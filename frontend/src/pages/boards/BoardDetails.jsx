import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import boardService from "../../services/boardService";
import listService from "../../services/listService";
import CreateList from "../../components/boards/CreateList";
import BoardHeader from "../../components/boards/BoardHeader";
import BoardList from "../../components/boards/BoardList";

function BoardDetails(){

    const { workspaceId, boardId } = useParams();
    
    const [board, setBoard] = useState(null);

    const [lists, setLists] = useState([]);

    const [showCreateList, setShowCreateList] = useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {
        const fetchBoard = async () => {
            try{
                setLoading(true);
                setError("");

                const data = await boardService.boardById(workspaceId, boardId);
                setBoard(data);
            }

            catch(error){
                console.error(error);
                
                setError(
                    error.response?.data?.message || "Failed to load board."
                );
            }

            finally{
                setLoading(false);
            }
        }

        fetchBoard();
    }, [workspaceId, boardId]);


    useEffect(() => {
        const fetchLists = async () => {
            try{
                const data = await listService.getListsByBoard(boardId);
                setLists(data);
            }
            catch(error){
                console.error("Failed to fetch lists:", error);
                setError(
                    error.response?.data?.message || "Failed to load lists."
                );
            }
        };

        fetchLists();
    }, [boardId]);


    const handleAddList = () => {
        setShowCreateList(true);
    };

    const handleCreateList = async (listData) => {
        try{
            const newList = await listService.createList(boardId, listData);

            setLists((previousLists) => [
                ...previousLists,
                newList
            ]);

            setShowCreateList(false);
        } 
        
        catch(error){
            console.error("Failed to create list:", error);

            setError(
                error.response?.data?.message ||
                "Failed to create list."
            );
        }
    };


    const handleAddCard = (listId) => {
        console.log("Add card to list:", listId);
    };


    if(loading){
        return (
            <div className="page-message">
                Loading board...
            </div>
        );
    }


    if(error){
        return (
            <div className="page-message">
                <p className="error-message">
                    {error}
                </p>
            </div>
        );
    }


    if(!board){
        return (
            <div className="page-message">
                Board not found.
            </div>
        );
    }


    return (
        <div className="workspace-page">

            <div className="board-header">
                <div>
                    <h1>{board.name}</h1>
                    <p>{board.description || "No description provided."}</p>
                </div>
            </div>

            <div className="board-info">
                <div className="info-card">
                    <h3>Board Name</h3>
                    <p>{board.name}</p>
                </div>

                <div className="info-card">
                    <h3>Description</h3>
                    <p>{board.description || "No description"}</p>
                </div>

                <div className="info-card">
                    <h3>Board ID</h3>
                    <p>{board._id}</p>
                </div>
            </div>

            <div className="board-page">
                <BoardHeader board={board} onAddList={handleAddList} />

                <div className="board-lists">
                    {lists.map((list) => (
                        <BoardList key={list._id} list={list} onAddCard={handleAddCard} />
                    ))}

                    <button type="button" className="add-list-card" onClick={handleAddList}>+Add another list</button>
                </div>
            </div>


            {showCreateList && (
                <CreateList onClose={() => setShowCreateList(false) } onCreate={handleCreateList}/>
            )}

        </div>
    );
}

export default BoardDetails;