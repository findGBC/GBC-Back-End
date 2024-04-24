import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = configService.get('NODE_ENV');
        console.log({ env });
        const isProd = env === 'production';

        return [
          {
            rootPath: join(
              __dirname,
              isProd ? 'static/nfts/og' : '../src/static/nfts/og',
            ),
            serveRoot: '/nfts/og',
          },
          {
            rootPath: join(
              __dirname,
              isProd ? 'static/nfts/kuda' : '../src/static/nfts/kuda',
            ),
            serveRoot: '/nfts/kuda',
          },
        ];
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
