import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginUserDto{

    @ApiProperty({
            description: 'Email is required from the user to create an account',
    
        })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'It must be at least 6 character and have a Uppercase, lowercase letter and a number',

    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}