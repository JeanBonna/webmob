import { DataSource, In, Repository } from "typeorm";
import FollowEntity from '../entities/follow'


class FollowRepository implements FollowRepository{
    private repository: Repository<FollowEntity>

    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(FollowEntity);
    }

    async getAll(): Promise<FollowEntity[]>{
        return this.repository.find({relations: ['follower', 'followed']});
    }

    async getById(id: number): Promise<FollowEntity | undefined>{
        const follow = await this.repository.findOne({where:{id}, relations: ['follower','followed']});
        return follow || undefined;
    }

    async getFollow(idFollower: number, idFollowed: number): Promise<FollowEntity | undefined>{
        const follow = await this.repository.findOne({where:{follower:{id: idFollower}, followed:{id: idFollowed}}})
        return follow || undefined;
    }

    async getBy(ids: number[]): Promise<FollowEntity[] | undefined>{
        const follows = await this.repository.find({where: {id: In(ids)}, relations:['follower', 'followed']});
        return follows || undefined;
    }

    async create(follow: Omit<FollowEntity, 'id'>) : Promise<FollowEntity>{
        const newfollow = this.repository.create(follow);
        return this.repository.save(newfollow);
    }

    async update(id: number, follow: Partial<Omit<FollowEntity, 'id'>>): Promise<FollowEntity|undefined>{
        const followToUpdate = await this.getById(id);
        if(!followToUpdate) return undefined;
        this.repository.merge(followToUpdate, follow);
        return this.repository.save(followToUpdate);
    }

    async delete(id: number): Promise<boolean>{
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }

}

export default FollowRepository;