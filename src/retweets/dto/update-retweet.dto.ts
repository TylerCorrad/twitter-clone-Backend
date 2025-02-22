import { PartialType } from '@nestjs/swagger';
import { CreateRetweetDto } from './create-retweet.dto';

export class UpdateRetweetDto extends PartialType(CreateRetweetDto) {}
