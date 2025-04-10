import { IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  service_id: number;

  @IsInt()
  user_id: number;

  @IsNotEmpty()
  sender_name: string;

  @IsNotEmpty()
  sender_phone: string;

  @IsNotEmpty()
  receiver_name: string;

  @IsNotEmpty()
  receiver_phone: string;

  @IsString()
  pickup_location: string;

  @IsString()
  dropoff_location: string;

  @IsEnum(['รอดำเนินการ', 'กำลังขนส่ง', 'ส่งสำเร็จ'])
  status?: string;
}
