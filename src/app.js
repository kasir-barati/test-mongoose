// @ts-check
const express = require('express');

const { router: ticketRouter } = require('./routers/ticket.router');
const { router: userRouter } = require('./routers/user.router');

const {
    unexpectedErrors,
} = require('./middlewares/unexpected-errors');
const {
    endpointNotFound,
} = require('./middlewares/endpoint-not-found');

const {
    envs: { expressApp },
} = require('./configs/env');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(ticketRouter);

app.use(endpointNotFound);
app.use(unexpectedErrors);

function listen() {
    return new Promise((resolve, reject) => {
        app.listen(Number(expressApp.port), expressApp.host, () => {
            resolve(expressApp.port);
        }).on('error', reject);
    });
}

module.exports = {
    app,
    listen,
};
