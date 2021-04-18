// @ts-check
const {
    TicketDepartementModel,
} = require('../schemas/ticket-departements');
const {
    TicketDepartementUsersModel,
} = require('../schemas/ticket-departement-users');

/**
 *
 * @param {string} name
 * @param {string} primaryAdmin primary admin id
 * @param {string[]} membersId
 * @returns {Promise<string>} departementId
 */
async function insert(name, primaryAdmin, membersId) {
    const departement = new TicketDepartementModel({
        name,
        primaryAdmin,
    });
    const departementId = (await departement.save()).id;

    for (let index = 0; index < membersId.length; index++) {
        await new TicketDepartementUsersModel({
            userId: membersId[index],
            ticketDepartementId: departementId,
        }).save();
    }

    return departementId;
}

/**
 *
 * @param {string} departementId
 * @param {string[]} userIds
 * @returns {Promise<void>}
 */
async function insertNewMembers(departementId, userIds) {
    for (let index = 0; index < userIds.length; index++) {
        await new TicketDepartementUsersModel({
            userId: userIds[index],
            ticketDepartementId: departementId,
        });
    }
}

/**
 * @typedef fetchMembersReturnType
 * @property {{userId: string, ticketDepartementId: string}[]} members
 */

/**
 *
 * @param {string} departementId
 * @returns {Promise<fetchMembersReturnType>}
 */
async function fetchMembers(departementId) {
    let members = TicketDepartementUsersModel.find({
        ticketDepartementId: departementId,
    })
        .populate('user')
        .exec();

    return {
        members: await members,
    };
}

/**
 * @typedef fetchTicketDepartementReturnType
 * @property {string} _id
 * @property {string} name
 * @property {string} primaryAdmin
 * @property {{userId: string, ticketDepartementId: string}[]} members
 */

/**
 *
 * @param {string} name departement name
 * @returns {Promise<fetchTicketDepartementReturnType>}
 */
async function fetchByDepartementName(name) {
    const ticektDepartement = TicketDepartementModel.findOne({
        name,
    }).exec();

    const { members } = await fetchMembers(
        (await ticektDepartement).id,
    );

    return {
        _id: (await ticektDepartement).id,
        name: (await ticektDepartement).name,
        primaryAdmin: (await ticektDepartement).primaryAdmin,
        members,
    };
}

module.exports = {
    insert,
    fetchMembers,
    insertNewMembers,
    fetchByDepartementName,
};
