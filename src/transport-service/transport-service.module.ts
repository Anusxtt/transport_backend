import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportServiceController } from './transport-service.controller';
import { TransportServiceService } from './transport-service.service';
import { TransportService } from './transport-service.entity';
import { TransportType } from 'src/transport-type/transport-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransportService, TransportType])],
  controllers: [TransportServiceController],
  providers: [TransportServiceService],
  exports: [TransportServiceService],
})
export class TransportServiceModule {}
