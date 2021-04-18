// @ts-check
const ticketMessageRepository = require('../repositories/ticket-message');

/**
 *
 * @param {string} userId
 * @param {string} content
 * @param {string} ticketId
 * @param {string} [repliedTo=null]
 * @returns {Promise<string>} ticket message id
 */
async function insertDummy(
    userId,
    content,
    ticketId,
    repliedTo = null,
) {
    return await ticketMessageRepository.insert(
        userId,
        content,
        ticketId,
        repliedTo,
    );
}

module.exports = { insertDummy };
