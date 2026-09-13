import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsNotEmpty()
  daytime: string;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsNumber()
  @Min(1)
  row: number;

  @IsNumber()
  @Min(1)
  seat: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class OrderDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

export class OrderResultDto extends TicketDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderResultDto[];
}
