import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Like {
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador único del like",
        format: "uuid"
    })
    @PrimaryGeneratedColumn('uuid')
    like_id: string;
}
