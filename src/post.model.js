// @ts-check
const { Schema, model } = require('mongoose');

const geoJsonPointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const postSchema = new Schema(
    {
        info: {
            gender: { type: String, enum: ['male', 'female'] },
            name: { type: String, required: false },
            lastname: { type: String, required: false, default: '' },
            phoneNumber: { type: String, required: true },
            homeLocation: {
                type: geoJsonPointSchema,
                index: '2dsphere',
            },
        },
        content: String,
        markDownContent: String,
        likes: Number,
        isValid: { type: Boolean, required: true, default: false },
        isVisible: { type: Boolean, required: true, default: false },
        visibleLastUpdate: { type: Date, required: false },
        description: String,
        adminDescription: String,
        submitInfo: {
            src: String,
            ip: String,
            sourcePage: String,
            previousPage: String,
        },
        unstructuredData: String,
        followUpBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
        followUpRate: {
            type: String,
            enum: ['GARISH', 'WARM', 'COLD'],
        },
        labels: [{ type: String }],
        followUpStatus: { type: String, default: 'NO_FOLLOWED_UP' },
        haveSlider: {
            type: Boolean,
            required: false,
            default: false,
        },
        otherDescription: { type: String, required: false },
    },
    {
        timestamps: true,
    },
);

postSchema.index({ 'info.lastname': 1 });
postSchema.index({ 'info.phoneNumber': 1 });

const PostModel = model('post', postSchema);

module.exports = { PostModel };
