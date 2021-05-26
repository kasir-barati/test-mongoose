// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const mongoose = require('mongoose');

const { IndexModel } = require('./models/index.model');
const {
    aggregations,
} = require('./aggregations/between-specified-date-range');

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
        {
            autoReconnect: true,
            reconnectTries: 30,
        },
    )
    .then(async (connection) => {
        console.log(
            (await aggregations.wrongUsage(IndexModel)).length,
        );
        console.log((await aggregations.firstWay(IndexModel)).length);
        console.log(
            (await aggregations.secondWay(IndexModel)).length,
        );
    })
    .catch(console.error);
