import { Db, MongoClient, ObjectId } from 'mongodb';

import admins from './admins.json';

export async function mergeStage(db: Db, client: MongoClient) {
    const session = client.startSession();

    try {
        session.startTransaction();

        console.log('admin to user');

        await db.collection('admins').insertMany(admins);

        const adminCount = await db
            .collection('admins')
            .find()
            .count();

        console.log(`admin counts: ${adminCount}`);

        await db
            .collection('admins')
            .aggregate([
                {
                    $addFields: {
                        adminId: '$_id',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        adminId: 1,
                        username: 1,
                        password: 1,
                        name: 1,
                        lastname: 1,
                        phoneNumber: '$info.phoneNumber',
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                {
                    $addFields: {
                        isPhoneNumberVerified: true,
                        role: 'ADMIN',
                        gender: 'UNKNOWN',
                    },
                },
                {
                    $merge: {
                        into: 'users',
                    },
                },
            ])
            .toArray();

        const userCount = await db.collection('users').find().count();

        console.log(`user counts: ${userCount}`);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}
