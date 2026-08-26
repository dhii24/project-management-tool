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

export default { getCardsByList, createCard, updateCard, deleteCard };