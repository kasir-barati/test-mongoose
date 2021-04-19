// @ts-check
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const {
    envs: { common: commonConfigs, jwt: jwtConfigs },
} = require('../configs/env');

const userUserController = require('../controllers/user/user');
const userAdminController = require('../controllers/admin/user');

if (commonConfigs.nodeEnv === 'development') {
    router
        .route('/api/dev/get-jwt-token')
        .all(/* permission checking */)
        .post((req, res, next) => {
            const { userId, isAdmin } = req.body;

            const token = jwt.sign(
                {
                    ...(isAdmin
                        ? { admin: true }
                        : { contractor: true }),
                    id: userId,
                },
                isAdmin
                    ? jwtConfigs.adminSecret
                    : jwtConfigs.userSecret,
            );

            res.status(200).json({
                successful: true,
                error: null,
                token,
            });
        });
}

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
