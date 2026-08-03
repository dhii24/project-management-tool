const Notification = require("../models/Notification");

const createNotification = async ({ recipient, sender, card, type, message }) => {

    await Notification.create({
        recipient,
        sender,
        card,
        type,
        message
    });

};

module.exports = createNotification;