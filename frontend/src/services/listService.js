import api from "./api";

const getListsByBoard = async (boardId) => {
    const response = await api.get(`/lists/${boardId}`);
    return response.data.lists;
};

const createList = async (boardId, listData) => {
    const response = await api.post(`/lists/${boardId}`);
    return response.data.list;
};

export default { getListsByBoard, createList };