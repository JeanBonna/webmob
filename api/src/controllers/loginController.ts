import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import LoginRepository from "../repositories/loginRepository";

export class LoginController{
    private loginRepository: LoginRepository;

    constructor(){
        this.loginRepository = new LoginRepository(appDataSource);
    }

    getUser = async (req: Request, res: Response): Promise<void> => {
        const user = await this.loginRepository.getByUser(req.body.username, req.body.password);
        if(!user){
            res.status(404).send('User not found');
        }else{
            res.status(200).json(user);
        }
    };

}