// @ts-check
const { UserModel } = require('../schemas/users');

/**
 * @typedef fetchUserReturnType
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 */

/**
 *
 * @param {string} userId
 * @returns {Promise<fetchUserReturnType>}
 */
async function fetchById(userId) {
    const user = UserModel.findById(userId).exec();

    return {
        _id: (await user)?.id ?? null,
        email: (await user)?.email ?? null,
        password: (await user)?.password ?? null,
    };
}

/**
 *
 * @param {string} email
 * @returns {Promise<fetchUserReturnType>}
 */
async function fetchByEmail(email) {
    const user = UserModel.findOne({
        email,
    }).exec();

    return {
        _id: (await user)?.id ?? null,
        email: (await user)?.email ?? null,
        password: (await user)?.password ?? null,
    };
}

module.exports = {
    fetchById,
    fetchByEmail,
};
