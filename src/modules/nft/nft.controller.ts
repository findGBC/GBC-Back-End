import { Controller } from '@nestjs/common';
import { NftService } from './nft.service';
import {tokenIdAttributeTuple} from "./mappings/tokenIdAtributeTuple";

@Controller()
export class NftController {
  constructor(private readonly nftService: NftService) {

  }
  generateNftByAllIds() {
    for  (let i = 0; i < tokenIdAttributeTuple.length; i++) {

    }
  }
}
