import { DataSource, In, Repository } from "typeorm";
import PostEntity from '../entities/post'


class PostRepository implements PostRepository{
    private repository: Repository<PostEntity>

    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(PostEntity);
    }

    async getAll(): Promise<PostEntity[]>{
        return (await this.repository.find({relations:['user'], order: { id: 'DESC'}}));
    }

    async getById(id: number): Promise<PostEntity | undefined>{
        const post = await this.repository.findOne({where:{id}, relations:['user']});
        return post || undefined;
    }

    async getBy(ids: number[]): Promise<PostEntity[] | undefined>{
        const posts = await this.repository.find({ where:{id: In(ids)}, relations:['user']})
        return posts || undefined;
    }

    async getByUser(userId: number): Promise<PostEntity[] | undefined>{
        const posts = await this.repository.find({ where:{user:{id:userId}}, relations:['user'] })
        return posts || undefined;
    }

    async create(post: Omit<PostEntity, 'id'>) : Promise<PostEntity>{
        const newpost = this.repository.create(post);
        return this.repository.save(newpost);
    }

    async update(id: number, post: Partial<Omit<PostEntity, 'id'>>): Promise<PostEntity|undefined>{
        const postToUpdate = await this.getById(id);
        if(!postToUpdate) return undefined;
        this.repository.merge(postToUpdate, post);
        return this.repository.save(postToUpdate);
    }

    async delete(id: number): Promise<boolean>{
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

}

export default PostRepository;