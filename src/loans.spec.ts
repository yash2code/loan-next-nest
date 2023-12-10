import { Test } from "@nestjs/testing";
import { AccountingService } from "./services/accounting.service";
import { LoansService } from "./services/loans.service";

describe('LoansService', () => {
    let loansService: LoansService;
    let mockAccountingService = {
        getBalanceSheet: () => [
            {
                "year": 2020,
                "month": 12,
                "profitOrLoss": 250000,
                "assetsValue": 1234
            },
            {
                "year": 2020,
                "month": 11,
                "profitOrLoss": 1150,
                "assetsValue": 5789
            },
            {
                "year": 2020,
                "month": 10,
                "profitOrLoss": 2500,
                "assetsValue": 22345
            },
            {
                "year": 2020,
                "month": 9,
                "profitOrLoss": -187000,
                "assetsValue": 223452
            }
        ]
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                LoansService,
                { provide: AccountingService, useValue: mockAccountingService },
            ],
        }).compile();

        loansService = module.get<LoansService>(LoansService);
    });

    it('should process loan application correctly', () => {
        const mockLoanDto = {
            loanAmount: 10000,
            businessName: 'xero',
            yearEstablished: 1997,
            businessId: 'abc'
        }

        const result = loansService.processApplication(mockLoanDto);

        expect(result).toBeDefined();
        expect(result.status).toEqual('submitted');
    });

});
