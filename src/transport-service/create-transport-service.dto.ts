import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateTransportServiceDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(['สินค้า', 'ผู้โดยสาร'])
  type: 'สินค้า' | 'ผู้โดยสาร';

  @IsOptional()
  icon?: string;
}
