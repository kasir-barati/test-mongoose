// @ts-check
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const COLLECTION_NAME = 'ticket-departement';

const ticketDepartmentSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'admin',
            },
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

/**
 *
 * @param {string} userId
 */
ticketDepartmentSchema.methods.addMember = function (userId) {
    if (this.memebers === undefined) {
        this.memebers = [userId];
    } else if (!this.memebers.includes(userId)) {
        this.memebers.push(userId);
    }
    return this;
};

const TicketDepartementModel = model(
    COLLECTION_NAME,
    ticketDepartmentSchema,
);

module.exports = { TicketDepartementModel, COLLECTION_NAME };
