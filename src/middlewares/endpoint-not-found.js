// @ts-check

/**@type {import('express').RequestHandler} */
function endpointNotFound(req, res, next) {
    res.status(404).json({
        error: 'E_ENDPOINT_NOT_FOUND',
    });
}

module.exports = {
    endpointNotFound,
};
