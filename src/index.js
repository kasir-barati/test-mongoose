// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const mongoose = require('mongoose');

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_EXPOSED_PORT}/${process.env.MONGODB_DATABASE}`,
        {
            autoReconnect: true,
            reconnectTries: 30,
        },
    )
    .then((connection) => {
        console.log(connection);
    })
    .catch(console.error);
