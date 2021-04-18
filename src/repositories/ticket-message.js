// @ts-check
const { TicketMessagesModel } = require('../schemas/ticket-messages');

/**
 *
 * @param {string} userId
 * @param {string} content
 * @param {string} ticketId
 * @param {string} [repliedTo=null]
 * @returns {Promise<string>} ticket message id
 */
async function create(userId, content, ticketId, repliedTo = null) {
    return (
        await new TicketMessagesModel({
            userId,
            content,
            ticketId,
            repliedTo,
        }).save()
    ).id;
}

module.exports = {
    create,
};
