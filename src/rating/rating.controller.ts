import { Controller, Get, Post, Body } from '@nestjs/common';
import { RatingsService } from './rating.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  async getAllRatings() {
    return await this.ratingsService.getAll();
  }

  @Post()
  async addRating(@Body() ratingData) {
    return await this.ratingsService.addRating(ratingData);
  }
}
