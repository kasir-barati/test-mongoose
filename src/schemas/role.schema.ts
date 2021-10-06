import { model, Schema, Document } from 'mongoose';

export interface RoleDocument extends Document {
    _id?: string;
    name: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const roleSchema = new Schema<RoleDocument>(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true, required: true },
    },
    {
        timestamps: true,
    },
);

export const RoleModel = model<RoleDocument>('role', roleSchema);
