import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLoanDto {
    @IsNotEmpty({ message: 'Business name must not be empty' })
    @IsString()
    readonly businessName: string;

    @IsNotEmpty({ message: 'Year established must not be empty' })
    @IsNumber()
    readonly yearEstablished: number;

    @IsNotEmpty({ message: 'Loan amount must not be empty' })
    @IsNumber()
    readonly loanAmount: number;

    readonly businessId: string;
}
