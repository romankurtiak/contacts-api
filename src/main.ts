import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RootModule } from './root.module';
import { UniqueConstraintExceptionFilter } from './common/exception-filters';

(async () => {
  const app = await NestFactory.create(RootModule);

  const config = new DocumentBuilder().setTitle('Contacts API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new UniqueConstraintExceptionFilter());

  await app.listen(3000);
})();
