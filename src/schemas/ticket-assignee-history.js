// @ts-check
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketAssigneeHistorySchema = new Schema({
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'admin',
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'admin',
    },
    description: { type: String },
    createdAt: {
        type: Date,
    },
});

module.exports = { ticketAssigneeHistorySchema };
