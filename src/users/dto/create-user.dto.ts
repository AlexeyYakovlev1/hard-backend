import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class CreateUserDto {
	@ApiProperty({ example: "user@gmail.com", description: "Почта пользователя" })
	@IsString({ message: "Должно быть строкой" })
	@IsEmail({}, { message: "Некорректная почта" })
	readonly email:string;

	@ApiProperty({ example: "123456", description: "Пароль пользователя" })
	@IsString({ message: "Должно быть строкой" })
	@Length(6, 12, { message: "Минимальная длина пароля 6 символов, максимальная 12" })
	readonly password:string;
}