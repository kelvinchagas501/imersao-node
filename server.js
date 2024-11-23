import express from "express";
import routes from "./src/routes/postsRoutes.js";

const __port = 3000;

const app = express();
app.use(express.json());

app.use(express.static("uploads"));

routes(app);

app.listen(__port, () => {
    console.log("servidor ouvindo...");
});
