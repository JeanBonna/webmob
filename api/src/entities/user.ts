import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Follow from "./follow"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    bio: string


    @OneToMany(() => Follow, follow => follow.followed, {onDelete: 'CASCADE'})
    followers?: Follow[];

    @OneToMany(() => Follow, follow => follow.follower, {onDelete: 'CASCADE'})
    following?: Follow[];

    constructor(id: number, username:string, password:string, email:string, bio:string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.bio = bio;
    }

}

export default User
