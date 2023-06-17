import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftCollectionManagerModule } from './nft-collection-manager/nft-collection-manager.module';
import { NftCollectionMintModule } from './nft-collection-mint/nft-collection-mint.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URI'),
          dbName: 'test',
        };
      },
      inject: [ConfigService],
    }),
    NftCollectionManagerModule,
    NftCollectionMintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
