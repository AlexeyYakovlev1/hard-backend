import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
	constructor(private usersServices:UsersService) {}
	
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersServices.createUser(userDto);
	}

	@Get()
	getAll() {
		return this.usersServices.getAllUsers();
	}
}
