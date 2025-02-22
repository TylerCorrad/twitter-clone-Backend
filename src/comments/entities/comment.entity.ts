import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Twitt } from "src/twitts/entities/twitt.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Commentaries {
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador único del comentario",
        format: "uuid"
    })
    @PrimaryGeneratedColumn('uuid')
    comment_id: string;

    @ApiProperty({
        example: "Este es mi primer comentario!",
        description: "Contenido del comentario",
        minLength: 1
    })
    @Column('text', {
        nullable: false
    })
    content: string;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se creó el comentario",
        type: String
    })
    @CreateDateColumn({ type: 'timestamp', precision: 0 }) 
    createdAt: Date;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se edita el comentario",
        type: String
    })
    @Column({ type: 'timestamp', precision: 0, nullable: true, default: null })
    EditedAt: Date | null;

    @ApiProperty({
        example: false,
        description: "Indica si el comentario ha sido editado o no",
        default: false
    })
    @Column('bool', {
        default: false
    })
    isEdited: boolean;

    @ManyToOne(() => Twitt, (twitt) => twitt.commentarie, { eager: true })
        @JoinColumn({ name: 'twitt_id' })
        twitt: Twitt;

    
    @ManyToOne(
        () => User,
        (user) => user.commentarie,
        { eager: true }
    )
    user: User;
}
