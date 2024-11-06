import { Request, Response } from "express";

export class HealthCheckController{
    check = async (req:Request, res:Response): Promise<void> =>{
        res.status(200).send('Sucesso')
    }
};
