import { Controller, Get } from '@nestjs/common';
import { TransportTypesService } from './transport-type.service';

@Controller('transport-types')
export class TransportTypesController {
  constructor(private readonly transportTypesService: TransportTypesService) {}

  @Get()
  async getAllTransportTypes() {
    return await this.transportTypesService.getAll();
  }
}
