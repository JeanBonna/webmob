import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import User from "./user"

@Entity()
export class Follow {

    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
    follower: User;

    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    followed: User;

    constructor(id: number, follower:User, followed:User){
        this.id = id;
        this.follower = follower;
        this.followed = followed;
    }
    

}

export default Follow
