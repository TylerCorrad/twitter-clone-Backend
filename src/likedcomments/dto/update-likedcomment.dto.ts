import { PartialType } from '@nestjs/swagger';
import { CreateLikedcommentDto } from './create-likedcomment.dto';

export class UpdateLikedcommentDto extends PartialType(CreateLikedcommentDto) {}
