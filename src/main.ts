import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NftService} from "./modules/nft/nft.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const nftService = new NftService();

  //nftService.saveNftSvg('901', false)
}
bootstrap();
