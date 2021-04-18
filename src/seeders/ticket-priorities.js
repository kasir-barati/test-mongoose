// @ts-check
const { TicketPriorityModel } = require('../schemas/ticket-priority');

/**
 * @typedef insertType
 * @property {string} normalPriorityId
 * @property {string} criticalPriorityId
 * @property {string} urgentPriorityId
 * @property {string} criticalAndUrgentPriorityId
 */

/**
 * @returns {Promise<insertType>}
 */
async function insert() {
    const normalPriority = new TicketPriorityModel({
        title: 'normal',
        default: true,
    }).save();
    const criticalPriority = new TicketPriorityModel({
        title: 'critical',
        overdueIn: 2280, // 38 hour
        htmlColor: '#dfee02',
        default: true,
    }).save();
    const urgentPriority = new TicketPriorityModel({
        title: 'urgent',
        overdueIn: 1680, // 28 hour
        htmlColor: '#ee5902',
        default: true,
    }).save();
    const criticalAndUrgentPriority = new TicketPriorityModel({
        title: 'critical and urgent',
        overdueIn: 1080, // 18 hour
        htmlColor: '#b40b0b',
        default: true,
    }).save();

    return {
        normalPriorityId: (await normalPriority).id,
        urgentPriorityId: (await criticalPriority).id,
        criticalPriorityId: (await urgentPriority).id,
        criticalAndUrgentPriorityId: (await criticalAndUrgentPriority)
            .id,
    };
}

module.exports = {
    insert,
};
