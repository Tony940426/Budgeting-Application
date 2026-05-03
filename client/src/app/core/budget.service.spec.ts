import { TestBed } from '@angular/core/testing';
import { firstValueFrom, skip, take } from 'rxjs';
import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('produces base 50/30/20 allocations from income', async () => {
    service.setIncome(4000, 'monthly');
    const budget = await firstValueFrom(service.budget$);
    expect(budget.allocations.map((a) => a.amount)).toEqual([2000, 1200, 800]);
    expect(budget.remaining).toBe(0);
  });

  it('applies amendments and recomputes remaining', async () => {
    service.setIncome(4000, 'monthly');
    service.amend('Wants', 1500);
    const budget = await firstValueFrom(service.budget$);
    expect(budget.allocations.find((a) => a.category === 'Wants')?.amount).toBe(1500);
    // Needs 2000 + Wants 1500 + Savings 800 = 4300; remaining = -300
    expect(budget.remaining).toBe(-300);
  });

  it('preserves base allocations alongside amended ones', async () => {
    service.setIncome(4000, 'monthly');
    service.amend('Wants', 1500);
    const budget = await firstValueFrom(service.budget$);
    expect(budget.baseAllocations.find((a) => a.category === 'Wants')?.amount).toBe(1200);
  });

  it('resetAmendments restores base allocations', async () => {
    service.setIncome(4000, 'monthly');
    service.amend('Wants', 1500);
    service.resetAmendments();
    const budget = await firstValueFrom(service.budget$);
    expect(budget.allocations.map((a) => a.amount)).toEqual([2000, 1200, 800]);
    expect(budget.remaining).toBe(0);
    expect(service.hasAmendments()).toBe(false);
  });

  it('clamps negative amendments to zero', async () => {
    service.setIncome(4000, 'monthly');
    service.amend('Savings', -50);
    const budget = await firstValueFrom(service.budget$);
    expect(budget.allocations.find((a) => a.category === 'Savings')?.amount).toBe(0);
  });
});
