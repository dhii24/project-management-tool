import api from "./api";

const activityService = {
    getActivities:  async (cardId) => {
        const response = await api.get(`/activities/${cardId}`);
        return response.data.activities;
    }
};

export default activityService;