import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NftModule } from './modules/nft/nft.module';

@Module({
  imports: [
    NftModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = configService.get('NODE_ENV');
        const isProd = env === 'production';

        return [
          {
            rootPath: join(__dirname, '../src/static/nfts/'),
            serveRoot: '/static/nfts',
          },
        ];
      },
    }),
  ],
})
export class AppModule {}
