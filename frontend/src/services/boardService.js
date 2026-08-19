import api from "./api";

const getBoardsByWorkspace = async (workspaceId) => {
    const response = await api.get(`/boards/${workspaceId}`);
    return response.data.boards;
};

const createBoard = async (workspaceId, boardData) => {
    const response = await api.post(`/boards/${workspaceId}`, boardData);
    return response.data.board;
};

export default { getBoardsByWorkspace, createBoard };