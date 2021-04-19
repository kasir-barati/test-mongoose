// @ts-check
const jwt = require('express-jwt');

const {
    envs: {
        jwt: { adminSecret, userSecret },
    },
} = require('../configs/env');

function getTokenFromHeaders(req) {
    const {
        headers: { authorization },
    } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }

    return null;
}

const auth = {
    required: jwt({
        secret: userSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        algorithms: ['HS256'],
    }),
    optional: jwt({
        secret: userSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ['HS256'],
    }),
};

const adminAuth = {
    required: jwt({
        secret: adminSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        algorithms: ['HS256'],
    }),
    optional: jwt({
        secret: adminSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ['HS256'],
    }),
};

module.exports = {
    auth,
    adminAuth,
};
