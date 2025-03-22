import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Like } from "src/likes/entities/like.entity";
import { Retweet } from "src/retweets/entities/retweet.entity";
import { Commentaries } from "src/comments/entities/comment.entity";  // Asegúrate de importar la entidad correcta
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Twitt {

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador único del tweet",
        format: "uuid"
    })
    @PrimaryGeneratedColumn('uuid')
    twitt_id: string;

    @ApiProperty({
        example: "Este es mi primer tweet!",
        description: "Contenido del tweet",
        minLength: 1
    })
    @Column('text', { nullable: false })
    content: string;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se creó el tweet",
        type: String
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se edita el tweet",
        type: String
    })
    @Column({ type: 'timestamp', nullable: true, default: null })
    EditedAt: Date | null;

    @ApiProperty({
        example: false,
        description: "Indica si el tweet ha sido editado o no",
        default: false
    })
    @Column('bool', { default: false })
    isEdited: boolean;

    @ManyToOne(() => User, (user) => user.twitt, { eager: true })
    user: User;

    @OneToMany(() => Commentaries, (comment) => comment.twitt)
        commentarie: Commentaries[];

    @OneToMany(() => Like, (like) => like.twitt)
    likes: Like[];

    @OneToMany(() => Retweet, (retweet) => retweet.originalTwitt)

    @ManyToOne(() => Twitt, (twitt) => twitt.retweets, { nullable: true, onDelete: 'CASCADE' })
  originalTwitt?: Twitt; 
  
retweets: Retweet[];
}
