import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { RetweetsService } from './retweets.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('retweets')
export class RetweetsController {
  constructor(private readonly retweetsService: RetweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':twittId')
  async retweet(@Request() req, @Param('twittId') twittId: string) {
    return this.retweetsService.retweet(req.user, twittId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUserRetweets(@Request() req) {
    return this.retweetsService.getUserRetweets(req.user.id);
  }
}