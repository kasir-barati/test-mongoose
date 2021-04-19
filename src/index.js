// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const { logger } = require('./common/log');
// Seeders
const { insert: insertUsers } = require('./seeders/users');
const {
    insert: insertDepartement,
} = require('./seeders/ticket-departements');
const {
    insert: insertPriorities,
} = require('./seeders/ticket-priorities');

// dummy data
const { insertDummy } = require('./dummy-data/index');

const expressApp = require('./app');
const mongodbConfig = require('./configs/mongodb');

mongodbConfig
    .connect()
    .then(insertData)
    .then((port) => {
        logger('info', 'server', {
            message: `server connected on ${port}`,
        });
    })
    .catch((error) => {
        logger(
            'error',
            'db',
            {
                message:
                    error?.message ??
                    'Some problem happended during the connecting/inserting to the MongoDB',
            },
            error,
        );
    });

async function insertData(connection) {
    const {
        adminUserId,
        costomerUserId,
        sellSupportUserId,
        technicalSupportUserId,
    } = await insertUsers();
    const { supportDepartementId } = await insertDepartement([
        adminUserId,
        sellSupportUserId,
        technicalSupportUserId,
    ]);
    const {
        criticalAndUrgentPriorityId,
        criticalPriorityId,
        urgentPriorityId,
        normalPriorityId,
    } = await insertPriorities();

    await insertDummy();

    return expressApp.listen().catch((error) => {
        logger(
            'error',
            'server',
            {
                message:
                    error?.message ??
                    `Server could not starts on the specified port`,
            },
            error,
        );
    });
}
