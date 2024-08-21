import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
    @IsEmpty()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @IsEmpty()
    removed?: boolean;
  }