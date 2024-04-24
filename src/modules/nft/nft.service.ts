import { Injectable } from '@nestjs/common';
import {
  IAttributeBody,
  IAttributeClothes,
  IAttributeHat,
  IBerryDisplayTupleMap,
} from './types';
import svgParts from './mappings/svgParts';
import svgPartsKuda from './mappings/svgPartsKuda';
import { tokenIdAttributeTuple } from './mappings/tokenIdAtributeTuple';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class NftService {
  async saveNftSvg(
    tokenId: string,
    isKudaMode: boolean,
  ): Promise<string> {
    const svgContent = this.compileNftSvg(tokenId, isKudaMode);
    const filePath = path.join(
        process.cwd(),
        'src/statics/nfts',
      `${tokenId}.svg`,
    );

    await fs.outputFile(filePath, svgContent);
    console.log({filePath});
    return filePath;
  }
  compileNftSvg(tokenId: string, isKudaMode: boolean): string {
    const selectedSvgKey: Partial<IBerryDisplayTupleMap> = [
      ...tokenIdAttributeTuple[+tokenId - 1],
    ];

    const nftHtml = `<svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin meet"
      fill="none"
      viewBox="0 0 1500 1500"
    >
      ${selectedSvgKey ? `<g>${this.berryPartsToSvg(selectedSvgKey, isKudaMode)}</g>` : ''}
    </svg>`;

    return nftHtml;
  }

  private berryPartsToSvg = (
    [
      background,
      clothes,
      body,
      expression,
      faceAccessory,
      hat,
      badge,
    ]: Partial<IBerryDisplayTupleMap>,
    isKudaMode: boolean,
  ): string => {
    const svgPartsSelected = isKudaMode ? svgPartsKuda : svgParts;
    return `
      ${background ? svgPartsSelected[0][background] : ''}
      ${clothes ? svgPartsSelected[1][clothes] : svgPartsSelected[1][IAttributeClothes.NUDE]}
      ${body ? svgPartsSelected[2][body] : svgPartsSelected[2][IAttributeBody.BLUEBERRY]}
      ${expression ? svgPartsSelected[3][expression] : ''}
      ${faceAccessory ? svgPartsSelected[4][faceAccessory] : ''}
      ${hat ? svgPartsSelected[5][hat] : svgPartsSelected[5][IAttributeHat.NUDE]}
      ${badge ? svgPartsSelected[6][badge] : ''}
    `;
  };
}
