import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

beforeAll( async () => {
    process.env.JWT_KEY = 'testing_jwt_key';
    try {
        mongo = await MongoMemoryServer.create({ binary: { version: '4.2.6' } }); //ubuntu stuff
        const mongoUri = mongo.getUri();
        await mongoose.connect(mongoUri,{});       
    } catch (e) {}
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if(mongo) {
        await mongo.stop();
    };

    await mongoose.connection.close();
});