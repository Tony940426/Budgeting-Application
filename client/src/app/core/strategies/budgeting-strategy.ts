import { Allocation } from '../models/allocation';
import { IncomeInput } from '../models/income';

export interface BudgetingStrategy {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  calculate(income: IncomeInput): Allocation[];
}
