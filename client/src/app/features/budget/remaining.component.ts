import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BudgetService } from '../../core/budget.service';

type RemainingState = 'balanced' | 'underspent' | 'overspent';

@Component({
  selector: 'app-remaining',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    @if (budget(); as b) {
      <div class="remaining" [attr.data-state]="state()">
        <span class="label">Remaining</span>
        <span class="amount">{{ b.remaining | currency }}</span>
        <span class="hint">{{ hintText() }}</span>
      </div>
    }
  `,
  styleUrl: './remaining.component.scss',
})
export class RemainingComponent {
  readonly budget = toSignal(inject(BudgetService).budget$);

  readonly state = computed<RemainingState>(() => {
    const r = this.budget()?.remaining ?? 0;
    if (Math.abs(r) < 0.005) return 'balanced';
    return r > 0 ? 'underspent' : 'overspent';
  });

  readonly hintText = computed(() => {
    switch (this.state()) {
      case 'balanced':
        return 'Every dollar is allocated.';
      case 'underspent':
        return 'You have unallocated income — consider increasing your allocations.';
      case 'overspent':
        return 'Allocations exceed your income — reduce them or increase your income.';
    }
  });
}
