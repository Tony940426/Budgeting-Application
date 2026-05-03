import { Allocation } from '../models/allocation';
import { IncomeInput } from '../models/income';
import { BudgetingStrategy } from './budgeting-strategy';

export const FIFTY_THIRTY_TWENTY_ID = '50-30-20';

export class FiftyThirtyTwentyStrategy implements BudgetingStrategy {
  readonly id = FIFTY_THIRTY_TWENTY_ID;
  readonly name = '50 / 30 / 20';
  readonly description =
    'Allocate 50% of your pay-cycle income to needs (rent, bills, groceries), 30% to wants (eating out, entertainment), and 20% to savings or paying down debt.';

  calculate(income: IncomeInput): Allocation[] {
    const amount = Math.max(0, income.amount);
    return [
      {
        category: 'Needs',
        percentage: 50,
        amount: round(amount * 0.5),
        description: 'Essentials: rent, bills, groceries, transport',
      },
      {
        category: 'Wants',
        percentage: 30,
        amount: round(amount * 0.3),
        description: 'Discretionary: eating out, entertainment, hobbies',
      },
      {
        category: 'Savings',
        percentage: 20,
        amount: round(amount * 0.2),
        description: 'Savings, investments, or extra debt repayment',
      },
    ];
  }
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
