import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FinancialsService } from './financials.service';
import { FinancialsController } from './financials.controller';

@Module({
  imports: [
  ],
  exports: [FinancialsService],
  controllers: [FinancialsController],
  providers: [FinancialsService, JwtService],
})
export class FinancialsModule {}
