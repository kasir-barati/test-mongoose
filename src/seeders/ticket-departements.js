// @ts-check
const ticketDepartementRepository = require('../repositories/ticket-departement');

/**
 * @typedef insertType
 * @property {string} supportDepartementId
 */

/**
 *
 * @param {string[]} userIds
 * @returns {Promise<insertType>}
 */
async function insert(userIds) {
    let supportDepartementId = ticketDepartementRepository.insert(
        'support',
        userIds[0],
        userIds,
    );

    return {
        supportDepartementId: await supportDepartementId,
    };
}

module.exports = {
    insert,
};
