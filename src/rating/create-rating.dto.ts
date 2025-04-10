export class CreateRatingDto {
  driver_id: number;
  order_id: number;
  rating: number;
  review?: string;
}
