import App from "./app";
import PostsController from "./posts/post.controller";
import { validateEnv } from "./utils/validateEnv";
//Import of the config in the .env file:
import "dotenv/config";

validateEnv();

const app = new App([new PostsController()]);

app.listen();
