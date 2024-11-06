import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import LikeRepository from "../repositories/likeRepository";
import UserRepository from "../repositories/userRepository";
import PostRepository from "../repositories/postRepository";

export class LikeController{
    private likeRepository: LikeRepository;
    //private userRepository: UserRepository;
    //private postRepository: PostRepository;

    constructor(){
        this.likeRepository = new LikeRepository(appDataSource);
        //this.userRepository = new UserRepository(appDataSource);
        //this.postRepository = new PostRepository(appDataSource);
    }

    getAll = async (req: Request, res: Response): Promise<void> =>{
        const likes = await this.likeRepository.getAll();
        res.status(200).json(likes);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const like = await this.likeRepository.getById(parseInt(req.params.id));
        if(!like){
            res.status(404).send('Like not found');
        }else{
            res.status(200).json(like);
        }
    };

    countByPostId = async(req: Request, res: Response): Promise<void> => {
        const count = await this.likeRepository.countLike(parseInt(req.params.id));

        res.status(200).json({likesCount: count});
        
    };

    create = async (req: Request, res: Response): Promise<void> =>{
        const userRepository: UserRepository = new UserRepository(appDataSource);
        const postRepository: PostRepository = new PostRepository(appDataSource);
        const user = await userRepository.getById(req.body.userId);
        const post = await postRepository.getById(req.body.postId);
        if(!user || !post){
            res.status(404).send('User or Post not found');
        }else{
            const existingLike = await this.likeRepository.getLike(req.body.postId, req.body.userId);
            //console.log(user)
            //console.log(post)
            //console.log(existingLike)
            if(existingLike){
                await this.likeRepository.delete(existingLike.id);
                //console.log("204");
                res.status(204).json({message:'Like deleted'});
            }else{
                //console.log("201");
                const newLike = await this.likeRepository.create({user, post});
                //console.log(newLike)
                res.status(201).json({message: 'Like added'});
            }
        }
    };

    update = async (req: Request, res: Response): Promise<void> =>{
        const updatedLike = await this.likeRepository.update(parseInt(req.params.id),req.body);
        if(!updatedLike){
            res.status(404).send('Like not found');
        }else{
            res.status(200).json(updatedLike);
        }
    };

    delete = async(req: Request, res: Response): Promise<void> =>{
        const success = await this.likeRepository.delete(parseInt(req.params.id));
        if(!success){
            res.status(404).send('Like not found');
        }else{
            res.status(204).json({message:'Like deleted'});
        }
    };
}