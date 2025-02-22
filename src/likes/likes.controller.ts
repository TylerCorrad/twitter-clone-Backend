import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':twittId')
  @UseGuards(AuthGuard())
  toggleLike(@GetUser() user: User, @Param('twittId') twittId: string) {
    return this.likesService.toggleLike(user, twittId);
  }

  @Get(':twittId')
  @UseGuards(AuthGuard())
  getLikes(@GetUser() user: User, @Param('twittId') twittId: string) {
    return this.likesService.getLikes(twittId, user.id);
  }
}
