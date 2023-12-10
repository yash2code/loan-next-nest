import { Module } from '@nestjs/common';
import { LoansController } from './controllers/loans.controller';
import { LoansService } from './services/loans.service';
import { AccountingService } from './services/accounting.service';

@Module({
  imports: [],
  controllers: [LoansController],
  providers: [LoansService, AccountingService],
})
export class AppModule { }
