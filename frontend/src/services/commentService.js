import api from "./api";

const commentService = {
    createComment: async (cardId, text) => {
        const response = await api.post(`/comments/${cardId}`, {text});
        return response.data.comment;
    },

    getComments: async (cardId) => {
        const response = await api.get(`/comments/${cardId}`);
        return response.data.comments;
    }
};

export default commentService;