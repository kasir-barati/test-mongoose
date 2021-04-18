// @ts-check
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { COLLECTION_NAME: userCollectionName } = require('./users');

const COLLECTION_NAME = 'ticket-departement';

const ticketDepartmentSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        primaryAdmin: {
            type: mongoose.Types.ObjectId,
            ref: userCollectionName,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const TicketDepartementModel = model(
    COLLECTION_NAME,
    ticketDepartmentSchema,
);

module.exports = { TicketDepartementModel, COLLECTION_NAME };
