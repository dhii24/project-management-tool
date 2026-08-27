import api from "./api";

const getListsByBoard = async (boardId) => {
    const response = await api.get(`/lists/${boardId}`);
    return response.data.lists;
};

const createList = async (boardId, listData) => {
    const response = await api.post(`/lists/${boardId}`, listData);
    return response.data.list;
};

const updateList = async (boardId, listId, listData) => {
    const response = await api.put(`/lists/${boardId}/${listId}`, listData);
    return response.data.list;
};

const deleteList = async (boardId, listId) => {
    const response = await api.delete(`/lists/${boardId}/${listId}`);
    return response.data;
};



export default { getListsByBoard, createList, updateList, deleteList };