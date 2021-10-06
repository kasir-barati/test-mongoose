import { Document, model, Schema } from 'mongoose';

export interface ProjectLevelDocument extends Document {
    _id?: string;
    name: string;
    grade: number;
    createdAt?: Date | any;
    updatedAt?: Date | any;
}

const projectLevelSchema = new Schema<ProjectLevelDocument>(
    {
        name: { type: String, required: true },
        grade: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

export const ProjectLevelModel = model<ProjectLevelDocument>(
    'project-level',
    projectLevelSchema,
);
