import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const start = async() => {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle("Урок по продвинутому BACKEND")
		.setDescription("Документация REST API")
		.setVersion("1.0.0")
		.addTag("developer")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document);

	await app.listen(PORT, () => {
		console.log(`server has been started on port ${PORT}`);
	});
};

start();