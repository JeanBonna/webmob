import { DataSource, In, Repository } from "typeorm";
import UserEntity from '../entities/user'


class LoginRepository implements LoginRepository{
    private repository: Repository<UserEntity>

    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(UserEntity);
    }


    async getByUser(username: string, password: string): Promise<UserEntity | undefined>{
        const user = await this.repository.findOne({ where: {username} });
        if(user && user.password === password){
           return user;
        }
        return undefined;
    }


}

export default LoginRepository;