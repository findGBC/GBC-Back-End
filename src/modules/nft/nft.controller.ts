import { Controller } from '@nestjs/common';
import { NftService } from './nft.service';
import { tokenIdAttributeTuple } from './mappings/tokenIdAtributeTuple';

@Controller()
export class NftController {
  constructor(private readonly nftService: NftService) {}
  async generateNftByAllIds() {
    for (let i = 0; i < tokenIdAttributeTuple.length; i++) {
      const filePath = await this.nftService.saveNftSvg((i + 1).toString(), false);
      console.log(i + 1, filePath);
    }
    for (let i = 0; i < tokenIdAttributeTuple.length; i++) {
      const filePath = await this.nftService.saveNftSvg((i + 1).toString(), true);
      console.log(i + 1, filePath);
    }
  }
}
