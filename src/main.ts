import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { ConfigService } from "./services";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const options = new DocumentBuilder()
    .setTitle("Node Rest Api")
    .setDescription("Test Node Rest Api")
    .setVersion("1.0")
    .addTag("Node Rest Api")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(ConfigService.get("PORT") || 3000);
}

bootstrap();
