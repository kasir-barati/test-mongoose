// @ts-check
const { TicketPriorityModel } = require('../schemas/ticket-priority');

/**
 * @typedef fetchTicketPriorityReturnType
 * @property {string} _id
 * @property {string} title
 * @property {number} overdueIn
 * @property {string} htmlColor
 * @property {boolean} isDefault
 */

/**
 *
 * @param {string} title
 * @param {boolean} isDefault
 * @param {number} [overdueIn] unit = minute
 * @param {string} [htmlColor] hexa deciaml
 * @returns {Promise<string>} created ticket priority id
 */
async function insert(title, isDefault, overdueIn, htmlColor) {
    let newTicketPriorityDocument = {
        title,
        isDefault,
        ...(overdueIn ? { overdueIn } : {}),
        ...(htmlColor ? { htmlColor } : {}),
    };

    return (
        await new TicketPriorityModel(
            newTicketPriorityDocument,
        ).save()
    ).id;
}

/**
 *
 * @param {string} title
 * @returns {Promise<fetchTicketPriorityReturnType>}
 */
async function fetchByTitle(title) {
    const ticketPriority = TicketPriorityModel.findOne({
        title,
    }).exec();

    return {
        _id: (await ticketPriority)?.id ?? null,
        title: (await ticketPriority)?.title ?? null,
        htmlColor: (await ticketPriority)?.htmlColor ?? null,
        isDefault: (await ticketPriority)?.isDefault ?? null,
        overdueIn: (await ticketPriority)?.overdueIn ?? null,
    };
}

module.exports = {
    insert,
    fetchByTitle,
};
