import { MongoClient } from "mongodb";

export default async function dbConnect(connectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectionString);
        console.log("Connecting to MongoDB...");

        await mongoClient.connect();
        console.log("Connected to MongoDB...");

        return mongoClient;
    } catch (exception) {
        console.log("fail to connect..", exception);
        process.exit();
    }
}