import { MongoClient, ServerApiVersion } from 'mongodb';


export default async function DB() {
    const uri = process.env.URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });
    try {
        await client.connect();
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}


