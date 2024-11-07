import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import User from "./user"
import Post from "./post"

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => User, user => user.id, {onDelete: 'CASCADE'})
    user: User

    @ManyToOne(() => Post, post => post.id, {onDelete: 'CASCADE'})
    post: Post

    constructor(id: number, user:User, post:Post){
        this.id = id;
        this.user = user;
        this.post = post;
    }

}

export default Like
