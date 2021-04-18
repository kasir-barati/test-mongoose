// @ts-check
const { TicketModel } = require('../schemas/tickets');

/**
 *
 * @param {string} title
 * @param {string} userId
 * @param {string} priorityId
 * @param {string} departementId
 * @param {object} assigneeObj
 * @param {string} assigneeObj.from
 * @param {string} assigneeObj.to
 * @param {string} assigneeObj.description
 * @returns {Promise<string>} created ticket's id
 */
async function insertDummy(
    title,
    userId,
    priorityId,
    departementId,
    assigneeObj,
) {
    const newTicket = new TicketModel({
        title,
        owner: userId,
        priority: priorityId,
        departemant: departementId,
    });

    newTicket.assigneTicket(assigneeObj);

    return (await newTicket.save()).id;
}

module.exports = { insertDummy };
