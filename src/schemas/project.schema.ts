import { model, Schema, Document } from 'mongoose';

export interface ProjectDocument extends Document {
    _id?: string;
    user: string;
    level?: string;
    cost?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const projectSchema = new Schema<ProjectDocument>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        level: { type: Schema.Types.ObjectId, ref: 'project-level' },
        cost: Number,
    },
    {
        timestamps: true,
    },
);

export const ProjectModel = model<ProjectDocument>('project', projectSchema);
