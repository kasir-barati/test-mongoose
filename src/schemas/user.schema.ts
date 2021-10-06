import { model, Schema, Document } from 'mongoose';
import { RoleDocument } from './role.schema';

export interface UserDocument extends Document {
    _id?: string;
    phoneNumber: string;
    username: string;
    password?: string;
    role: string | RoleDocument;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        phoneNumber: { type: String, required: true, unique: true },
        username: { type: String, unique: true, required: false },
        password: String,
        role: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'role',
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = model<UserDocument>('user', userSchema);
