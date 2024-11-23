import dbConnect from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

const context = await dbConnect(process.env.CONNECTION_STRING);

export async function getAllPosts() {
    const database = context.db("alura-imersao-db");
    const collection = database.collection("posts");

    return collection.find().toArray();
}

export async function getPostById(id) {
    const database = context.db("alura-imersao-db");
    const collection = database.collection("posts");
    
    const objectId = {_id: new ObjectId(ObjectId.createFromHexString(id))};

    return await collection.findOne(objectId);
}

export async function createPost(post) {
    const database = context.db("alura-imersao-db");
    const collection = database.collection("posts");

    return collection.insertOne(post);
}

export async function updatePost(id, post) {
    const database = context.db("alura-imersao-db");
    const collection = database.collection("posts");
    
    const objectId = {_id: new ObjectId(ObjectId.createFromHexString(id))};
    const updatedPost = {$set:post};

    return collection.updateOne(objectId, updatedPost);
}