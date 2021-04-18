// @ts-check
const ticketRepository = require('../repositories/ticket');

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
    return await ticketRepository.insert(
        title,
        userId,
        priorityId,
        departementId,
        assigneeObj,
    );
}

module.exports = { insertDummy };
