// @ts-check
const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'index';

const indexSchema = new Schema(
    {
        field1: String,
    },
    {
        timestamps: true,
    },
);

const IndexModel = model(
    COLLECTION_NAME,
    indexSchema,
    COLLECTION_NAME,
);

module.exports = {
    IndexModel,
    COLLECTION_NAME,
};
