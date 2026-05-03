import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BudgetService } from '../../core/budget.service';
import { AllocationListComponent } from './allocation-list.component';
import { BudgetChartComponent } from './budget-chart.component';
import { BudgetInputComponent } from './budget-input.component';
import { RemainingComponent } from './remaining.component';
import { StrategyExplanationComponent } from './strategy-explanation.component';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatToolbarModule,
    BudgetInputComponent,
    StrategyExplanationComponent,
    AllocationListComponent,
    RemainingComponent,
    BudgetChartComponent,
  ],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.scss',
})
export class BudgetPageComponent {
  private readonly budget = toSignal(inject(BudgetService).budget$);
  readonly hasIncome = computed(() => (this.budget()?.income.amount ?? 0) > 0);
}
