import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { newId } from './helpers';

declare global 
{           
    var signin: (id?: string) => string[];    
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51LbRGNGJ9v263UwEaRPeHLwAE4SACunDx9ipMZ9trPom0bLfQKsGHHHjRVP5GmC0Oc7oVpjBzesSplwsCd5mYlAp00BLnbsVrr';

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
    jest.clearAllMocks();

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

global.signin = (id?: string) => {
    //Build a JWT payload. { id, email, iat }
    const payload = {
        id: id || newId(), 
        email: 'test@test.com'
    }
    
    // Create de JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    
    // Build session Object. { jwt: MY_JWT}
    const session = { jwt: token };

    //Turn that session into JSON
    const  sessionJSON = JSON.stringify(session);

    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`session=${base64}`];
};
