import { Allocation } from './allocation';
import { IncomeInput } from './income';

export interface Budget {
  strategyId: string;
  income: IncomeInput;
  baseAllocations: Allocation[];
  allocations: Allocation[];
  remaining: number;
}
