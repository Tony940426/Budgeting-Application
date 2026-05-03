import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { BudgetService } from '../../core/budget.service';
import { PayCycle } from '../../core/models/pay-cycle';

interface BudgetInputForm {
  amount: FormControl<number | null>;
  payCycle: FormControl<PayCycle>;
}

@Component({
  selector: 'app-budget-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './budget-input.component.html',
  styleUrl: './budget-input.component.scss',
})
export class BudgetInputComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly budget = inject(BudgetService);
  private readonly destroyed$ = new Subject<void>();

  readonly form = this.fb.group<BudgetInputForm>({
    amount: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    payCycle: this.fb.nonNullable.control<PayCycle>('monthly'),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(150), takeUntil(this.destroyed$)).subscribe(() => {
      if (this.form.invalid) {
        this.budget.setIncome(0, this.form.controls.payCycle.value);
        return;
      }
      const { amount, payCycle } = this.form.getRawValue();
      this.budget.setIncome(amount ?? 0, payCycle);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
