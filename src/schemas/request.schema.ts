import { model, Schema, Document } from 'mongoose';
import { ProjectDocument } from './project.schema';
import { UserDocument } from './user.schema';

export interface RequestDocument extends Document {
    _id?: string;
    project: string | ProjectDocument;
    user: string | UserDocument;
    createdAt?: Date;
    updatedAt?: Date;
}

const requestSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'project',
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
    },
    {
        timestamps: true,
    },
);

export const RequestModel = model<RequestDocument>('request', requestSchema);
