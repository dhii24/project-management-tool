import api from "./api";

const getMyWorkspaces = async () => {
    const response = await api.get("/workspaces/my");
    return response.data.workspaces;
};

const createWorkspace = async (workspaceData) => {
    const response = await api.post("/workspaces", workspaceData);
    return response.data.workspace;
};

const getWorkspaceById = async (workspaceId) => {
    const response = await api.get(`/workspaces/${workspaceId}`);
    return response.data;
};

const addMember = async (workspaceId, memberData) => {
    const response = await api.post(`/workspaces/${workspaceId}/members`, memberData);
    return response.data;
};

export default { getMyWorkspaces, createWorkspace, getWorkspaceById, addMember };