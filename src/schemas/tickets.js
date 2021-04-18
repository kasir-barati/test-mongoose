// @ts-check

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const {
    ticketAssigneeHistorySchema,
} = require('./ticket-assignee-history');

const { ticketStates } = require('../seeders/ticket-states');

const { COLLECTION_NAME: userCollectioName } = require('./users');
const {
    COLLECTION_NAME: ticketPriorityCollectionName,
} = require('./ticket-priority');
const {
    COLLECTION_NAME: ticketDepartementCollectionName,
} = require('./ticket-departements');

const COLLECTION_NAME = 'ticket';

const ticketsSchema = new Schema(
    {
        title: { type: String, required: true },
        owner: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: userCollectioName,
        },
        deleted: {
            type: Boolean,
            default: false,
            required: true,
            index: true,
        },
        closedAt: { type: Date },
        departemant: {
            type: mongoose.Types.ObjectId,
            ref: ticketDepartementCollectionName,
        },
        priority: {
            type: mongoose.Types.ObjectId,
            ref: ticketPriorityCollectionName,
        },
        state: {
            type: String,
            default: ticketStates.open,
            enum: Object.values(ticketStates),
        },
        assigneeHistory: [ticketAssigneeHistorySchema],
        // If we had accounts collection, we could play around a lot more than now.
        // As a example we could have the subscriber field in the ticketing system
        // subscribers: [
        //     { type: mongoose.Types.ObjectId, ref: 'accounts' },
        // ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

/**
 *
 * @param {string} newState
 */
ticketsSchema.methods.setTicketState = function (newState) {
    switch (newState) {
        case ticketStates.new:
        case ticketStates.open:
        case ticketStates.pending:
            this.closedAt = null;
            break;
        case ticketStates.closed:
            this.closedAt = new Date();
    }
    this.state = newState;

    return this;
};

ticketsSchema.statics.getTicketStates = function () {
    return Object.values(ticketStates);
};

/**
 *
 * @param {object} assigne
 * @param {string} assigne.from
 * @param {string} assigne.to
 * @param {string} assigne.description
 */
ticketsSchema.methods.assigneTicket = function (assigne) {
    let newAssignee = {
        ...assigne,
        createdAt: new Date(),
    };

    if (this.assigneeHistory === undefined) {
        this.assigneeHistory = [newAssignee];
    } else {
        this.assigneeHistory.push(newAssignee);
    }

    return this;
};

const TicketModel = model(COLLECTION_NAME, ticketsSchema);

module.exports = { TicketModel, COLLECTION_NAME };
