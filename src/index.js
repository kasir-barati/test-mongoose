// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const mongoose = require('mongoose');
const { IndexModel } = require('./models/index.model');
const { mistakes } = require('./dummy-reactions/extra-keys');

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
        {
            autoReconnect: true,
            reconnectTries: 30,
        },
    )
    .then((connection) => {
        console.log(mistakes.insertExtraFields(IndexModel));
    })
    .catch(console.error);
