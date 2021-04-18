// @ts-check
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const { COLLECTION_NAME: userCollectionName } = require('./users');
const {
    COLLECTION_NAME: ticketDepartementCollectionName,
} = require('./ticket-departements');

const COLLECTION_NAME = 'ticket-departement-user';

const ticketDepartmentUserSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: userCollectionName,
        },
        ticketDepartementId: {
            type: mongoose.Types.ObjectId,
            ref: ticketDepartementCollectionName,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const TicketDepartementUsersModel = model(
    COLLECTION_NAME,
    ticketDepartmentUserSchema,
);

module.exports = {
    COLLECTION_NAME,
    TicketDepartementUsersModel,
};
