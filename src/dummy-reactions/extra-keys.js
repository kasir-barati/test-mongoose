// @ts-check

/**@param {import('mongoose').Model} ModelName */
function insertExtraFields(ModelName) {
    // Mongoose allows to add more fields even though they are not in schema
    return new ModelName({
        field1: 'hi silly mongoose/mongodb',
        type: '60aa12443d1ca3bcf19f2c8c',
        amount: Math.ceil(Math.random() * 100),
        description: 'some dummy desc',
        isGenesis: true,
        asd: 'asd',
    }).save();
}

module.exports = { mistakes: { insertExtraFields } };
