import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { TradeType } from '@prisma/client';

export class CreateTradeDto {
  @IsString()
  date: string;

  @IsEnum(TradeType)
  type: TradeType;

  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  fee?: number;

  @IsOptional()
  @IsString()
  memo?: string;
}
