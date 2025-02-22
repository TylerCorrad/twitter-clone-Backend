import { ApiProperty } from "@nestjs/swagger";
import { Commentaries } from "src/comments/entities/comment.entity";
import { Twitt } from "src/twitts/entities/twitt.entity";
import { Like } from "src/likes/entities/like.entity";
import { Retweet } from "src/retweets/entities/retweet.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @ApiProperty({
        example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        description: 'Unique identifier of the user',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'Unique email of the user',
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        example: 'securepassword123',
        description: 'User password (hidden by default)',
    })
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Full name of the user',
    })
    @Column('text')
    fullName: string;

    @ApiProperty({
        example: '1995-08-25',
        description: 'User birthday in YYYY-MM-DD format',
    })
    @Column({ type: 'date' })
    birthday: Date;

    @ApiProperty({
        example: '2024-02-21',
        description: 'Date when the user was created',
        default: () => 'CURRENT_DATE',
    })
    @CreateDateColumn({ type: 'date' })
    createdAt: Date;

    @ApiProperty({
        example: true,
        description: 'Indicates if the user is active',
        default: true,
    })
    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @ApiProperty({
        example: ['user','super-user' , 'admin'],
        description: 'Roles assigned to the user',
        default: ['user'],
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Twitt,
        (twitt) => twitt.user
    )
    twitt: Twitt;

    @OneToMany(() => Retweet, (retweet) => retweet.user)
    retweets: Retweet[];

    @OneToMany(
        () => Commentaries,
        (commentarie) => commentarie.user
    )
    commentarie: Commentaries;

    @OneToMany(
        () => Like,
        (like) => like.user
    )
    likes: Like[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeInsert()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
