import { Controller, Post, Body, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './update-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private service: LocationService) {}

  @Post(':orderId')
  async updateLocation(
    @Param('orderId') orderId: number,
    @Body() data: UpdateLocationDto,
  ) {
    return this.service.updateLocation(orderId, data);
  }
}
