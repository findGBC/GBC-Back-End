import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () =>
    console.log(`Server successfully started on port 3000`),
  );
  //const nftService = new NftService()
  //const nftController = new NftController(nftService);
  //nftController.generateNftByAllIds()
}
bootstrap();
