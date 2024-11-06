import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import PostRepository from "../repositories/postRepository";
import UserRepository from "../repositories/userRepository";

export class PostController{
    private postRepository: PostRepository;

    constructor(){
        this.postRepository = new PostRepository(appDataSource);
    }

    getAll = async (req: Request, res: Response): Promise<void> =>{
        const posts = await this.postRepository.getAll();
        res.status(200).json(posts);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const post = await this.postRepository.getById(parseInt(req.params.id));
        if(!post){
            res.status(404).send('Post not found');
        }else{
            res.status(200).json(post);
        }
    };

    getByUser = async (req: Request, res: Response): Promise<void> => {
        const post = await this.postRepository.getByUser(parseInt(req.params.id));
        if(!post){
            res.status(404).send('Post not found');
        }else{
            res.status(200).json(post);
        }
    };


    create = async (req: Request, res: Response): Promise<void> =>{
        const userRepository: UserRepository = new UserRepository(appDataSource);
        const user = await userRepository.getById(req.body.userId);
        const content = req.body.content;
        //console.log(user);
        if(!user){
            res.status(404).send('User not found');
        }else{
            //console.log('cheguei');
            const newPost = await this.postRepository.create( {user, content} );
            res.status(201).json({message: 'Post added'});
            //console.log("fim");
        }
    };

    update = async (req: Request, res: Response): Promise<void> =>{
        const updatedPost = await this.postRepository.update(parseInt(req.params.id),req.body);
        if(!updatedPost){
            res.status(404).send('Post not found');
        }else{
            res.status(200).json(updatedPost);
        }
    };

    delete = async(req: Request, res: Response): Promise<void> =>{
        const success = await this.postRepository.delete(parseInt(req.params.id));
        if(!success){
            res.status(404).send('Post not found');
        }else{
            res.status(204).json({message:'Post deleted'});
        }
    };
}