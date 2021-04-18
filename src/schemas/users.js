// @ts-check
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const COLLECTION_NAME = 'user';

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const UserModel = model(COLLECTION_NAME, userSchema);

module.exports = { UserModel, COLLECTION_NAME };
