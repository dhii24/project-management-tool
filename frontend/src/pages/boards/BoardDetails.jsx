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
import NotificationPanel from "../../components/notifications/NotificationPanel";

import CardSearch from "../../components/boards/CardSearch";
import SearchResults from "../../components/boards/SearchResults";

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

    const [draggedCard, setDraggedCard] = useState(null);

    const [dragOverCardId, setDragOverCardId] = useState(null);

    const [searchResults, setSearchResults] = useState(null);

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
                error.response?.data?.message || "Failed to update card"
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
    
    const handleMoveCard = async (card, targetListId) => {
        try {
            const sourceListId = card.list;

            // Find target list
            const targetList = lists.find(list => list._id === targetListId);

            if(!targetList){
                return;
            }

            // For Step 29, move to the end of target list
            const newPosition = targetList.cards?.length || 0;

            await cardService.moveCard(
                sourceListId,
                card._id,
                targetListId,
                newPosition
            );

            // Update frontend state
            setLists(previousLists => {
                const movedCard = {
                    ...card,
                    list: targetListId,
                    position: newPosition
                };

                return previousLists.map(list => {
                    // Remove card from source list
                    if(list._id === sourceListId){
                        return {
                            ...list,
                            cards: (list.cards || []).filter(existingCard => existingCard._id !== card._id)
                        };
                    }

                    // Add card to target list
                    if(list._id === targetListId){
                        return {
                            ...list,
                            cards: [
                                ...(list.cards || []),
                                movedCard
                            ]
                        };
                    }
                    return list;
                });
            });

            setSelectedCard(previousCard => {
                if(!previousCard){
                    return previousCard;
                }

                if(previousCard._id !== card._id){
                    return previousCard;
                }

                return{
                    ...previousCard,
                    list: targetListId,
                    position: newPosition
                };
            });
        } 
        
        catch(error){
            console.error("Failed to move card:", error);

            setError(
                error.response?.data?.message || "Failed to move card."
            );
        }
    };

    const handleDragStart = (event, card) => {
        setDraggedCard(card);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", card._id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const handleCardDragOver = (event, cardId) => {
        event.preventDefault();
        setDragOverCardId(cardId);
        event.dataTransfer.dropEffect = "move";
    };

    const handleDrop = async (event, targetListId) => {
        event.preventDefault();

        if (!draggedCard) {
            return;
        }

        const sourceList = lists.find(
            list => list.cards?.some(
                card => card._id === draggedCard._id
            )
        );

        if (!sourceList) {
            setDraggedCard(null);
            setDragOverCardId(null);
            return;
        }

        const targetList = lists.find(
            list => list._id === targetListId
        );

        if (!targetList) {
            setDraggedCard(null);
            setDragOverCardId(null);
            return;
        }

        const sourceListId = sourceList._id;

        let newPosition;

        if (dragOverCardId) {
            const targetIndex = targetList.cards.findIndex(
                card => card._id === dragOverCardId
            );

            newPosition = targetIndex === -1
                ? targetList.cards.length
                : targetIndex;
        } else {
            newPosition = targetList.cards.length;
        }

        /*
        * If moving within the same list and the dragged card
        * appears before the target card, removing it first
        * shifts the target position by one.
        */
        if (sourceListId === targetListId) {
            const draggedIndex = targetList.cards.findIndex(
                card => card._id === draggedCard._id
            );

            if (draggedIndex !== -1 && draggedIndex < newPosition) {
                newPosition--;
            } 
        }


        try{
            await cardService.moveCard(
                sourceListId,
                draggedCard._id,
                targetListId,
                newPosition
            );

            setLists(previousLists => {
                const updatedLists = previousLists.map(list => ({
                    ...list,
                    cards: [...(list.cards || [])]
                }));

                const source = updatedLists.find(
                    list => list._id === sourceListId
                );

                const target = updatedLists.find(
                    list => list._id === targetListId
                );

                if (!source || !target) {
                    return previousLists;
                }

                // Remove card from source list.
                source.cards = source.cards.filter(
                    card => card._id !== draggedCard._id
                );

                // If moving within the same list, source and target are the same array.
                if (sourceListId === targetListId) {

                    const updatedCard = {
                        ...draggedCard,
                        list: targetListId
                    };

                    target.cards.splice(
                        newPosition,
                        0,
                        updatedCard
                    );

                } else {
                    // Moving to another list.
                    target.cards.splice(
                        newPosition,
                        0,
                        {
                            ...draggedCard,
                            list: targetListId
                        }
                    );
                }

                // Recalculate positions.
                source.cards = source.cards.map(
                    (card, index) => ({
                        ...card,
                        position: index
                    })
                );

                if (sourceListId !== targetListId) {
                    target.cards = target.cards.map(
                        (card, index) => ({
                            ...card,
                            position: index
                        })
                    );
                }

                return updatedLists;
            });
        } 
        
        catch (error) {
            console.error("Failed to move card:", error);

            setError(
                error.response?.data?.message ||
                "Failed to move card."
            );
        } 
        
        finally {
            setDraggedCard(null);
            setDragOverCardId(null);
        }
    };

    const handleSearchResults = (data) => {
        setSearchResults(data);
    };

    const handleClearSearch = () => {
        setSearchResults(null);
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

                <CardSearch onResults={handleSearchResults} onClear={handleClearSearch}/>

                {/* If searchResults === null -- you see your normal Kanban board.*/}
                {/* But If search results are true you see corresponding cards.  */}
                {searchResults ? (
                    <SearchResults results={searchResults} onCardClick={handleCardClick}/>
                ) : (
                    <div className="board-lists">
                        {lists.map((list) => (
                            <BoardList key={list._id} list={list} onAddCard={handleAddCard} onCardClick={handleCardClick} onEditList={handleEditList} onDeleteList={handleDeleteList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onCardDragOver={handleCardDragOver}/>
                        ))}

                        <button type="button" className="add-list-card" onClick={handleAddList}>+Add another list</button>
                    </div>
                )}
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

            <NotificationPanel />

        </div>
    );
}

export default BoardDetails;