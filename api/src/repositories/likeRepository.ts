import { DataSource, In, Repository } from "typeorm";
import LikeEntity from '../entities/like'
import Post from "../entities/post";
import User from "../entities/user";


class LikeRepository implements LikeRepository{
    private repository: Repository<LikeEntity>

    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(LikeEntity);
    }

    async getAll(): Promise<LikeEntity[]>{
        return this.repository.find({relations:['user', 'post']});
    }

    async getById(id: number): Promise<LikeEntity | undefined>{
        const like = await this.repository.findOne({where:{id}, relations: ['user','post']});
        return like || undefined;
    }

    async getBy(ids: number[]): Promise<LikeEntity[] | undefined>{
        const likes = await this.repository.find({ where:{id: In(ids)}, relations: ['user','post']});
        return likes || undefined;
    }

    async getLike(postId: number, userId: number): Promise<LikeEntity | undefined>{
        //console.log("postId:", postId, "userId:", userId);
        const existingLike = await this.repository.findOne({ where: { user:{id: userId}, post:{id: postId,} } });
        //console.log("============================================================")
        //console.log(existingLike)
        //console.log("============================================================")

        return existingLike || undefined;
    }

    async countLike(postId: number): Promise<number>{
        const count = await this.repository.count({ where:{post:{id: postId}} });
        return count;
    }

    async create(like: Omit<LikeEntity, 'id'>) : Promise<LikeEntity>{
        const newlike = this.repository.create(like);
        return this.repository.save(newlike);
    }

    async update(id: number, like: Partial<Omit<LikeEntity, 'id'>>): Promise<LikeEntity|undefined>{
        const likeToUpdate = await this.getById(id);
        if(!likeToUpdate) return undefined;
        this.repository.merge(likeToUpdate, like);
        return this.repository.save(likeToUpdate);
    }

    async delete(id: number): Promise<boolean>{
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }

}

export default LikeRepository;