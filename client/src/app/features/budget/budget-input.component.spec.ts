import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BudgetInputComponent } from './budget-input.component';

describe('BudgetInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetInputComponent],
      providers: [provideAnimationsAsync('noop')],
    }).compileComponents();
  });

  it('marks the form invalid when amount is empty', () => {
    const fixture = TestBed.createComponent(BudgetInputComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('marks the form invalid when amount is zero or negative', () => {
    const fixture = TestBed.createComponent(BudgetInputComponent);
    const { form } = fixture.componentInstance;
    form.controls.amount.setValue(0);
    expect(form.invalid).toBe(true);
    form.controls.amount.setValue(-100);
    expect(form.invalid).toBe(true);
  });

  it('marks the form valid for a positive amount', () => {
    const fixture = TestBed.createComponent(BudgetInputComponent);
    const { form } = fixture.componentInstance;
    form.controls.amount.setValue(4000);
    expect(form.valid).toBe(true);
  });

  it('defaults pay cycle to monthly', () => {
    const fixture = TestBed.createComponent(BudgetInputComponent);
    expect(fixture.componentInstance.form.controls.payCycle.value).toBe('monthly');
  });
});
