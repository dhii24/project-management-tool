import api from "./api";

const attachmentService = {
    uploadAttachment: async (cardId, file) => {
        const formData = new FormData();
        formData.append("attachment", file);

        const response = await api.post(`/attachments/${cardId}/upload`, formData);
        return response.data.attachment;
    },

    getAttachments: async (cardId) => {
        const response = await api.get(`/attachments/${cardId}`);
        return response.data.attachments;
    }
};

export default attachmentService;