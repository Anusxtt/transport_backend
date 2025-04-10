import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { UpdateLocationDto } from './update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async updateLocation(
    orderId: number,
    data: UpdateLocationDto,
  ): Promise<Location> {
    let location = await this.locationRepository.findOne({
      where: { order: { id: orderId } },
    });

    if (!location) {
      location = this.locationRepository.create({
        order: { id: orderId },
        ...data,
      });
    } else {
      location.latitude = data.latitude;
      location.longitude = data.longitude;
    }

    return await this.locationRepository.save(location);
  }
}
