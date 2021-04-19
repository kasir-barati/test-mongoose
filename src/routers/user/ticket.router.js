// @ts-check
const router = require('express').Router();

const { auth } = require('../../middlewares/auth');

const { can } = require('../../middlewares/can');

const ticketUserController = require('../../controllers/user/ticket');
const ticketMessageUserController = require('../../controllers/user/ticket-message');

router
    .route('/api/tickets')
    .all(auth.required, can('contractor'))
    .get(ticketUserController.readTickets)
    .post(ticketUserController.createTicket);

router
    .route('/api/tickets/:ticketId')
    .all(auth.required, can('contractor'))
    .get(ticketUserController.readTicket)
    .delete(ticketUserController.deleteTicket);

router
    .route('/api/tickets/:ticketId/ticket-messages')
    .all(/* permission checking */)
    .post(ticketMessageUserController.createTicketMessage);

module.exports = { router };
