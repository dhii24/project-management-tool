import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import workspaceService from "../../services/workspaceService";
import boardService from "../../services/boardService";
import listService from "../../services/listService";
import cardService from "../../services/cardService";

import CreateList from "../../components/boards/CreateList";
import CreateCard from "../../components/boards/CreateCard";

import CardDetails from "../../components/boards/CardDetails";

import EditCard from "../../components/boards/EditCard";
import EditList from "../../components/boards/EditList";

import BoardHeader from "../../components/boards/BoardHeader";
import BoardList from "../../components/boards/BoardList";

import AssignMembers from "../../components/boards/AssignMembers";
import ManageLabels from "../../components/boards/ManageLabels";

function BoardDetails(){
    
    const { workspaceId, boardId } = useParams();
    
    const [board, setBoard] = useState(null);
    
    const [lists, setLists] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState("");
    
    const [showCreateList, setShowCreateList] = useState(false);
    
    const [showCreateCard, setShowCreateCard] = useState(false);
    
    const [selectedListId, setSelectedListId] = useState(null);
    
    const [selectedCard, setSelectedCard] = useState(null);
    
    const [showEditCard, setShowEditCard] = useState(false);

    const [selectedList, setSelectedList] = useState(null);
    
    const [showEditList, setShowEditList] = useState(false);
    
    const [showAssignMembers, setShowAssignMembers] = useState(false);

    const [workspace, setWorkspace] = useState(null);

    const [showManageLabels, setShowManageLabels] = useState(false);

    useEffect(() => {
        const fetchWorkspace = async () => {
            try {
                const data = await workspaceService.getWorkspaceById(workspaceId);
                setWorkspace(data);
            } 
            
            catch (error) {
                console.error("Failed to fetch workspace:",error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load workspace."
                );
            }
        };

        fetchWorkspace();
    }, [workspaceId]);
    
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
                const lists = await listService.getListsByBoard(boardId);
                
                const listWithCards = await Promise.all(
                    lists.map(async (list) => {
                        const cards = await cardService.getCardsByList(list._id);
                        
                        return {
                            ...list,
                            cards
                        };
                    })
                );

                setLists(listWithCards);
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
    
    const handleEditList = (list) => {
        setSelectedList(list);
        setShowEditList(true);
    };
    
    const handleUpdateList = async (listData) => {
        try{
            const updatedList = await listService.updateList(boardId, selectedList._id, listData);
    
            setLists((previousLists) => {
                return previousLists.map((list) => {
                    if(list._id === updatedList._id){
                        return{
                            ...list,
                            ...updatedList
                        };
                    }
                    return list;
                });
            });
    
            setSelectedList(null);
            setShowEditList(false);
        }
    
        catch(error){
            console.error("Failed to update List:", error);
    
            setError(
                error.response?.data?.message || "Failed to update list."
            );
        }
    };
    
    const handleDeleteList = async (list) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${list.name}"?`);
    
        if(!confirmed)
            return;
    
        try{
            await listService.deleteList(boardId, list._id);
    
            setLists((previousLists) => {
                return previousLists.filter((existingList) => 
                        existingList._id !== list._id) ;
            });
            setSelectedList(null);
        }
    
        catch(error){
            console.error("Failed to delete list:", error);
    
            setError(
                error.response?.data?.message || "Failed to delete list."
            );
        }
    };
    
    const handleAddCard = (listId) => {
        setSelectedListId(listId);
        setShowCreateCard(true);
    };
    
    const handleCreateCard = async (cardData) => {
        try{
            const newCard = await cardService.createCard(selectedListId, cardData);

            setLists((previousLists) => {
                return previousLists.map((list) => {
                    if(list._id !== selectedListId){
                        return list;
                    }

                    return {
                        ...list,
                        cards: [
                            ...(list.cards || []), newCard
                        ]
                    };
                });
            });

            setShowCreateCard(false);
            setSelectedListId(null);
        }
        
        catch(error){
            console.error("Failed to create card:", error);

            setError(
                error.response?.data?.message || "Failed to create card."
            );
        }
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleEditCard = () => {
        setShowEditCard(true);
    };

    const handleUpateCard = async (cardData) => {
        try{
            const updatedCard = await cardService.updateCard(selectedCard.list, selectedCard._id, cardData);

            setLists((previousLists) => {
                return previousLists.map((list) => {
                    return{
                        ...list,
                        cards: (list.cards || []).map((card) => {
                            if(card._id === updatedCard._id){
                                return updatedCard;
                            }
                            return card;
                        })
                    };
                });
            });
            
            setSelectedCard(updatedCard);
            setShowEditCard(false);
        }
        
        catch(error){
            console.error("Failed to update card:", error);
            
            setError(
                error.response.data.message || "Failed to update card"
            );
        }
    };
    
    const handleDeleteCard = async (card) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${card.title}"?`);
        
        if(!confirmed)
            return;

        try{
            await cardService.deleteCard(card.list, card._id);

            setLists((previousLists) => {
                return previousLists.map((list) => {
                    return {
                        ...list,
                        cards: (list.cards || []).filter((existingCard) => existingCard._id !== card._id) 
                    };
                });
            });

            setSelectedCard(null);
        }

        catch(error){
            console.error("Failed to delete card:", error);

            setError(
                error.response?.data?.message || "Failed to delete card."
            );
        }
    };

    const handleAssignMembers = () => {
        setShowAssignMembers(true);
    };

    const handleSaveAssignedMembers = async (memberIds) => {
        try{
            const updatedCard = await cardService.updateCard(selectedCard.list, selectedCard._id, {
                assignedMembers: memberIds
            });

            setLists((previousLists) => {
                return previousLists.map((list) => {
                    return {
                        ...list,
                        cards: (list.cards || []).map((card) => {
                            if(card._id === updatedCard._id){
                                return updatedCard;
                            }
                            return card;
                        })
                    };
                });
            });

            setSelectedCard(updatedCard);
            setShowAssignMembers(false);
        }

        catch(error){
            console.error("Failed to assign members:", error);

            setError(
                error.response?.data?.message || "Failed to assign members"
            );
        }
    };

    const handleManageLabels = () => {
        setShowManageLabels(true);
    };

    const handleSaveLabels = async (labels) => {
        try{
            const updatedCard = await cardService.updateCard(selectedCard.list, selectedCard._id, {labels});
            setLists((previousLists) => {
                return previousLists.map((list) => {
                    return {
                        ...list,
                        cards: (list.cards || []).map((card) => {
                            if(card._id === updatedCard._id){
                                return updatedCard;
                            }
                            return card;
                        })
                    };
                });
            });

            setSelectedCard(updatedCard);
            setShowManageLabels(false);
        }

        catch(error){
            console.error("Failed to update labels:", error);

            setError(
                error.response?.data?.message || "Failed to update labels."
            );
        }
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
                        <BoardList key={list._id} list={list} onAddCard={handleAddCard} onCardClick={handleCardClick} onEditList={handleEditList} onDeleteList={handleDeleteList}/>
                    ))}

                    <button type="button" className="add-list-card" onClick={handleAddList}>+Add another list</button>
                </div>
            </div>


            {showCreateList && (
                <CreateList onClose={() => setShowCreateList(false) } onCreate={handleCreateList}/>
            )}

            {showCreateCard && (
                <CreateCard onClose={() => {
                    setShowCreateCard(false);
                    setSelectedListId(null);
                }}
                onCreate={handleCreateCard}/>
            )}

            {selectedCard && (
                <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} onEdit={handleEditCard} onDelete={handleDeleteCard} onAssignMembers={handleAssignMembers} onManageLabels={handleManageLabels}/>
            )}

            {showEditCard && selectedCard && (
                <EditCard card={selectedCard} onClose={() => setShowEditCard(false)} onUpdate={handleUpateCard}/>
            )}

            {showEditList && selectedList && (
                <EditList list={selectedList} onClose={() => {
                    setShowEditList(false);
                    setSelectedList(null);
                }}
                onUpdate={handleUpdateList}
                />
            )}

            {showAssignMembers && selectedCard && (
                <AssignMembers card={selectedCard} members={workspace?.members || []} onClose={() => setShowAssignMembers(false)} onSave={handleSaveAssignedMembers}/>
            )}

            {showManageLabels && selectedCard && (
                <ManageLabels card={selectedCard} onClose={() => setShowManageLabels(false)} onSave={handleSaveLabels}/>
            )}

        </div>
    );
}

export default BoardDetails;