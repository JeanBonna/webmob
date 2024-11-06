import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import FollowRepository from "../repositories/followRepository";
import UserRepository from "../repositories/userRepository";

export class FollowController{
    private followRepository: FollowRepository;

    constructor(){
        this.followRepository = new FollowRepository(appDataSource);
    }

    getAll = async (req: Request, res: Response): Promise<void> =>{
        const likes = await this.followRepository.getAll();
        res.status(200).json(likes);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const like = await this.followRepository.getById(parseInt(req.params.id));
        if(!like){
            res.status(404).send('Follow not found');
        }else{
            res.status(200).json(like);
        }
    };

    getFollow = async (req: Request, res: Response): Promise<void> => {
        const like = await this.followRepository.getFollow(parseInt(req.params.followerId), parseInt(req.params.followedId));
        if(!like){
            res.status(200).json({isFollowing: false});
        }else{
            res.status(200).json({isFollowing: true});
        }
    };

    create = async (req: Request, res: Response): Promise<void> =>{
        const userRepository: UserRepository = new UserRepository(appDataSource);
        
        const followerId = req.body.followerId;
        const followedId = req.body.followedId;
        const follower = await userRepository.getById(followerId);
        const followed = await userRepository.getById(followedId);
        if(!follower || !followed){
            res.status(404).send('User not found');
        }else{
            const isfollowed = await this.followRepository.getFollow(followerId, followedId);
            if(isfollowed){
                await this.followRepository.delete(isfollowed.id);
                res.status(204).json({message: 'follow deleted'});
            }else{
                const newFollow = await this.followRepository.create({follower, followed});
                res.status(201).json({message: 'Follow added'});
            }
        }
        // console.log(req.body.followerId)
        // console.log(req.body.followedId)
        // console.log(follower)
        // console.log(followed)


    };

    update = async (req: Request, res: Response): Promise<void> =>{
        const updatedFollow = await this.followRepository.update(parseInt(req.params.id),req.body);
        if(!updatedFollow){
            res.status(404).send('Follow not found');
        }else{
            res.status(200).json(updatedFollow);
        }
    };

    delete = async(req: Request, res: Response): Promise<void> =>{
        const success = await this.followRepository.delete(parseInt(req.params.id));
        if(!success){
            res.status(404).send('Follow not found');
        }else{
            res.status(204).json({message:'Follow deleted'});
        }
    };
}