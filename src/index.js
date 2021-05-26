// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const mongoose = require('mongoose');

const { PostModel } = require('./models/post.model');

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
        {
            autoReconnect: true,
            reconnectTries: 30,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        },
    )
    .then(async (connection) => {
        let limit = 100,
            offset = 0,
            posts;

        do {
            console.log(limit, offset);
            posts = await PostModel.find()
                .limit(limit)
                .skip(limit * offset)
                .exec();
            /**@type {import('./post-type').PostType} */
            let post;
            for (post of posts) {
                // ...
                offset++;
            }
        } while (posts.length > 0);
    })
    .catch(console.error);
