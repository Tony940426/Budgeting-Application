import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BudgetService } from '../../core/budget.service';

const PALETTE = ['#1976d2', '#9c27b0', '#2e7d32'];

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `
    @if (hasIncome()) {
      <div class="chart-wrapper">
        <canvas
          baseChart
          type="doughnut"
          [data]="chartData()"
          [options]="chartOptions"
        ></canvas>
      </div>
    } @else {
      <p class="placeholder">Enter your income to see a breakdown.</p>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .chart-wrapper {
        position: relative;
        height: 280px;
      }
      .placeholder {
        color: var(--mat-sys-on-surface-variant);
        margin: 0;
      }
    `,
  ],
})
export class BudgetChartComponent {
  private readonly budget = toSignal(inject(BudgetService).budget$);

  readonly hasIncome = computed(() => (this.budget()?.income.amount ?? 0) > 0);

  readonly chartData = computed<ChartData<'doughnut'>>(() => {
    const allocations = this.budget()?.allocations ?? [];
    return {
      labels: allocations.map((a) => a.category),
      datasets: [
        {
          data: allocations.map((a) => a.amount),
          backgroundColor: PALETTE.slice(0, allocations.length),
          borderWidth: 0,
        },
      ],
    };
  });

  readonly chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };
}
