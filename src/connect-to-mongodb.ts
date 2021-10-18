import { Db, MongoClient } from 'mongodb';

export async function connectToMongodb(): Promise<{
    client: MongoClient;
    db: Db;
}> {
    const connectionString = process.env.MONGODB_URI;
    const databaseName = process.env.MONGODB_DATABASE;

    if (!connectionString || !databaseName) {
        throw new Error(
            'No `connectionString` or `databaseName` read from .env!',
        );
    }
    console.log('\n\r\n\r');
    console.log({ connectionString, databaseName });
    console.log('\n\r\n\r');

    const client = await MongoClient.connect(connectionString);
    const db = client.db(databaseName);

    return {
        client,
        db,
    };
}
