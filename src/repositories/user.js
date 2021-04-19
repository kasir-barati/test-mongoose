// @ts-check
const { UserModel } = require('../schemas/users');

/**
 * @typedef fetchUserReturnType
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 * @property {Date} createdAt
 * @property {Date} deletedAt
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
        createdAt: (await user)?.createdAt ?? null,
        deletedAt: (await user)?.deletedAt ?? null,
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
        createdAt: (await user)?.createdAt ?? null,
        deletedAt: (await user)?.deletedAt ?? null,
    };
}

/**
 * @returns {{users: fetchUserReturnType[]}}
 */
async function fetchUsers() {
    const users = await UserModel.find();

    return {
        users: users.map((user) => ({
            _id: user._id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            deletedAt: user.deletedAt,
        })),
    };
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{userId: string}>}
 */
async function insert(email, password) {
    const user = new UserModel({
        email,
        password,
    }).save();

    return {
        userId: (await user).id,
    };
}

module.exports = {
    insert,
    fetchById,
    fetchUsers,
    fetchByEmail,
};
