import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ? +process.env.PORT : 5001, () =>
    console.log(`Server successfully started on port 5001`),
  );
  //const nftService = new NftService()
  //const nftController = new NftController(nftService);
  //nftController.generateNftByAllIds()
}
bootstrap();
