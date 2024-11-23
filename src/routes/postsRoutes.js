import multer from "multer";
import cors from "cors";
import { getAllPostsEndPoint, createPostEndPoint, uploadImageEndPoint, getPostsEndPoint, updatePostEndpoint } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}

const storageConfig = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadManager = multer({ dest: "./uploads", storageConfig });

const routes = (app) => {

    app.use(cors(corsOptions));

    app.get("/posts", getAllPostsEndPoint);

    app.post("/posts", createPostEndPoint);

    app.post("/upload", uploadManager.single("image"), uploadImageEndPoint);

    app.get("/posts/:id", getPostsEndPoint);

    app.put("/upload/:id", updatePostEndpoint)
}
export default routes; 