import { Injectable } from '@angular/core';
import { BudgetingStrategy } from './budgeting-strategy';
import {
  FIFTY_THIRTY_TWENTY_ID,
  FiftyThirtyTwentyStrategy,
} from './fifty-thirty-twenty.strategy';

@Injectable({ providedIn: 'root' })
export class StrategyRegistry {
  private readonly strategies = new Map<string, BudgetingStrategy>([
    [FIFTY_THIRTY_TWENTY_ID, new FiftyThirtyTwentyStrategy()],
  ]);

  readonly defaultStrategyId = FIFTY_THIRTY_TWENTY_ID;

  list(): BudgetingStrategy[] {
    return Array.from(this.strategies.values());
  }

  get(id: string): BudgetingStrategy {
    const strategy = this.strategies.get(id);
    if (!strategy) {
      throw new Error(`Unknown budgeting strategy: ${id}`);
    }
    return strategy;
  }
}
