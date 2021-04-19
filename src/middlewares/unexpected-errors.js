// @ts-check

/**@type {import('express').ErrorRequestHandler} */
function unexpectedErrors(error, req, res, next) {
    console.log('\n\r-----F---A---T---A---L-----\n\r');
    console.error(error);
    console.log('\n\r-----F---A---T---A---L-----\n\r');

    res.status(500).end();
}

module.exports = {
    unexpectedErrors,
};
