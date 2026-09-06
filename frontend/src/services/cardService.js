import api from "./api";

const getCardsByList = async (listId) => {
    const response = await api.get(`/cards/${listId}`);
    return response.data.cards;
};

const createCard = async (listId, cardData) => {
    const response = await api.post(`/cards/${listId}`, cardData);
    return response.data.card;
};

const updateCard = async (listId, cardId, cardData) => {
    const response = await api.put(`/cards/${listId}/${cardId}`, cardData);
    return response.data.card;
};

const deleteCard = async (listId, cardId) => {
    const response = await api.delete(`/cards/${listId}/${cardId}`);
    return response.data;
};

const moveCard = async (listId, cardId, targetListId, newPosition) => {
    const response = await api.patch(`/cards/${listId}/${cardId}/move`,
        {
            targetListId,
            newPosition
        }
    );
    return response.data;
};

const searchCards = async (query, page = 1, limit = 10) => {
    const response = await api.get(`/cards/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return response.data.cards;
};

export default { getCardsByList, createCard, updateCard, deleteCard, moveCard };