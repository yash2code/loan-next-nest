import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from 'src/dto/create-loan.dto';
import { AccountingService } from './accounting.service';

@Injectable()
export class LoansService {
    constructor(private accountingService: AccountingService) { }

    processApplication(createLoanDto: CreateLoanDto): any {
        const balanceSheet = this.accountingService.getBalanceSheet(createLoanDto.businessId);

        const profitOrLossLastTwelveMonths = this.calculateProfitOrLossLastTwelveMonths(balanceSheet);
        const averageAssetValue = this.calculateAverageAssetValue(balanceSheet);
        let preAssessment = 20; // default value

        if (profitOrLossLastTwelveMonths > 0) {
            preAssessment = 60; // 60% favorability if the business made a profit in the last 12 months
        }

        if (averageAssetValue > createLoanDto.loanAmount) {
            preAssessment = 100; // 100% favorability if average asset value is greater than the loan amount
        }

        const finalOutput = {
            businessDetails: {
                name: createLoanDto.businessName,
                yearEstablished: createLoanDto.yearEstablished
            },
            summaryOfProfitOrLoss: this.createProfitOrLossSummary(balanceSheet),
            preAssessment
        };

        return { status: 'submitted', data: finalOutput };
    }

    private calculateProfitOrLossLastTwelveMonths(balanceSheet: any[]): number {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        let totalProfitOrLoss = 0;
        balanceSheet.forEach(entry => {
            const entryDate = new Date(entry.year, entry.month - 1);
            if (entryDate >= oneYearAgo) {
                totalProfitOrLoss += entry.profitOrLoss;
            }
        });

        return totalProfitOrLoss;
    }

    private calculateAverageAssetValue(balanceSheet: any[]): number {
        let totalAssetsValue = 0;
        let count = 0;

        balanceSheet.forEach(entry => {
            totalAssetsValue += entry.assetsValue;
            count++;
        });

        return count > 0 ? totalAssetsValue / count : 0;
    }

    private createProfitOrLossSummary(balanceSheet: any[]): any {
        // Aggregate profit or loss by year
        const summary = {};
        balanceSheet.forEach(entry => {
            if (!summary[entry.year]) {
                summary[entry.year] = 0;
            }
            summary[entry.year] += entry.profitOrLoss;
        });
        return summary;
    }

}