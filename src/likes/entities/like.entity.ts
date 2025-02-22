import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";
import { Twitt } from "src/twitts/entities/twitt.entity";

@Entity()
export class Like {
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador único del like",
        format: "uuid"
    })
    @PrimaryGeneratedColumn('uuid')
    like_id: string;

    @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Twitt, (twitt) => twitt.likes, { onDelete: "CASCADE" })
    twitt: Twitt;

    @CreateDateColumn()
    createdAt: Date;
}
