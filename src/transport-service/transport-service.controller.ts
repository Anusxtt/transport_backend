import { Controller, Get } from '@nestjs/common';
import { TransportServiceService } from './transport-service.service';

@Controller('transport-service')
export class TransportServiceController {
  constructor(private readonly transportService: TransportServiceService) {}

  @Get('/services')
  async getAllServices() {
    return await this.transportService.getAllServices();
  }

  @Get('/types')
  async getTransportTypes() {
    return await this.transportService.getTransportTypes();
  }

  @Get('/logistics')
  async getLogisticsVehicles() {
    return await this.transportService.getLogisticsVehicles();
  }

  @Get('/passenger')
  async getPassengerVehicles() {
    return await this.transportService.getPassengerVehicles();
  }
}
