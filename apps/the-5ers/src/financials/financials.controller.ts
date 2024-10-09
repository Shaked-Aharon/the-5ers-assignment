import { Controller, Get, UseGuards, Query, Param } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { FinancialsService } from './financials.service';

@Controller('financials')
export class FinancialsController {
    constructor(private financialsService: FinancialsService){}

    @UseGuards(AuthGuard)
    @Get('search')
    searchStocks(@Query('q') q: string) {
        return this.financialsService.search(q); // The user object is attached by the guard
    }

    @UseGuards(AuthGuard)
    @Get('list')
    listStocks() {
        return this.financialsService.list(); // The user object is attached by the guard
    }
    
    @UseGuards(AuthGuard)
    @Get('details/:symbol')
    getDetails(@Param('symbol') symbol: string) {
        return this.financialsService.getDetails(symbol); // The user object is attached by the guard
    }
}
