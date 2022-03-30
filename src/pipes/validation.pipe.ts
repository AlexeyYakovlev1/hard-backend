import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exception/validation.exception";

/* pipe нужны для преобразования входных данных или для валидации */

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> { // асинхронная функция возвращает промис
		const obj = plainToClass(metadata.metatype, value); // преобразовывает полученные значения в класс
		const errors = await validate(obj); // ошибки, которые вернуться после валидации объекта
		
		if (errors.length) {
			const messages = errors.map(error => {
				return `${error.property} - ${Object.values(error.constraints).join(", ")}`;
			});

			throw new ValidationException(messages);
		}

		return value;
	}
}