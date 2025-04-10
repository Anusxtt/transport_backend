import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { Driver } from 'src/driver/driver.entity';
import { CreateRatingDto } from './create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getAll(): Promise<Rating[]> {
    return await this.ratingRepository
      .createQueryBuilder('rating')
      .leftJoinAndSelect('rating.driver', 'driver')
      .getMany();
  }

  async addRating(ratingData: CreateRatingDto): Promise<Rating> {
    const driver = await this.driverRepository.findOne({
      where: { id: ratingData.driver_id },
    });
    if (!driver) throw new Error('Driver not found');

    const rating = this.ratingRepository.create({
      driver: driver,
      order_id: ratingData.order_id,
      rating: ratingData.rating,
      review: ratingData.review,
    });

    return await this.ratingRepository.save(rating);
  }
}
