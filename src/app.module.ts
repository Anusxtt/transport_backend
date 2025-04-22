import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransportServiceModule } from './transport-service/transport-service.module';
import { OrderModule } from './order/order.module';
import { LocationModule } from './location/location.module';
import { TransportTypesModule } from './transport-type/transport-type.module';

import { RatingsModule } from './rating/rating.module';
import { DriverModule } from './driver/driver.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        connectionLimit: 10,
        acquireTimeout: 60000,
        connectTimeout: 60000,
      },
    }),
    UsersModule,
    TransportServiceModule,
    OrderModule,
    LocationModule,
    TransportTypesModule,
    DriverModule,
    RatingsModule,
  ],
})
export class AppModule {}
