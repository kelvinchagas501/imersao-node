import fs from "fs";
import { getAllPosts, createPost, getPostById, updatePost } from "../models/postsModel.js";
import {generateImageDescription, generateItens} from "../services/geminiService.js"

export async function getAllPostsEndPoint(request, response) {
    const posts = await getAllPosts();
    response.status(200).json(posts);
}

export async function getPostsEndPoint(request, response) {
    const postId = request.params.id;

    const post = await getPostById(postId);
    console.log(post);

    response.status(200).json(post);
}

export async function createPostEndPoint(request, response) {
    const postRequest = request.body;

    try {
        const postCreated = await createPost(postRequest);
        response.status(201).json(postCreated);
    } catch (exception) {
        console.error(erro.message);
        response.status(500).json(exception);
    }
}

export async function uploadImageEndPoint(request, response) {
    const postRequest = {
        descricao: "",
        urlImage: request.file.originalName,
        altImage: ""
    };

    try {
        const postCreated = await createPost(postRequest);
        const updatedImageUrl = `uploads/${(postCreated).insertedId}.png`;
        fs.renameSync(request.file.path, updatedImageUrl);

        response.status(201).json(postCreated);
    } catch (exception) {
        console.error(erro.message);
        response.status(500).json(exception);
    }
}

export async function updatePostEndpoint(request, response) {
    const id = request.params.id;
    const imageUrl = `http://localhost:3000/${id}.png`;
    
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateItens(imageBuffer);

        console.log(description);

        const post = {
            descricao: description,
            urlImage: imageUrl,
            altImage: request.body.altImage
        };
    

        const postCreated = await updatePost(id, post);
        response.status(201).json(postCreated);
    } catch (exception) {
        console.error(erro.message);
        response.status(500).json(exception);
    }
}