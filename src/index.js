// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const mongoose = require('mongoose');

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

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_EXPOSED_PORT}/${process.env.MONGODB_DATABASE}`,
        {
            autoReconnect: true,
            reconnectTries: 30,
        },
    )
    .then(insertData)
    .catch(console.error);

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
}
