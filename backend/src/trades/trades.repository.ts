// src/trades/trades.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

@Injectable()
export class TradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTrade(dto: CreateTradeDto) {
    return this.prisma.trade.create({
      data: {
        date: new Date(dto.date),
        type: dto.type, // @prisma/client 의 TradeType
        symbol: dto.symbol,
        name: dto.name,
        quantity: dto.quantity,
        price: dto.price,
        fee: dto.fee ?? 0,
        memo: dto.memo,
      },
    });
  }

  async findAllTrades() {
    return this.prisma.trade.findMany({
      orderBy: { date: 'desc' },
    });
  }

  async findTradeById(id: number) {
    return this.prisma.trade.findUnique({
      where: { id },
    });
  }

  async updateTrade(id: number, dto: UpdateTradeDto) {
    const { date, ...rest } = dto;

    return this.prisma.trade.update({
      where: { id },
      data: {
        ...rest,
        ...(date ? { date: new Date(date) } : {}),
      },
    });
  }

  async deleteTrade(id: number) {
    return this.prisma.trade.delete({
      where: { id },
    });
  }
}
