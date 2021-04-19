// @ts-check
const router = require('express').Router();

const userUserController = require('../controllers/user/user');
const userAdminController = require('../controllers/admin/user');

router
    .route('/api/users/who-am-i')
    .all(/* permission checking */)
    .get(userUserController.readUserInfo);

router
    .route('/api/users')
    .all(/* permission checking */)
    .get(userAdminController.readUsers)
    .post(userAdminController.createUser);

module.exports = {
    router,
};
