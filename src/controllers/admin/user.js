// @ts-check
const userRepository = require('../../repositories/user');

/**@type {import('express').RequestHandler} */
async function readUsers(req, res, next) {
    const { users } = await userRepository.fetchUsers();

    res.status(200).json({
        successful: true,
        error: null,
        users,
    });
}

/**@type {import('express').RequestHandler} */
async function createUser(req, res, next) {
    const { email, password } = req.body;
    const { userId } = await userRepository.insert(email, password);

    res.status(200).json({
        successful: true,
        error: null,
        userId,
    });
}

module.exports = {
    readUsers,
    createUser,
};
