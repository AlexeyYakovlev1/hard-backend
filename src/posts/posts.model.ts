import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface IPostCreationAttrs {
	title: string;
	content: string;
	image: string;
	userId: number;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, IPostCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	title: string;

	@Column({ type: DataType.STRING, allowNull: false })
	content: string;

	@Column({ type: DataType.STRING, allowNull: false })
	image: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	// Пост принадлежит одному конкретному пользователю
	@BelongsTo(() => User)
	author: User;
}