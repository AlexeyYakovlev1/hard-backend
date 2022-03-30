import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface IUserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttrs> {
	@ApiProperty({ example: "1", description: "Уникальный идентификатор" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: "user@gmail.com", description: "Почта пользователя" })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: "123456", description: "Пароль пользователя" })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: "false", description: "Блокировка пользователя" })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@ApiProperty({ example: "Причина", description: "Причина блокировки" })
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string;

	// пользователь может иметь множество ролей
	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];

	// пользователь может иметь большое кол-во постов
	@HasMany(() => Post)
	posts: Post[];
}