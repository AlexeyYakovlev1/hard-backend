import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Пользователи")
@Controller('users')
export class UsersController {
	constructor(private usersServices:UsersService) {}
	
	@ApiOperation({ summary: "Создание пользователя" })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersServices.createUser(userDto);
	}

	@ApiOperation({ summary: "Получение пользователей" })
	@ApiResponse({ status: 200, type: [User] })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersServices.getAllUsers();
	}
}
