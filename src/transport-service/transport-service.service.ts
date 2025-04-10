import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportService } from './transport-service.entity';
import { CreateTransportServiceDto } from './create-transport-service.dto';
import { TransportType } from 'src/transport-type/transport-type.entity';

@Injectable()
export class TransportServiceService {
  constructor(
    @InjectRepository(TransportService)
    private readonly transportServiceRepository: Repository<TransportService>,
    @InjectRepository(TransportType)
    private readonly transportTypeRepository: Repository<TransportType>,
  ) {}

  async getAllServices(): Promise<TransportService[]> {
    const services = await this.transportServiceRepository.find();
    console.log('Fetched services from DB:', services);
    return services;
  }

  async getTransportTypes(): Promise<TransportType[]> {
    return await this.transportTypeRepository.find();
  }

  async getLogisticsVehicles(): Promise<TransportType[]> {
    return await this.transportTypeRepository.find({
      where: { category: 'logistics' },
    });
  }

  async getPassengerVehicles(): Promise<TransportType[]> {
    return await this.transportTypeRepository.find({
      where: { category: 'passenger' },
    });
  }

  async createService(
    data: CreateTransportServiceDto,
  ): Promise<TransportService> {
    const service = this.transportServiceRepository.create(data);
    return await this.transportServiceRepository.save(service);
  }
}
