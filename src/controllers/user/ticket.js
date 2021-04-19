// @ts-check
const ticektRepository = require('../../repositories/ticket');

/**@type {import('express').RequestHandler} */
async function createTicket(req, res, next) {
    // userId should comes from jwt
    // I sent the priorities and departements info to the frontend
    // I have to sends the users (admin & contractor) info
    // to the frontend. for sake of the assigne object
    const {
        title,
        userId,
        priorityId,
        departementId,
        assigne,
    } = req.body;
    const ticket = ticektRepository.insert(
        title,
        userId,
        priorityId,
        departementId,
        assigne,
    );

    res.status(200).json({
        successful: true,
        error: null,
        ticketId: await ticket,
    });
}

/**@type {import('express').RequestHandler} */
async function readTickets(req, res, next) {}

/**@type {import('express').RequestHandler} */
async function readTicket(req, res, next) {}

/**@type {import('express').RequestHandler} */
async function deleteTicket(req, res, next) {}

module.exports = {
    createTicket,
    deleteTicket,
    readTickets,
    readTicket,
};
