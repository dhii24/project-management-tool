const Activity = require("../models/Activity");

const createActivity = async ({ card, user, action, description}) => {
    
    await Activity.create({
        card,
        user,
        action,
        description
    });
};

module.exports = createActivity;