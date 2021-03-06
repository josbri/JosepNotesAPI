import * as express from "express";
import Controller from "../interfaces/controller.interface";
import { IPost } from "./post.interface";
import postModel from "./post.model";
import HttpException from "exceptions/HttpException";
import PostNotFoundException from "../exceptions/PostNotFoundException";

class PostsController implements Controller {
  public path = "/posts";
  public router = express.Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.post(this.path, this.createPost);
  }

  private getAllPosts = (
    request: express.Request,
    response: express.Response
  ) => {
    this.post.find().then((posts) => {
      response.send(posts);
      console.log("Any posts?");
    });
  };

  private getPostById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    this.post.findById(id).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  private modifyPost = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const postData: IPost = request.body;
    this.post.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  private createPost = (
    request: express.Request,
    response: express.Response
  ) => {
    const postData: IPost = request.body;
    const createdPost = new this.post(postData);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  private deletePost = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    this.post.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };
}

export default PostsController;
