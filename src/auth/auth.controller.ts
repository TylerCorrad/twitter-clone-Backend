import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({status: 201, description:'User Was Created', type: User})
  @ApiResponse({status: 400, description:'Bad Request'})
  @ApiResponse({status: 403, description:'Token related'})

  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ){
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @Auth(ValidRoles.admin) //CON ESTE DECORADOR PERSONALIZADO SE PUEDEN COLOCAR VARIOS ROLES ValidRoles.user, etc.
  privateRoute(
    @GetUser() user:User
  ){

    return{
      ok:true,
      user
    }
  }

}
