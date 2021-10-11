import { model, Schema, Document } from 'mongoose';

export interface Profile {
    avatar: string;
    nickname: string;
}
export interface UserDocument extends Document {
    phoneNumber: string;
    username: string;
    password?: string;
    profile?: Profile;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        phoneNumber: { type: String, required: true, unique: true },
        username: { type: String, unique: true, required: false },
        password: String,
        profile: {
            avatar: {
                type: String,
                required: true,
            },
            nickname: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = model<UserDocument>('user', userSchema);
