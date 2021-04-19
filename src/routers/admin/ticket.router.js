// @ts-check
const router = require('express').Router();

const { auth, adminAuth } = require('../../middlewares/auth');

const ticketUserController = require('../../controllers/user/ticket');
const ticketMessageUserController = require('../../controllers/user/ticket-message');

router
    .route('/api/admin/tickets')
    .all(/* permission checking */)
    .get(ticketUserController.readTickets)
    .post(ticketUserController.createTicket);

router
    .route('/api/admin/tickets/:ticketId')
    .all(/* permission checking */)
    .get(ticketUserController.readTicket)
    .put()
    .delete(ticketUserController.deleteTicket);

router
    .route('/api/admin/tickets/:ticketId/ticket-messages')
    .all(/* permission checking */)
    .post(ticketMessageUserController.createTicketMessage);

module.exports = { router };
