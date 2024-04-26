import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import svgParts from './mappings/svgParts';
import svgPartsKuda from './mappings/svgPartsKuda';
import { tokenIdAttributeTuple } from './mappings/tokenIdAtributeTuple';
import {
  IAttributeBody,
  IAttributeClothes,
  IAttributeHat,
  IBerryDisplayTupleMap,
} from './types';

@Injectable()
export class NftService {
  async saveNftSvg(tokenId: string, isKudaMode: boolean): Promise<string> {
    const svgContent = this.compileNftSvg(tokenId, isKudaMode);
    const filePath = path.join(
      process.cwd(),
      `src/static//nfts/${isKudaMode ? 'kuda' : 'og'}`,
      `${tokenId}.svg`,
    );

    await fs.outputFile(filePath, svgContent);
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

  async updateNftMetadata() {
    const jsonDirectory = path.join(process.cwd(), 'src/static/nfts/JSONs');
    const jsonFiles = await fs.readdir(jsonDirectory);
    let i = 0;
    for (const file of jsonFiles) {
      if (file.endsWith('.json')) {
        const filePath = path.join(jsonDirectory, file);
        const jsonContent = await fs.readJson(filePath);
        const tokenId = jsonContent.name.split('#')[1].trim();

        jsonContent.image = `https://gbc-back-end-production.up.railway.app/static/nfts/kuda/${tokenId}.svg`;

        jsonContent.animation_url = `https://gbc-back-end-production.up.railway.app/html?tokenId=${tokenId}`;

        console.log((i += 1), 'metadata updated: ', filePath);

        await fs.writeJson(filePath, jsonContent, { spaces: 2 });
      }
    }
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

  generateNftHtmlContent(tokenId: string) {
    return `
    <html lang="en">
  <head>
    <title>GBC</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Figtree"
    />
    <style>
      body {
        margin: 0;
        overflow: hidden;
        padding: 0;
        text-align: center;
        font-family: 'Figtree', sans-serif;
        font-weight: bold;
      }

      #container {
        display: inline-block;
        margin: 0 auto;
        padding: 0;
        position: relative;
        width: 100%;
      }

      #container img {
        object-fit: contain;
        width: 100%;
      }

      #container #points_box {
        left: 20px;
        top: 20px;
        /* width: 150px; */
        height: 32px;
        --tw-bg-opacity: 1;
        background-color: rgb(245 245 245 / var(--tw-bg-opacity));
        border-radius: 6px;
        position: absolute;
      }

      #container #points_box #points {
        color: rgb(29, 29, 31);
        height: 32px;
        line-height: 32px;
        margin: 0 12px;
        font-size: 14px;
      }

      #points_box #tooltip {
        visibility: hidden;
        background-color: white;
        color: #000000;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        font-size: 10px;
        left: 0;
      }

      #points_box:hover #tooltip {
        visibility: visible;
      }

      #container .season-btn {
        width: 40px;
        height: 25px;
        line-height: 25px;
        font-size: 10px;
        color: rgb(29, 29, 31);
        border-radius: 6px;
        cursor: pointer;
      }

      #container .season-btn.active {
        background-color: #1c1c1c;
        color: #fff;
      }

      #container .season-btn:hover {
        border-color: rgb(78, 171, 48, 0.65);
      }

      #container .season-container {
        position: absolute;
        right: 20px;
        top: 20px;
        display: flex;
        --tw-bg-opacity: 1;
        background-color: rgb(245 245 245 / var(--tw-bg-opacity));
        padding: 0.2rem;
        border-radius: 0.5rem;
        gap: 0.5rem;
        align-items: center;
      }

      .season-btn[style*='pointer-events: none'] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .season-btn.current-season {
        border: 1px solid rgb(78, 171, 48);
      }
    </style>
  </head>
  <body data-new-gr-c-s-check-loaded="14.1168.0" data-gr-ext-installed="">
    <div id="container">
      <div class="season-container">
      <div id="kuda" class="season-btn active ">KUDA</div>
        <div id="og" class="season-btn current-season">OG</div>
      </div>
      <img
      alt="nft-img"
        id="gbc"
        style="display: block"
        src="${process.env.API_URL}/static/nfts/kuda/${tokenId}.svg"
      />
    </div>
    <script type="text/javascript">
      function getUrlParameter(name) {
        name = name.replace(/[\\[]/, '\\\\\\[').replace(/[\\]]/, '\\\\\\]');
        const regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.search);
        if (results) return decodeURIComponent(results[1].replace(/\\+/g, ' '));
        else return null;
      }

      document.addEventListener('DOMContentLoaded', async () => {
        const tokenId = getUrlParameter('tokenId');
        if (tokenId) {
          const gbc = document.getElementById('gbc');

          function updateImage(season) {
            // Reset active classes
            document.getElementById('og').classList.remove('active');
            document.getElementById('kuda').classList.remove('active');
            switch (season) {
              case 'og':
                gbc.src = "${process.env.API_URL}/static/nfts/og/${tokenId}.svg";
                document.getElementById('og').classList.add('active');
                break;
              case 'kuda':
                gbc.src = "${process.env.API_URL}/static/nfts/kuda/${tokenId}.svg";
                document.getElementById('kuda').classList.add('active');
                break;
              default:
                break;
            }
          }

          document
            .getElementById('og')
            .addEventListener('click', () => updateImage('og'));
          document
            .getElementById('kuda')
            .addEventListener('click', () => updateImage('kuda'));

         /* const metadata_url = \`https://metadata.degods.com/g/${tokenId}.json\`;
          const response = await fetch(metadata_url);
          const metadata = await response.json();

          if (metadata.image.includes('dead')) {
            document.getElementById('kuda').classList.add('active');
            document.getElementById('kuda').classList.add('current-season');
          } else {
            document.getElementById('og').classList.add('active');
            document.getElementById('og').classList.add('current-season');
          }

          degod.src = metadata.image;*/
        }
      });
    </script>
  </body>
</html>

    `;
  }
}
