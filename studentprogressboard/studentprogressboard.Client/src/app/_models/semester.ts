import { FinancialStatus } from "../_enums/finantial-status";

export class Semester{
    id: number;
    year: number;
    semesterNumber: number;
    active: boolean;
    studentId: number;
    financialStatus: FinancialStatus;

    get semesterYearString(): string {
        return `${this.year}/${this.year + 1}/${this.semesterNumber}`;
    }
}