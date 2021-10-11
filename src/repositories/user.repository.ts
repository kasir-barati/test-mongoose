import { DocumentDefinition, UpdateQuery } from 'mongoose';

import { UserDocument, UserModel } from '../schemas/user.schema';

export class UserRepository {
    async create(
        user: DocumentDefinition<UserDocument>,
    ): Promise<UserDocument> | never {
        return await UserModel.create(user);
    }

    async findByIdAndUpdate(
        userId: string,
        user: UpdateQuery<UserDocument>,
    ): Promise<UserDocument | null> | never {
        return await UserModel.findByIdAndUpdate(userId, user);
    }
}
