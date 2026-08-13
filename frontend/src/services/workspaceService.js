import api from "./api";

const getMyWorkspaces = async () => {
    const response = await api.get("/workspaces/my");
    return response.data.workspaces;
};

const createWorkspace = async (workspaceData) => {
    const response = await api.post("/workspaces", workspaceData);
    return response.data.workspaces;
};

const getWorkspaceById = async (workspaceId) => {
    const response = await api.get(`/workspaces/${workspaceId}`);
    return response.data;
};

export default { getMyWorkspaces, createWorkspace, getWorkspaceById };