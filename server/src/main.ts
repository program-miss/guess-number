import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
config();

const clientUrl = process.env.CLIENT_URL || '';

async function bootstrap() {
  let appOptions = {};

  // Https
  if (process.env.ENABLE_HTTPS === 'true') {
    const pathPrivateKey = process.env.PATH_PRIVATE_KEY || '';
    const pathCertificate = process.env.PATH_CERTIFICATE || '';
    const httpsOptions: HttpsOptions = {
      key: readFileSync(pathPrivateKey),
      cert: readFileSync(pathCertificate),
    };
    appOptions = { httpsOptions };
  }

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: clientUrl,
    },
    ...appOptions,
  });

  // Listen
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
