import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id, {onDelete: 'CASCADE'})
    user: User

    @Column()
    content: string

    constructor(id: number, user:User, content:string){
        this.id = id;
        this.user = user;
        this.content = content;
    }

}

export default Post