import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
	constructor(private userService:UsersService,
				private jwtService: JwtService) {}
	
	// Вход
	async login(userDto:CreateUserDto) {
		const user = await this.validationUser(userDto);
		return this.generateToken(user);
	}

	// Регистрация
	async register(userDto: CreateUserDto) {
		const findUser = await this.userService.getUserByEmail(userDto.email);

		if (findUser) {
			throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST);
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({ ...userDto, password: hashPassword });
		
		return this.generateToken(user);
	}

	// Генерация токена jwt
	private async generateToken(user:User) {
		const payload = { email: user.email, roles: user.roles, id: user.id };
		
		return {
			token: this.jwtService.sign(payload)
		}
	}

	// Проверка пользовательских данных
	private async validationUser(userDto:CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email);
		const comparePassword = await bcrypt.compare(userDto.password, user.password);
		
		if (user && comparePassword) {
			return user;
		}

		throw new UnauthorizedException({ message: "Данные неверны" });
	}
}
