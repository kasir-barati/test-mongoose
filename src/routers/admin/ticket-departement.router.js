// @ts-check
const router = require('express').Router();

const { adminAuth } = require('../../middlewares/auth');
const { can } = require('../../middlewares/can');

const ticketDepartmentAdminController = require('../../controllers/admin/ticket-department');

router
    .route('/api/admin/ticket-departements')
    .get(ticketDepartmentAdminController.readDepartments)
    .post(
        adminAuth.required,
        can('admin'),
        ticketDepartmentAdminController.createDepartments,
    );

router
    .route('/api/admin/ticket-departements/:ticketDepartementId')
    .all(adminAuth.required, can('admin'))
    .get(ticketDepartmentAdminController.readDepartment)
    .put(ticketDepartmentAdminController.updateDepartment)
    .delete(ticketDepartmentAdminController.deleteDepartment);

module.exports = { router };
