import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NftService} from "./modules/nft/nft.service";
import { NftController } from './modules/nft/nft.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ? +process.env.PORT : 5001, () =>
    console.log(`Server successfully started on port 5001`),
  );
  const nftService = new NftService();
  const nftController = new NftController(nftService);
  //nftController.validateAllSvgs()
  nftController.generateNftByAllIds() // generate all NFTs SVG by id (10k kuda and 10k og)
  //nftService.updateNftMetadata(); //update all JSON-nft metadata with new image link and added animation_url
}
bootstrap();
