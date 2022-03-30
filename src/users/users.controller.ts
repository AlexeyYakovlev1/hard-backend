import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Пользователи")
@Controller('users')
export class UsersController {
	constructor(private usersServices:UsersService) {}
	
	@ApiOperation({ summary: "Создание пользователя" })
	@ApiResponse({ status: 200, type: User })
	@UsePipes(ValidationPipe)
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

	@ApiOperation({ summary: "Выдать роль" })
	@ApiResponse({ status: 200 })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Post("/role")
	addRole(@Body() dto: AddRoleDto) {
		return this.usersServices.addRole(dto);
	}

	@ApiOperation({ summary: "Забанить пользователя" })
	@ApiResponse({ status: 200 })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Post("/ban")
	ban(@Body() dto: BanUserDto) {
		return this.usersServices.ban(dto);
	}
}
