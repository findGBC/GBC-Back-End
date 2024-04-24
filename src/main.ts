import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NftService} from "./modules/nft/nft.service";
import {NftController} from "./modules/nft/nft.controller";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const nftService = new NftService()
  const nftController = new NftController(nftService);
  //nftController.generateNftByAllIds()
}
bootstrap();
