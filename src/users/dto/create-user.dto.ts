import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({ example: "user@gmail.com", description: "Почта пользователя" })
	readonly email:string;
	@ApiProperty({ example: "123456", description: "Пароль пользователя" })
	readonly password:string;
}