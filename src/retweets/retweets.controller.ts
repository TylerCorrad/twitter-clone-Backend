import { Controller, Post, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { RetweetsService } from './retweets.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('retweets')
export class RetweetsController {
  constructor(private readonly retweetsService: RetweetsService) {}

  @Post(':id')
  @Auth()
  retweet(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.retweetsService.create(id, user);
  }

  @Get()
  findAll() {
    return this.retweetsService.findAll();
  }
}
