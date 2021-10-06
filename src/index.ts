import { join } from 'path';

import { DocumentDefinition } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '..', '.env'),
});

import { connectToMongoDB } from './configs/mongodb.config';
import { UserDocument, UserModel } from './schemas/user.schema';
import { ProjectDocument, ProjectModel } from './schemas/project.schema';
import {
    ProjectLevelDocument,
    ProjectLevelModel,
} from './schemas/project-level.schema';
import { RequestDocument, RequestModel } from './schemas/request.schema';
import { RoleDocument, RoleModel } from './schemas/role.schema';

(async () => {
    await connectToMongoDB();
    const roleDocument: DocumentDefinition<RoleDocument> = {
        name: 'admin',
        slug: 'admin',
    };
    const role = await RoleModel.create(roleDocument);
    const userDocument: DocumentDefinition<UserDocument> = {
        phoneNumber: '+989109679196',
        username: 'kasir_barati',
        role: role!._id!.toString(),
    };
    const user = await UserModel.create(userDocument);
    const projectLevelDocument: DocumentDefinition<ProjectLevelDocument> = {
        grade: 100,
        name: 'g1',
    };
    const projectLevel = await ProjectLevelModel.create(projectLevelDocument);
    const projectDocument: DocumentDefinition<ProjectDocument> = {
        user: user!._id!.toString(),
        cost: 2500,
        level: projectLevel!._id!.toString(),
    };
    const project = await ProjectModel.create(projectDocument);
    const requestDocument: DocumentDefinition<RequestDocument> = {
        user: user!._id!.toString(),
        project: project!._id!.toString(),
    };
    const request = await RequestModel.create(requestDocument);

    const populatedRequest = await RequestModel.findOne({
        user: request.user.toString(),
    }).populate({
        path: 'project',
        populate: [
            {
                path: 'level',
            },
            {
                path: 'user',
                populate: [
                    {
                        path: 'role',
                        select: 'name slug createdAt',
                    },
                ],
            },
        ],
    });

    console.log(populatedRequest);
})();
