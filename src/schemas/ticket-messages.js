// @ts-check

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const COLLECTION_NAME = 'ticket-message';

const ticketMessagesSchema = new Schema(
    {
        userId: { type: String, required: true },
        // content can be:
        // - text (User write his/her text message)
        // - link to the file (image, zip file, etc)
        content: { type: String, required: true },
        ticketId: { type: String, required: true },
        repliedTo: {
            type: mongoose.Types.ObjectId,
            ref: COLLECTION_NAME,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const TicketMessagesModel = model(
    COLLECTION_NAME,
    ticketMessagesSchema,
);

module.exports = { TicketMessagesModel, COLLECTION_NAME };
