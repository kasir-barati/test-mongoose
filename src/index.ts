import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env') });

import { connectToMongodb } from './connect-to-mongodb';

import { mergeStage } from './merge-stage';

(async function () {
    try {
        const { db, client } = await connectToMongodb();

        await mergeStage(db, client);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
