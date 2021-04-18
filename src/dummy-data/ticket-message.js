// @ts-check
const { TicketMessagesModel } = require('../schemas/ticket-messages');

/**
 *
 * @param {string} userId
 * @param {string} content
 * @param {string} ticketId
 * @param {string} [messageId=null]
 * @returns {Promise<string>} ticket message id
 */
async function insertDummy(
    userId,
    content,
    ticketId,
    messageId = null,
) {
    return (
        await new TicketMessagesModel({
            userId,
            content,
            ticketId,
            messageId,
        }).save()
    ).id;
}

module.exports = { insertDummy };
