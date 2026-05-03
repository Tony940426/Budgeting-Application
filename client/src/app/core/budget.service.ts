import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Allocation } from './models/allocation';
import { Budget } from './models/budget';
import { IncomeInput } from './models/income';
import { PayCycle } from './models/pay-cycle';
import { StrategyRegistry } from './strategies/strategy-registry';

const DEFAULT_INCOME: IncomeInput = { amount: 0, payCycle: 'monthly' };

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly registry = inject(StrategyRegistry);

  private readonly incomeSubject = new BehaviorSubject<IncomeInput>(DEFAULT_INCOME);
  private readonly strategyIdSubject = new BehaviorSubject<string>(
    this.registry.defaultStrategyId,
  );
  private readonly amendmentsSubject = new BehaviorSubject<Map<string, number>>(
    new Map(),
  );

  readonly income$ = this.incomeSubject.asObservable();
  readonly strategyId$ = this.strategyIdSubject.asObservable();
  readonly amendments$ = this.amendmentsSubject.asObservable();

  readonly budget$: Observable<Budget> = combineLatest([
    this.income$,
    this.strategyId$,
    this.amendments$,
  ]).pipe(map(([income, strategyId, amendments]) => this.compute(income, strategyId, amendments)));

  setIncome(amount: number, payCycle: PayCycle): void {
    this.incomeSubject.next({ amount, payCycle });
  }

  setStrategy(id: string): void {
    this.strategyIdSubject.next(id);
    this.amendmentsSubject.next(new Map());
  }

  amend(category: string, amount: number): void {
    const next = new Map(this.amendmentsSubject.value);
    next.set(category, Math.max(0, amount));
    this.amendmentsSubject.next(next);
  }

  resetAmendments(): void {
    this.amendmentsSubject.next(new Map());
  }

  hasAmendments(): boolean {
    return this.amendmentsSubject.value.size > 0;
  }

  private compute(
    income: IncomeInput,
    strategyId: string,
    amendments: Map<string, number>,
  ): Budget {
    const strategy = this.registry.get(strategyId);
    const baseAllocations = strategy.calculate(income);
    const allocations: Allocation[] = baseAllocations.map((base) => {
      const override = amendments.get(base.category);
      if (override === undefined) return base;
      return { ...base, amount: round(override) };
    });
    const allocated = allocations.reduce((sum, a) => sum + a.amount, 0);
    return {
      strategyId,
      income,
      baseAllocations,
      allocations,
      remaining: round(income.amount - allocated),
    };
  }
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
