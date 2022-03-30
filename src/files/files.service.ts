import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

// !!! лучше использовать асинхронные запросы для работы с файловой системой !!!

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			const fileName = uuid.v4() + ".jpg";
			const filePath = path.resolve(__dirname, "..", "static"); // в текущей папке возвращаемся на одну и в папку static

			if (!fs.existsSync(filePath)) { // если по этому пути ничего не существует
				fs.mkdirSync(filePath, { recursive: true }); // создаем папку, если в этой папке какой-то папки не будет, то nodejs ее создаст
			}

			fs.writeFileSync(path.join(filePath, fileName), file.buffer); // записываем файл
			return fileName;
		} catch {
			throw new HttpException("Произошла ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
