import api from "./api";

const getCardsByList = async (listId) => {
    const response = await api.get(`/cards/${listId}`);
    return response.data.cards;
};

const createCard = async (listId, cardData) => {
    const response = await api.post(`/cards/${listId}`, cardData);
    return response.data.card;
};

export default { getCardsByList, createCard };