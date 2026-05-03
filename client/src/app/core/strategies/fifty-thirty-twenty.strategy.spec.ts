import { FiftyThirtyTwentyStrategy } from './fifty-thirty-twenty.strategy';

describe('FiftyThirtyTwentyStrategy', () => {
  const strategy = new FiftyThirtyTwentyStrategy();

  it('splits 4000 monthly into 2000 / 1200 / 800', () => {
    const allocations = strategy.calculate({ amount: 4000, payCycle: 'monthly' });
    expect(allocations.map((a) => a.amount)).toEqual([2000, 1200, 800]);
  });

  it('splits 2000 fortnightly into 1000 / 600 / 400', () => {
    const allocations = strategy.calculate({ amount: 2000, payCycle: 'fortnightly' });
    expect(allocations.map((a) => a.amount)).toEqual([1000, 600, 400]);
  });

  it('returns zero allocations for zero income', () => {
    const allocations = strategy.calculate({ amount: 0, payCycle: 'monthly' });
    expect(allocations.every((a) => a.amount === 0)).toBe(true);
  });

  it('clamps negative income to zero', () => {
    const allocations = strategy.calculate({ amount: -100, payCycle: 'monthly' });
    expect(allocations.every((a) => a.amount === 0)).toBe(true);
  });

  it('uses categories Needs / Wants / Savings with 50 / 30 / 20 percentages', () => {
    const allocations = strategy.calculate({ amount: 1000, payCycle: 'monthly' });
    expect(allocations.map((a) => a.category)).toEqual(['Needs', 'Wants', 'Savings']);
    expect(allocations.map((a) => a.percentage)).toEqual([50, 30, 20]);
  });
});
