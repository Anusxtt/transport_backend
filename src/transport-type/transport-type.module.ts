import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportType } from './transport-type.entity';
import { TransportTypesController } from './transport-type.controller';
import { TransportTypesService } from './transport-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransportType])],
  controllers: [TransportTypesController],
  providers: [TransportTypesService],
  exports: [TransportTypesService],
})
export class TransportTypesModule {}
