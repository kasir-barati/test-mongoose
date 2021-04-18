// @ts-check

const { UserModel } = require('../schemas/users');

/**
 * @typedef insertType
 * @property {string} adminUserId
 * @property {string} technicalSupportUserId
 * @property {string} sellSupportUserId
 * @property {string} costomerUserId
 */

/**
 * @returns {Promise<insertType>}
 */
async function insert() {
    let adminUser = new UserModel({
        email: 'admin@admin.com',
        password: 'technical support password',
    }).save();
    let technicalSupportUser = new UserModel({
        email: 'technicalsupport@support.com',
        password: 'technical support password',
    }).save();
    let sellSupportUser = new UserModel({
        email: 'support@support.com',
        password: 'support password',
    }).save();
    let costomerUser = new UserModel({
        email: 'test@test.com',
        password: 'test password',
    }).save();

    return {
        adminUserId: (await adminUser).id,
        technicalSupportUserId: (await technicalSupportUser).id,
        sellSupportUserId: (await sellSupportUser).id,
        costomerUserId: (await costomerUser).id,
    };
}

module.exports = { insert };
