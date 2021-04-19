// @ts-check
const userRepository = require('../../repositories/user');

/**@type {import('express').RequestHandler} */
async function readUserInfo(req, res, next) {
    // you have to get the userId from jwt
    const { userId } = req.body;
    const user = userRepository.fetchById(userId);

    res.status(200).json({
        successful: true,
        error: null,
        user: await user,
    });
}

module.exports = {
    readUserInfo,
};
