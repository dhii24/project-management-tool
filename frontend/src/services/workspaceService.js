import api from "./api";

const getMyWorkspaces = async () => {
    const response = await api.get("/workspaces/my");
    return response.data.workspaces;
};

const createWorkspace = async (workspaceData) => {
    const response = await api.post("/workspaces", workspaceData);
    return response.data.workspaces;
};

export default { getMyWorkspaces, createWorkspace };