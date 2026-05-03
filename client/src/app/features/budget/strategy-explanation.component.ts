import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BudgetService } from '../../core/budget.service';
import { StrategyRegistry } from '../../core/strategies/strategy-registry';

@Component({
  selector: 'app-strategy-explanation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (strategy(); as s) {
      <h2 class="strategy-name">{{ s.name }}</h2>
      <p class="strategy-description">{{ s.description }}</p>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .strategy-name {
        margin: 0 0 0.5rem 0;
      }
      .strategy-description {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
      }
    `,
  ],
})
export class StrategyExplanationComponent {
  private readonly registry = inject(StrategyRegistry);
  private readonly strategyId = toSignal(inject(BudgetService).strategyId$, {
    initialValue: this.registry.defaultStrategyId,
  });
  readonly strategy = computed(() => this.registry.get(this.strategyId()));
}
