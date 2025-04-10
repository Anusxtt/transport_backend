import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportType } from './transport-type.entity';

@Injectable()
export class TransportTypesService {
  constructor(
    @InjectRepository(TransportType)
    private readonly transportTypeRepository: Repository<TransportType>,
  ) {}

  async getAll(): Promise<TransportType[]> {
    return await this.transportTypeRepository.find();
  }
}
