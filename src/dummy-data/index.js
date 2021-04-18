// @ts-check
const { UserModel } = require('../schemas/users');
const { TicketPriorityModel } = require('../schemas/ticket-priority');
const {
    TicketDepartementModel,
} = require('../schemas/ticket-departements');

const {
    insertDummy: insertDummyTicketMessage,
} = require('./ticket-message');
const { insertDummy: insertDummyTicket } = require('./ticket');

/**
 * @returns {Promise<void>}
 */
async function insertDummy() {
    const adminId = await UserModel.findOne({
        email: 'admin@admin.com',
    })
        .select('_id')
        .exec();
    const userId = await UserModel.findOne({ email: 'test@test.com' })
        .select('_id')
        .exec();
    const ticketPriority = await TicketPriorityModel.findOne({
        title: 'critical',
    })
        .select('_id')
        .exec();
    const ticketDepartement = await TicketDepartementModel.findOne({
        name: 'support',
    }).exec();

    const ticketId = await insertDummyTicket(
        'new title for new ticket',
        userId._id,
        ticketPriority._id,
        ticketDepartement._id,
        {
            from: adminId._id,
            to: ticketDepartement.members[1],
            description: 'desc for ticket',
        },
    );

    const ticketMessage = await insertDummyTicketMessage(
        userId._id,
        'ticket message is string and just text',
        ticketId,
    );
}

module.exports = { insertDummy };
