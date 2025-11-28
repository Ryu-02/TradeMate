import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { TradesRepository } from './trades.repository';

@Injectable()
export class TradesService {
  constructor(private readonly tradesRepository: TradesRepository) {}

  async create(createTradeDto: CreateTradeDto) {
    return this.tradesRepository.createTrade(createTradeDto);
  }

  async findAll() {
    return this.tradesRepository.findAllTrades();
  }

  async findOne(id: number) {
    const trade = await this.tradesRepository.findTradeById(id);

    if (!trade) {
      throw new NotFoundException(`ID가 ${id}인 매매 기록을 찾을 수 없습니다.`);
    }

    return trade;
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    await this.findOne(id); // 존재 여부 확인
    return this.tradesRepository.updateTrade(id, updateTradeDto);
  }

  async remove(id: number) {
    await this.findOne(id); // 존재 여부 확인
    return this.tradesRepository.deleteTrade(id);
  }
}
