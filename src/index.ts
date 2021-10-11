import { join } from 'path';

import { DocumentDefinition } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '..', '.env'),
});

import { connectToMongoDB } from './configs/mongodb.config';
import { UserDocument, UserModel } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';

(async () => {
    await connectToMongoDB();

    const sampleCondition = true;
    const userRepository = new UserRepository();
    const userDocument: DocumentDefinition<UserDocument> = {
        phoneNumber: '+989109679196',
        username: 'kasir_barati',
    };
    const user = await userRepository.create(userDocument);
    const fixRequiredNestedObjectsS1 = await userRepository.findByIdAndUpdate(
        user._id.toString(),
        {
            profile: {
                avatar: sampleCondition
                    ? 'sample.com/sample/avatar.png'
                    : user.profile?.avatar ?? '',
                nickname: sampleCondition
                    ? 'kasir_san'
                    : user.profile?.nickname ?? '',
            },
        },
    );
    const fixRequiredNestedObjectsS2 = await userRepository.findByIdAndUpdate(
        user._id.toString(),
        {
            profile: {
                avatar: sampleCondition ? 'sample.com/sample/avatar.png' : '',
                nickname: sampleCondition ? 'kasir_san' : 'kasir',
            },
        },
    );
})();
