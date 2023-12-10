import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, ValidationPipe } from '@nestjs/common';
import { CreateLoanDto } from 'src/dto/create-loan.dto';
import { LoansService } from 'src/services/loans.service';

@Controller('loans')
export class LoansController {
    constructor(private readonly loansService: LoansService) { }

    @Post('apply')
    @HttpCode(HttpStatus.CREATED)
    async applyForLoan(@Body(ValidationPipe) applicationData: CreateLoanDto): Promise<any> {
        const result = this.loansService.processApplication(applicationData);
        if (result.status === 'rejected') {
            throw new HttpException(result.reason, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}