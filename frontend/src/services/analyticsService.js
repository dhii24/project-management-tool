import api from "./api";

const analyticsService = {

    getCardsByStatus: async (workspaceId) => {
        const response = await api.get(`/analytics/${workspaceId}/status`);
        return response.data;
    },

    getCardsByLabel: async (workspaceId) => {
        const response = await api.get(`/analytics/${workspaceId}/labels`);
        return response.data;
    },

    getMemberWorkload: async (workspaceId) => {
        const response = await api.get(`/analytics/${workspaceId}/workload`);
        return response.data;
    },

    getUpcomingDueCards: async (workspaceId) => {
        const response = await api.get(`/analytics/${workspaceId}/due-this-week`);
        return response.data;
    },

    getWorkspaceStats: async (workspaceId) => {
        const response = await api.get(`/analytics/${workspaceId}/workspace`);
        return response.data;
    }

};

export default analyticsService;