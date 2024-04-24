import * as fs from 'fs-extra';
import cheerio from 'cheerio';
import * as path from 'path';
import parts from '../mappings/svgParts';
import { IAttributeBody } from '../types';
import { convertSnakeCaseToTitleCase } from '../../../utils';

const svgDirectory = path.join(__dirname, '../../../src/modules/nft/assets');
const partsFile = path.join(__dirname, 'svgParts.ts');
//TODO: make it work in the future
async function updateParts(): Promise<void> {
  const svgFiles = await fs.readdir(svgDirectory);
  for (const file of svgFiles) {
    if (path.extname(file) === '.svg') {
      const content = await fs.readFile(path.join(svgDirectory, file), 'utf8');
      const $ = cheerio.load(content, { xmlMode: true });
      const svgContent = $('svg > g').html() || '';
      console.log(`Writing to file: ${partsFile}`);

      const filenameWithoutExt = path.basename(file, '.svg');
      const attributeKey = convertSnakeCaseToTitleCase(
        filenameWithoutExt,
      ).toUpperCase() as keyof typeof IAttributeBody;
      if (Object.values(IAttributeBody).includes(attributeKey)) {
        const index = parts.findIndex(
          (part) => part[IAttributeBody[attributeKey]] !== undefined,
        );

        if (index !== -1) {
          parts[index][IAttributeBody[attributeKey]] = svgContent;
          console.log(parts[index][IAttributeBody[attributeKey]]);
        }
        console.log(`Updating index ${index} with ${attributeKey}`);
      }
    }
  }

  await fs.writeFile(
    partsFile,
    `export const parts = ${JSON.stringify(parts, null, 2)};`,
    'utf8',
  );
  console.log('Parts file has been updated!');
}

export default updateParts;
