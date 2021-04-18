// @ts-check
const userRepository = require('../repositories/user');
const ticketPriorityRepository = require('../repositories/ticket-priority');
const ticketDepartementRepository = require('../repositories/ticket-departement');

const {
    insertDummy: insertDummyTicketMessage,
} = require('./ticket-message');
const { insertDummy: insertDummyTicket } = require('./ticket');

/**
 * @returns {Promise<void>}
 */
async function insertDummy() {
    const adminId = (
        await userRepository.fetchByEmail('admin@admin.com')
    )._id;
    const userId = (
        await userRepository.fetchByEmail('test@test.com')
    )._id;
    const ticketPriority = await ticketPriorityRepository.fetchByTitle(
        'critical',
    );
    const ticketDepartement = await ticketDepartementRepository.fetchByDepartementName(
        'support',
    );

    const ticketId = await insertDummyTicket(
        'new title for new ticket',
        userId,
        ticketPriority._id,
        ticketDepartement._id,
        {
            from: adminId,
            to: ticketDepartement.members[1].userId,
            description: 'desc for ticket',
        },
    );

    const ticketMessage = await insertDummyTicketMessage(
        userId,
        'ticket message is string and just text',
        ticketId,
    );
}

module.exports = { insertDummy };
