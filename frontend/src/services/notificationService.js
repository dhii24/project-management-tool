import api from "./api"

const notificationService = {
    getNotifications: async (page = 1, limit = 10) => {
        const response = await api.get(`/notifications?page=${page}&limit=${limit}`);
        return response.data;
    },

    getUnreadCount: async () => {
        const response = await api.get("/notifications/unread-count");
        return response.data.count;
    },

    markAsRead: async (notificationId) => {
        const response = await api.patch(`/notifications/${notificationId}/read`);
        return response.data;
    }
};

export default notificationService;