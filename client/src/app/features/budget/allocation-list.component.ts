import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BudgetService } from '../../core/budget.service';

@Component({
  selector: 'app-allocation-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './allocation-list.component.html',
  styleUrl: './allocation-list.component.scss',
})
export class AllocationListComponent {
  private readonly budget = inject(BudgetService);
  readonly state = toSignal(this.budget.budget$);

  onAmend(category: string, value: string | number): void {
    const amount = typeof value === 'string' ? parseFloat(value) : value;
    if (Number.isFinite(amount)) {
      this.budget.amend(category, amount);
    }
  }

  reset(): void {
    this.budget.resetAmendments();
  }

  hasAmendments(): boolean {
    return this.budget.hasAmendments();
  }
}
