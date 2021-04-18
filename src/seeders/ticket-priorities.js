// @ts-check
const ticketPriorityRepository = require('../repositories/ticket-priority');

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
    const normalPriority = ticketPriorityRepository.insert(
        'normal',
        true,
    );
    const criticalPriority = ticketPriorityRepository.insert(
        'critical',
        true,
        2280, // 38 hour
        '#dfee02',
    );
    const urgentPriority = ticketPriorityRepository.insert(
        'urgent',
        true,
        1680, // 28 hour
        '#ee5902',
    );
    const criticalAndUrgentPriority = ticketPriorityRepository.insert(
        'critical-and-urgent',
        true,
        1080, // 18 hour
        '#b40b0b',
    );

    return {
        normalPriorityId: await normalPriority,
        urgentPriorityId: await criticalPriority,
        criticalPriorityId: await urgentPriority,
        criticalAndUrgentPriorityId: await criticalAndUrgentPriority,
    };
}

module.exports = {
    insert,
};
