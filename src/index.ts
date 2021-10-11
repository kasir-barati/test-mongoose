import { join } from 'path';

import { DocumentDefinition } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '..', '.env'),
});

import { connectToMongoDB } from './configs/mongodb.config';
import { UserDocument } from './schemas/user.schema';
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
    const updatedUser = await userRepository.findByIdAndUpdate(
        user._id.toString(),
        {
            profile: {
                ...(sampleCondition
                    ? { avatar: 'sample.com/sample/avatar.png' }
                    : {}),
                ...(sampleCondition ? { nicname: 'kasir_san' } : {}),
            },
        },
    );
})();
