import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNftSvgById(id: string): string {
    return `Hello World! ${id}`;
  }
}
