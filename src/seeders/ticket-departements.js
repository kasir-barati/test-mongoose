// @ts-check
const {
    TicketDepartementModel,
} = require('../schemas/ticket-departements');

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
    let departement = new TicketDepartementModel({
        name: 'support',
        members: userIds.filter((id, index) => {
            if (index !== userIds.length - 1) {
                return id;
            }
        }),
    });
    departement.addMember(userIds[userIds.length]);

    return {
        supportDepartementId: (await departement.save()).id,
    };
}

module.exports = {
    insert,
};
