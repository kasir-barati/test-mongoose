// @ts-check
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const COLLECTION_NAME = 'ticket-priority';

const ticketPrioritySchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        overdueIn: { type: Number, required: true, default: 2880 }, // Minutes until overdue (48 Hours)
        htmlColor: { type: String, default: '#29b955' },
        isDefault: { type: Boolean },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const TicketPriorityModel = model(
    COLLECTION_NAME,
    ticketPrioritySchema,
);

module.exports = { TicketPriorityModel, COLLECTION_NAME };
